import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import StaffUser from './staff-user/staff-user';


export default class Staff extends Component {
    render() {
        return (
            <Card>
                <Card.Header>Staff</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <StaffUser/>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
