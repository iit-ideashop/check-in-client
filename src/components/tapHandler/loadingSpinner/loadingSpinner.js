import React, { Component } from 'react';
import './loadingSpinner.css';
import PropTypes from 'prop-types';


export class LoadingSpinner extends Component {
    render() {
        return this.props.visible && (
            <div className="w-100 text-center">
                <div className="lds-dual-ring"></div>
                {this.props.showText && <div className="display-4">Please wait...</div>}
            </div>
        )
    }
}

LoadingSpinner.propTypes = {
    showText: PropTypes.bool,
    visible: PropTypes.bool
}