import React, { Component } from 'react';
import { Col, Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import GlobalNav from '../globalNav/globalNav';
import { Index } from "../pages/index/index";
import WhosHere from '../whosHere/whosHere';
import './app.css';
import Auth from '../pages/auth/auth';



export default class App extends Component {
    constructor() {
        super();
        this.endpoint = 'http://localhost:5000/v2'
        this.state = {
            location: {
                hardwareId: 901,
                name: "Assembly Space",
                locationId: 2,
                token: ""
            },
            labState: {
                activeUsers: []
            },
            appState: {
                auth: {
                    authInProgress: false,
                    locationList: {},
                    authErrorMessage: null
                }
            }
        };
        this.socket = io(this.endpoint)
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    componentDidMount() {
        localStorage.debug = '*';

        this.socket.on('connect', () => {
            // if we already have a token, attempt a reauth
            if (this.state.location.token) {
                this.socket.emit('reauth', {
                    'location_id': this.state.location.locationId,
                    'hardware_id': this.state.location.hardwareId,
                    'token': this.state.location.token
                });
            }
        });
        this.socket.on('reconnect', () => {
            this.socket.emit('reauth', {
                'location_id': this.state.location.locationId,
                'hardware_id': this.state.location.hardwareId,
                'token': this.state.location.token
            });
        });
        this.socket.on('auth_success', (data) => {
            localStorage.setItem("location_info", data.initial_state.location)
            this.setState((state) => ({
                ...data.initial_state,
                labState: {
                    ...data.initial_state.labState,
                    activeUsers: [...data.initial_state.labState.activeUsers, {
                        'source': 'db-with-location',
                        'sid': 20000000,
                        'name': 'Jane Doe',
                        'photo': null,
                        'type': {
                            'name': 'Lab Mentor',
                            'level': 50
                        },
                        'missingTrainings': false
                    }, {
                        'source': 'db-with-location',
                        'sid': 20000001,
                        'name': 'John Doe',
                        'photo': null,
                        'type': {
                            'name': 'User',
                            'level': 0
                        },
                        'missingTrainings': false
                    }, {
                        'source': 'db-with-location',
                        'sid': 20000002,
                        'name': 'Tana Doe',
                        'photo': null,
                        'type': {
                            'name': 'User',
                            'level': 0
                        },
                        'missingTrainings': true
                    }]
                },
                appState: {
                    ...state.appState,
                    auth: {
                        ...state.appState.auth,
                        authInProgress: false
                    }
                }
            }));
        });
        this.socket.on('auth_error', (data) => {
            this.setState((state) => ({
                appState: { ...state.appState, auth: { ...state.appState.auth, authInProgress: false, authErrorMessage: data.message } } }));
        });
        this.socket.on('user_enter', (data) => { 
            // add a user to state
            this.setState((state) => ({
                    ...state,
                    labState: {
                        ...state.labState,
                        activeUsers: [...state.labState.activeUsers, data.user],
                    },
                })
            );
        });
        this.socket.on('user_leave', (data) => {
            this.setState((state) => {
                return {
                    ...state,
                    labState: {
                        ...state.labState,
                        activeUsers: state.labState.activeUsers.filter((user) => user.sid !== data.user.sid)
                    }
                }
            });
        });
        this.socket.on('location_list', (data) => {
            this.setState((state) => { 
                console.log(data);
                const newState = {
                    appState: {...state.appState, auth: { ...state.appState.auth, locationList: data } } };
                console.log(newState);
                return newState;
            });
        });
        this.socket.connect();
    }

    sendAuthRequest(data) {
        this.setState((state) => { return { appState: { ...state.appState, auth: { ...state.appState.auth, authInProgress: true } } }});
        this.socket.emit('auth', {
            'location_id': data.locationId,
            'hardware_id': data.hardwareId,
            'secret': data.secret
        });
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
                                    <Auth
                                        onFormSubmit={(data) => this.sendAuthRequest(data)}
                                        // if auth isn't in progress and token is null or empty
                                        enabled={!this.state.appState.auth.authInProgress}
                                        locations={this.state.appState.auth.locationList}
                                        error={this.state.appState.auth.authErrorMessage} />
                                </div>
                            </Container>
                        </Route>
                        <Route path="/"> {/* matches anything */}
                            {/* if token is empty or null, redirect to /auth */}
                            {!this.state.location.token && <Redirect to="/auth" />}
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
                                    <WhosHere users={this.state.labState.activeUsers} />
                                </Col>
                            </Container>
                        </Route>
                    </Switch>
                </Container>
            </BrowserRouter>
        )
    }
}
