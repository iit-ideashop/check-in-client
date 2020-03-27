import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { PropTypes } from 'prop-types';

export class StudentUser extends Component {
    render() {
        return (
            <ListGroup.Item style={{paddingTop: '6px', paddingBottom: '6px'}} variant={this.props.student.missingTrainings ? 'danger' : null}>
                <FontAwesomeIcon icon={this.props.student.missingTrainings ? faExclamationCircle : faUser } />
                {' ' + this.props.student.name}
            </ListGroup.Item>
        )
    }
}

StudentUser.propTypes = {
    student: PropTypes.object
}
