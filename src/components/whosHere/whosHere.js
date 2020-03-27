import React, { Component } from 'react'
import Staff from '../whosHere/staff/staff';
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
                <h2 class="text-center">Currently Here</h2>
                <div staff={staff}></div>
                <div students={students}></div>
            </div>
        )
    }
}

WhosHere.propTypes = {
    users: PropTypes.array
}