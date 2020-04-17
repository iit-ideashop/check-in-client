import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { LoadingSpinner } from './loadingSpinner/loadingSpinner';
import { TapResult } from './tapResult/tapResult';
import { SocketContext } from '../socketContext';
import { Redirect } from 'react-router-dom';

export default class TapHandler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            inProgress: false,
            showResult: false,
            result: 0, 
            user: null,
            closeTimer: null
        }
    }

    componentDidMount() {
        this.context.on('tap', (data) => this.onTap(data));
        this.context.on('check_in_result', (data) => this.onCheckInResult(data))
    }

    componentWillUnmount() {
        this.context.off('tap', (data) => this.onTap(data));
        this.context.off('check_in_result', (data) => this.onCheckInResult(data))
    }

    onTap(data) {
        // FIXME: this gets called twice for some reason? check server code as well

        /**
         * OnTap method
         * It should:
         * - do nothing if the TapHandler is disabled
         * - open a modal and show a loading spinner when triggered
         * - look for existing user, show user checked out 
         * - check capacities, deny if checking this user in would cause us to go over
         * - check to see if the server has a record for the student, if not prompt them to register
         */

        // do nothing if disabled
        if (this.props.disabled)
            return;

        // reset the close timer since we have a new tap
        this.state.closeTimer && clearTimeout(this.state.closeTimer);

        // open the modal and show in progress
        this.setState(() => ({
            modalVisible: true,
            inProgress: true,
            showResult: false,
            user: data.user
        }));

        // search for an existing session and if found, check the user out
        const existingSessions = this.props.userList.filter(user => user.sid === data.user.sid);
        if (existingSessions.length) {
            this.showResult(data.user, TapResult.result.exit);
            // no need to alert the parent component, it'll get notified by the server
            this.sendCheckOut(data.user)
            return;
        } else {
            // we need to check the person in
            // check to see if adding a user will make us go over capacity
            if (this.props.userList.length + 1 > this.props.location.capacity) {
                this.showResult(data.user, TapResult.result.deniedFireCapacity);
                return;
            } else {
                // check staff to student ratio, deny if adding a user would make us go over capacity
                const staffMax = this.props.userList.filter(user => user.type.level > 0).length * this.props.location.staffRatio
                if (this.props.userList.length + 1 > staffMax) {
                    this.showResult(data.user, TapResult.result.deniedStaffRatio);
                    return;
                }

                // check to see if the server has a record for the student
                switch (data.user.source) {
                    case 'db-with-location':
                        // send a check-in packet and wait for the response
                        this.sendCheckIn(data.user);
                        return;
                    case 'db-without-location':
                        // user is registered but doesn't have a record at this location
                        this.closeModal();
                        typeof(this.props.onPresentWaiver) === 'function' && this.props.onPresentWaiver(data.user);
                        return;
                    case 'acaps':
                        // user is not registered
                        this.closeModal()
                        typeof(this.props.onRegisterUser) === 'function' && this.props.onRegisterUser(data.user);
                        return;
                    default:
                        this.closeModal()
                        return;
                }
            }
        }
    }

    onCheckInResult(data) {
        this.showResult(data.user, TapResult.result[data.result]);
    }

    sendCheckIn(user) {
        this.context.emit('check_in', {user: user, location: this.props.location});
    }

    sendCheckOut(user) {
        this.context.emit('check_out', {user: user, location: this.props.location});
    }

    showResult(user, result) {
        const closeTimer = setTimeout(() => this.closeModal(), 5000);
        this.setState(() => ({
            modalVisible: true,
            inProgress: false,
            showResult: true,
            result: result,
            user: user,
            closeTimer: closeTimer
        }))
    }

    closeModal() {
        this.setState(() => ({
            modalVisible: false
        }));
    }

    reset() {
        this.setState(() => ({
            modalVisible: false,
            inProgress: false,
            showResult: false,
            result: 0,
            user: null,
            closeTimer: null
        }));
    }

    render() {
        switch (this.state.result) {
            case TapResult.result.requireRegister:
                return <Redirect to="/register" />
            case TapResult.result.requireWaiver:
                return <Redirect to="/waiver" />
            default:
                return (
                    <Modal show={this.state.modalVisible} size="lg" onExited={() => this.reset()} centered>
                        <Modal.Body>
                            <LoadingSpinner visible={this.state.inProgress} showText={true} />
                            <TapResult visible={this.state.showResult} result={this.state.result} user={this.state.user} />
                        </Modal.Body>
                    </Modal>
                )
        }
    }
}

TapHandler.propTypes = {
    socket: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    userList: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,    
    onUserCheckOut: PropTypes.func,
    onRegisterUser: PropTypes.func,
    onPresentWaiver: PropTypes.func,
    onUserCheckIn: PropTypes.func
}

TapHandler.contextType = SocketContext
