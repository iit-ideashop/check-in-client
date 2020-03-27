import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

export default class WhosHere extends Component {
    render() {
        const staff = [];
        const students = [];
        for (let u of this.props.users) {
            if (u.type.level > 0)
                staff.push(u);
            else
                students.push(u);
        }

        return (
            <div className="w-100">
                <h1>Who&apos;s Here</h1>
                <div staff={staff}></div>
                <div students={students}></div>
            </div>
        )
    }
}

WhosHere.propTypes = {
    users: PropTypes.array
}