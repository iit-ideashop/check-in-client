import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

export class Index extends Component {
    render() {
        return (
            <Jumbotron className="align-center">
                <h1>Please tap your ID to check in/out.</h1>
            </Jumbotron>
        )
    }
}
