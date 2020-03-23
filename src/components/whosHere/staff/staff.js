import React, { Component } from 'react'
import { Card } from 'react-bootstrap';


export default class Staff extends Component {
    render() {
        return (
            <Card>
                <Card.Header as="h5">Staff</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Staff goes Here
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
