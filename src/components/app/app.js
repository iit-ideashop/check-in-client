import React, { Component } from 'react';
import { Col, Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import GlobalNav from '../globalNav/globalNav';
import { Index } from "../pages/index/index";
import WhosHere from '../whosHere/whosHere';
import './app.css';



export default class App extends Component {
    constructor() {
        super();
        this.endpoint = 'http://localhost:5000/v2'
        this.state = {
            hardware_id: 901,
            location: {
                name: "Assembly Space",
                id: 2,
                token: ""
            },
            labState: {
                activeUsers: []
            }
        };
    }

    componentDidMount() {
        localStorage.debug = 'socket.io-client:manager';
        const socket = io(this.endpoint)

        socket.on('connect', () => {
            // if we already have a token, attempt a reauth
            if (this.state.location.token) {
                socket.emit('reauth', {
                    'location_id': this.state.location.id,
                    'hardware_id': this.state.hardware_id,
                    'token': this.state.location.token
                });
            } else {
                // replace with the actual secret (but don't forget to change it back!), at least until auth component is done
                socket.emit('auth', {
                    'location_id': 2,
                    'hardware_id': 901,
                    'secret': 'blarg'
                })
            }
        });
        socket.on('reconnect', () => {

        });
        socket.on('auth_success', (data) => {
            this.setState(data.initial_state);
        });
        socket.connect();
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
                            {this.state.location.token && <Redirect to="/" />}
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
                            {!this.state.location.token && <Redirect to="/auth" />}
                            <Container fluid={true} id="layoutContainer">
                                <Col sm="8" lg="10" id="content">
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
                                <Col sm="4" lg="2" id="sidebar">
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
