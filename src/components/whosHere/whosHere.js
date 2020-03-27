import React, { Component } from 'react'
import Staff from '../whosHere/staff/staff';

export default class WhosHere extends Component {
    render() {
        return (
            <div class="w-100">
                <h1 class="text-center">Who&apos;s Here</h1>
                <React.Fragment>
                    <Staff/>
                </React.Fragment>
            </div>
        )
    }
}
