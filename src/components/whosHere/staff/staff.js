import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import StaffUser from './staff-user/staff-user';
import PropTypes from 'prop-types'


export default class Staff extends Component {
    render() {
        return (
            <Card className="w-100 mb-3">
                <Card.Header>Staff</Card.Header>
                <Card.Body>
                    {this.props.staff && this.props.staff.map(u => 
                        <StaffUser user={u} key={u.sid} />
                    )}
                </Card.Body>
            </Card>
        )
    }
}

Staff.propTypes = {
    staff: PropTypes.arrayOf(PropTypes.object)
}
