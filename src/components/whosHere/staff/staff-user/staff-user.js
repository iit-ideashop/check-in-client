import React, { Component } from 'react'
import { Image, Container, Row, Col } from 'react-bootstrap';

export default class StaffUser extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={8}>
                        <p class="lead">John Doe</p>
                        <p class="text-muted">Developer</p>
                    </Col>
                    <Col sm={4}>
                        <Image src="/logo192.png" roundedCircle fluid/>
                    </Col>
                </Row>
            </Container>
            )
    }
}