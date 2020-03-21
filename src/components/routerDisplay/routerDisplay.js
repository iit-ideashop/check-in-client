import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../pages/index';

export default class RouterDisplay extends Component {
    render() {
        return (
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
        )
    }
}
