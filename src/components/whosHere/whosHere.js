import React, { Component } from 'react'
import Staff from '../whosHere/staff/staff';
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
            <React.Fragment>
                <div className="w-100 text-center">Currently here</h1>
                <Staff staff={staff} />
                <Students students={students} />
            </React.Fragment>
        )
    }
}

WhosHere.propTypes = {
    users: PropTypes.array
}