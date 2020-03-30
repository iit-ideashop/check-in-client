import React, { Component } from 'react'
import { Image, Container, Row, Col } from 'react-bootstrap';

export default class StaffUser extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={8}>
                        <div class="lead">John Doe</div>
                        <div class="text-muted">Developer</div>
                    </Col>
                    <Col sm={4} class="text-right">
                        <div class="text-right">
                            <Image width={48} height={48} src="/logo192.png"/>
                        </div>
                    </Col>
                </Row>
            </Container>
            )
    }
}