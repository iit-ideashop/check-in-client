import React, { Component } from 'react'
import { Image, Container, Row, Col } from 'react-bootstrap';

export default class StaffUser extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={8}>
                        <h4>John Doe</h4>
                        <h6>Developer</h6>
                    </Col>
                    <Col sm={4}>
                        <Image src="/home/yasi/check-in-client/src/components/whosHere/staff/staff-user/cameron-venti-cpT1X2nPN2c-unsplash.jpg" roundedCircle fluid/>
                    </Col>
                </Row>
            </Container>
            )
    }
}