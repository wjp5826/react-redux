import React from 'react';
import { Route, Router, BrowserRouter, HashRouter, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import asyncComponent from './asyncComponent';
import App from './container/app';

import Home from './container/Home/home';
import Result from './container/result/result';
// const Home = asyncComponent(() => import(/* webpackChunkName: "Home" */'./container/Home/home'));

const history = createHistory();

class Routers extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
                        <Route path="/home" component={Home} />
                        <Route path="/second" component={Result} />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
export default Routers;