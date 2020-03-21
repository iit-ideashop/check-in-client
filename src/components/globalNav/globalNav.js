import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'


export default class GlobalNav extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
                <Navbar.Brand onClick={() => {this.props.onGoHome();}}>
                    {this.props.location} Check In
                </Navbar.Brand>
                <Nav className="mr-0 ml-auto">
                    <Nav.Link onClick={() => { window.location = '/admin' }}>
                        <FontAwesomeIcon icon={faShieldAlt} />
                        {' '}
                        Admin Tools
                    </Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

GlobalNav.propTypes = {
    location: PropTypes.string.isRequired,
    onGoHome: PropTypes.func.isRequired,
    onGoAdmin: PropTypes.func.isRequired
}