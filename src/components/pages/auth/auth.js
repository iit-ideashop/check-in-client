import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Card, Button, Alert } from 'react-bootstrap'

export default class Auth extends Component {
    constructor() {
        super();
        this.state = localStorage.getItem('location_info') || {
            locationId: null,
            hardwareId: null,
            secret: null
        };
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
    }

    onFormStateChange(k, v) {
        this.setState((state) => {
            const newState = { ...state };
            newState[k] = v;
            return newState;
        })
    }

    render() {
        return (
            <Form onSubmit={(e) => this.onSubmit(e)}>
                <Card>
                    <Card.Header>
                        Kiosk Authorization
                    </Card.Header>                        
                    <Card.Body>
                        {this.props.error && <Alert variant="danger">{this.props.error}</Alert>}
                        <Form.Group controlId="authLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control as="select" value={this.state.locationId} disabled={!this.props.enabled} className="custom-select"
                                onChange={(e) => this.onFormStateChange('locationId', e.target.value)}>
                                {Object.keys(this.props.locations).map((key) => <option value={key} key={key}>{this.props.locations[key]}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="authHwid" >
                            <Form.Label>Hardware ID</Form.Label>
                            <Form.Control type="numeric" value={this.state.hardwareId} autoComplete="off" disabled={!this.props.enabled}
                                onChange={(e) => this.onFormStateChange('hardwareId', e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="authSecret">
                            <Form.Label>Secret</Form.Label>
                            <Form.Control type="password" value={this.state.secret} autoComplete="off" disabled={!this.props.enabled}
                                onChange={(e) => this.onFormStateChange('secret', e.target.value)} />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" type="submit" disabled={!this.props.enabled}>Submit</Button>
                    </Card.Footer>
                </Card>
            </Form>
        )
    }
}

Auth.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    locations: PropTypes.object.isRequired,
    error: PropTypes.string,
    enabled: PropTypes.bool
}