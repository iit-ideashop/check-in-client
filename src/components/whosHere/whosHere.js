import React, { Component } from 'react'
import Staff from '../whosHere/staff/staff';

export default class WhosHere extends Component {
    render() {
        return (
            <div>
                <h1>Who's Here</h1>
                <React.Fragment>
                    <Staff/>
                </React.Fragment>
            </div>
        )
    }
}
