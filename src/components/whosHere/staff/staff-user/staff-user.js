import React, { Component } from 'react'
import { Image, Container, Row, Col } from 'react-bootstrap';
import { PropTypes } from 'prop-types'

export default class StaffUser extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={8}>
                        <div className="lead">{this.props.user.name}</div>
                        <div className="text-muted">{this.props.user.type.name}</div>
                    </Col>
                    <Col sm={4} class="text-right">
                        <div className="text-right">
                            <Image width={48} height={48} src={this.props.user.photo} />
                        </div>
                    </Col>
                </Row>
            </Container>
            )
    }
}

StaffUser.propTypes = {
    user: PropTypes.object.isRequired
}