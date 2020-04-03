import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faExclamationCircle, faMinusCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './tapResult.css'

export class TapResult extends Component {
    render() {
        let icon, color, leadMessage, lowerMessage;

        switch (this.props.result) {
            case TapResult.result.enter:
                icon = faCheck;
                color = 'success';
                leadMessage = 'Welcome';
                break;
            case TapResult.result.exit:
                icon = faSignOutAlt;
                color = 'success';
                leadMessage = 'Goodbye';
                break;
            case TapResult.result.missingTrainings:
                icon = faExclamationCircle;
                color = 'warning';
                leadMessage = 'Welcome';
                lowerMessage = 'You are missing the following safety trainings: ' + this.props.user.missingTrainings;
                break;
            case TapResult.result.banned:
                icon = faMinusCircle;
                color = 'danger';
                leadMessage = 'Do not enter';
                lowerMessage = 'Your access to the lab has been revoked due to conduct violations. Please contact Idea Shop staff ' +
                               'at ideashop@iit.edu for further information.';
                break;
            case TapResult.result.deniedFireCapacity:
                icon = faMinusCircle;
                color = 'danger';
                leadMessage = 'Do not enter';
                lowerMessage = 'The lab is currently at fire code capacity limits. Please come back later or check with staff.';
                break;
            case TapResult.result.deniedStaffRatio:
                icon = faMinusCircle;
                color = 'danger';
                leadMessage = 'Do not enter';
                lowerMessage = 'The lab is currently full. Please come back later or check with staff.';
                break;
            default:
                icon = faCheck;
                color = 'success';
                leadMessage = '';
                lowerMessage = '';
                break;
        }

        return this.props.visible && (
            <div className="w-100 text-center">
                <div className={'circle rounded-circle bg-' + color}>
                    <FontAwesomeIcon icon={icon} className="circle-icon" />
                </div>
                <div className="display-4">{leadMessage}</div>
                <div className="lead">{this.props.user.name}</div>
                {lowerMessage &&
                <React.Fragment>
                    <hr />
                    <div>{lowerMessage}</div>
                </React.Fragment>
                }
            </div>
        )
    }
}

TapResult.result = {
    enter: 1,
    exit: 2,
    missingTrainings: 3,
    banned: 4,
    deniedFireCapacity: 5,
    deniedStaffRatio: 6
}

TapResult.propTypes = {
    result: PropTypes.number,
    user: PropTypes.object,
    visible: PropTypes.bool
}
