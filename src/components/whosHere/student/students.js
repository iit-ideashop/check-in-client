import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { StudentUser } from './student-user/student-user'
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Students extends Component {
    render() {
        return (
            <Card>
                <Card.Header className="text-center">
                    <FontAwesomeIcon icon={faUsers} /> Students
                </Card.Header>
                {this.props.students &&
                    <ListGroup variant="flush">
                        {this.props.students.map(student => <StudentUser student={student} key={student.sid} />)}
                    </ListGroup>
                }
            </Card>
        )
    }
}

Students.propTypes = {
    students: PropTypes.array
};
