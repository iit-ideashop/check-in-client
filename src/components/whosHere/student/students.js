import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { StudentUser } from './student-user/student-user'

export default class Students extends Component {
    render() {
        return (
            <Card className="w-100 mb-3">
                <Card.Header>
                    Students
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
