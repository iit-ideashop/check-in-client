import React, { Component } from 'react'
import Staff from '../whosHere/staff/staff';

export default class WhosHere extends Component {
    render() {
        return (
            <div class="w-100">
                <h2 class="text-center">Currently Here</h2>
                <React.Fragment>
                    <Staff/>
                </React.Fragment>
            </div>
        )
    }
}
