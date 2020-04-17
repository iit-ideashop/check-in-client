import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, InputGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css'
import { SocketContext } from '../../socketContext';


export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: "",
            name: "",
            emailPrefix: "",
            emailSuffix: "@hawk.iit.edu",
            card: 123456,
            facility: 2508,
            layoutName: 'default'
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.setState((state, props) => ({
                sid: props.user.sid,
                name: props.user.name,
                emailPrefix: props.user.email && props.user.email.split('@')[0],
                emailSuffix: props.user.email && '@' + props.user.email.split('@')[1],
                card: props.card.cardnum,
                facility: props.card.facility
            }));
        }
    }

    onSidChange(e) {
        const val = e.target.value;
        this.setState(() => ({
            sid: val
        }));
        if (this.keyboard) this.keyboard.setInput(val);
    }

    onNameChange(e) {
        const val = e.target.value;
        this.setState(() => ({
            name: val
        }));
        if (this.keyboard) this.keyboard.setInput(val);
    }

    onEmailPrefixChange(e) {
        const val = e.target.value;
        this.setState(() => ({
            emailPrefix: val
        }));
        if (this.keyboard) this.keyboard.setInput(val);
    }

    onEmailSuffixChange(value) {
        this.setState(() => ({
            emailSuffix: value
        }));
    }

    onSubmit(e) {
        e.preventDefault();
        const responseObject = {
            card: this.state.card,
            user: {
                source: 'register-page',
                sid: this.state.sid,
                name: this.state.name,
                email: this.state.emailPrefix + this.state.emailSuffix
            }
        };
        this.context.emit('register', responseObject);
        typeof(this.props.onSubmit) === 'function' && this.props.onSubmit(responseObject);
    }

    onKeyboardChange(input) {
        this.setState((state) => {
            const newState = {};
            newState[state.focused] = input;
            return newState;
        });
    }

    onChangeFocus(field) {
        if (this.keyboard) {
            this.keyboard.setInput(this.state[field]);
        }
        this.setState((state) => ({
            focused: field,
            layoutName: field === 'name' && state.name === '' ? 'shift' : 'default'
        }));
    }

    onKeyPress(key) {
        if (key === "{shift}" || key === "{lock}") {
            this.setState((state) => ({
                layoutName: state.layoutName === "default" ? "shift" : "default"
            }));
        } else if (key === "{tab}") {
            this.setState((state) => {
                switch (state.focused) {
                    case "sid":
                        this.keyboard.setInput(state.name);
                        return { focused: 'name', layoutName: state.name === '' ? 'shift' : 'default' };
                    case "name":
                        this.keyboard.setInput(state.emailPrefix);
                        return { focused: 'emailPrefix' };
                    case "emailPrefix":
                        this.keyboard.setInput(state.sid);
                        return { focused: 'sid' };
                    default:
                        this.keyboard.setInput(state.sid);
                        return { focused: 'sid' };
                }
            })
        } else if (key === "{enter}" && this.state.focused === 'emailPrefix') {
            // submit if we're on the last field
            this.onSubmit({preventDefault: () => {}});
        } else if (this.state.focused === 'name' && key === '{space}') {
            this.setState(() => ({
                layoutName: 'shift'
            }));
        } else {
            this.setState(() => ({
                layoutName: 'default'
            }));
        }
    }

    render() {
        return (
            <Form onSubmit={(e) => this.onSubmit(e)} className="w-100">
                <Card>
                    <Card.Header>
                        Please confirm your information below.
                    </Card.Header>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Student ID</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>A</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="numeric"
                                    value={this.state.sid}
                                    placeholder='20123456'
                                    onChange={(e) => this.onSidChange(e)}
                                    onFocus={() => this.onChangeFocus('sid')}
                                    required />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.name}
                                placeholder='Jane Doe'
                                onChange={(e) => this.onNameChange(e)}
                                onFocus={() => this.onChangeFocus('name')}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>IIT Email</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={this.state.emailPrefix}
                                    placeholder='jdoe3'
                                    onChange={(e) => this.onEmailPrefixChange(e)}
                                    onFocus={() => this.onChangeFocus('emailPrefix')}
                                    required />
                                    {/*<Form.Control
                                        as="select"
                                        className="custom-select"
                                        value={this.state.emailSuffix}
                                        onChange={(e) => this.onEmailSuffixChange(e)}>
                                        <option>@hawk.iit.edu</option>
                                        <option>@iit.edu</option>
                                        <option>@id.iit.edu</option>
                                        <option>@kaplan.iit.edu</option>
                                        <option>@stuart.iit.edu</option>
                                        <option>@kentlaw.iit.edu</option>
                                        <option>@vandercook.edu</option>
                                    </Form.Control>*/}
                                <DropdownButton
                                    as={InputGroup.Append}
                                    variant="dark"
                                    title={this.state.emailSuffix}
                                    onSelect={(value) => this.onEmailSuffixChange(value)}
                                    alignRight={true}>
                                    <Dropdown.Item eventKey="@hawk.iit.edu" active={this.state.emailSuffix === '@hawk.iit.edu'}>@hawk.iit.edu</Dropdown.Item>
                                    <Dropdown.Item eventKey="@iit.edu" active={this.state.emailSuffix === '@iit.edu'}>@iit.edu</Dropdown.Item>
                                    <Dropdown.Item eventKey="@id.iit.edu" active={this.state.emailSuffix === '@id.iit.edu'}>@id.iit.edu</Dropdown.Item>
                                    <Dropdown.Item eventKey="@kaplan.iit.edu" active={this.state.emailSuffix === '@kaplan.iit.edu'}>@kaplan.iit.edu</Dropdown.Item>
                                    <Dropdown.Item eventKey="@stuart.iit.edu" active={this.state.emailSuffix === '@stuart.iit.edu'}>@stuart.iit.edu</Dropdown.Item>
                                    <Dropdown.Item eventKey="@kentlaw.iit.edu" active={this.state.emailSuffix === '@kentlaw.iit.edu'}>@kentlaw.iit.edu</Dropdown.Item>
                                    <Dropdown.Item eventKey="@vandercook.edu" active={this.state.emailSuffix === '@vandercook.iit.edu'}>@vandercook.iit.edu</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                        </Form.Group>
                        <Keyboard
                            keyboardRef={r => this.keyboard = r}
                            onChange={(input) => this.onKeyboardChange(input)}
                            onKeyPress={(key) => this.onKeyPress(key)}
                            layoutName={this.state.layoutName}
                            tabCharOnTab={false}
                            autoUseTouchEvents={true}
                            newLineOnEnter={false} />
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            variant="primary"
                            type="submit">
                            Continue
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        );
    }
}

Register.propTypes = {
    user: PropTypes.object,
    card: PropTypes.object,
    onSubmit: PropTypes.func
}

Register.contextType = SocketContext;

export default Register;