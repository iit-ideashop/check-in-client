import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export default class GlobalNav extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="sm" static="top">
                {/* might need a package for this, shouldn't nest a-elements... */}
                <Link to="/">
                    <Navbar.Brand>
                        {this.props.location} Check In
                    </Navbar.Brand>
                </Link>
                <Nav className="mr-0 ml-auto">
                    <Link to='/'>
                        <Nav.Link>
                            <FontAwesomeIcon icon={faShieldAlt} />
                            {' '}
                            Admin Tools
                        </Nav.Link>
                    </Link>
                </Nav>
            </Navbar>
        )
    }
}

GlobalNav.propTypes = {
    location: PropTypes.string.isRequired,
    onGoHome: PropTypes.func.isRequired,
    onGoAdmin: PropTypes.func.isRequired
};