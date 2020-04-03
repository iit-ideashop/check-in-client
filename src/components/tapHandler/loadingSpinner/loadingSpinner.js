import React, { Component } from 'react';
import './loadingSpinner.css';
import PropTypes from 'prop-types';


export class LoadingSpinner extends Component {
    render() {
        return this.props.visible && (
            <React.Fragment>
                <div className="lds-dual-ring"></div>
                {this.props.showText && <div className="lead">Please wait...</div>}
            </React.Fragment>
        )
    }
}

LoadingSpinner.propTypes = {
    showText: PropTypes.bool,
    visible: PropTypes.bool
}