import React, { Component } from 'react';
import { Container, Col } from 'react-bootstrap';
import GlobalNav from '../globalNav/globalNav';
import RouterDisplay from '../routerDisplay/routerDisplay';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import WhosHere from '../whosHere/whosHere';


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            location: {
                name: "Assembly Space",
                id: "2"
            },
            labState: {
                staffInLab: [],
                studentsInLab: []
            }
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <BrowserRouter>
                <link rel="stylesheet"
                            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                            crossOrigin="anonymous" />
                <Container fluid={true} id="page">
                    <GlobalNav location={this.state.location.name} />
                    <Container fluid={true} id="layoutContainer">
                        <Col sm="8" lg="10" id="content">
                            <RouterDisplay />
                        </Col>
                        <Col sm="4" lg="2" id="sidebar">
                            <WhosHere staff={this.state.labState.staffInLab} students={this.state.labState.studentsInLab} />
                        </Col>
                    </Container>
                </Container>
            </BrowserRouter>
        )
    }
}
