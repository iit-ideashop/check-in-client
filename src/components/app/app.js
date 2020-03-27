import React, { Component } from 'react';
import { Container, Col } from 'react-bootstrap';
import GlobalNav from '../globalNav/globalNav';
import './app.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import WhosHere from '../whosHere/whosHere';
import { Index } from "../pages/index/index";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            location: {
                name: "Assembly Space",
                id: "2",
                token: ""
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
                    <Switch>
                        <Route path="/auth">
                            <Container id="layoutContainer">
                                <div id="content">
                                    <div>
                                        <h1>Auth page</h1>
                                    </div>
                                </div>
                            </Container>
                        </Route>
                        <Route path="/"> {/* matches anything */}
                            {/* if token is empty or null, redirect to /auth */}
                            {/*!this.state.location.token && <Redirect to="/auth" />*/}
                            <Container fluid={true} id="layoutContainer">
                                <Col sm={8} id="content">
                                    <Switch>
                                        <Route exact path="/">
                                            <Index />
                                        </Route>
                                        <Route path="/tapResult">
                                            {/*  */}
                                        </Route>
                                        <Route path="/register">
                                            {/*  */}
                                        </Route>
                                        <Route path="/waiver">
                                            {/*  */}
                                        </Route>
                                    </Switch>
                                </Col>
                                <Col sm={4} id="sidebar">
                                    <WhosHere staff={this.state.labState.staffInLab} students={this.state.labState.studentsInLab} />
                                </Col>
                            </Container>
                        </Route>
                    </Switch>
                </Container>
            </BrowserRouter>
        )
    }
}
