import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';


export default class GlobalNav extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="sm" static="top">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        {this.props.location} Check In
                    </Navbar.Brand>
                </LinkContainer>
                <Nav className="mr-0 ml-auto">
                    <LinkContainer to='/'>
                        <Nav.Link>
                            <FontAwesomeIcon icon={faShieldAlt} />
                            {' '}
                            Admin Tools
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar>
        )
    }
}

GlobalNav.propTypes = {
    location: PropTypes.string.isRequired,
};