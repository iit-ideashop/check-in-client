import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Students from './student/students';

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
            <div className="w-100 text-center">
                <h1>Currently here</h1>
                <div className="w-100 text-left">
                    <div staff={staff}></div>
                    <Students students={students} />
                </div>
            </div>
        )
    }
}

WhosHere.propTypes = {
    users: PropTypes.array
}