import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GlobalNav from '../globalNav/globalNav';


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
            <html>
                <head>
                    <link rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                        crossOrigin="anonymous" />
                </head>
                <body>
                    <Container fluid={true} id="app-container" className="m-0 p-0">
                        <GlobalNav location={this.state.location.name} />
                        <Row>
                            <Col sm="8">
                                
                            </Col>
                            <Col sm="4">

                            </Col>
                        </Row>
                    </Container>
                </body>
            </html>
        )
    }
}
