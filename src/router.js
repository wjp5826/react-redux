import React from 'react';
import { Route, Router, BrowserRouter, HashRouter, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import App from './container/app';
import Loadable from 'react-loadable';
import AuthLogin from './container/AuthLogin';
import Login from './container/Login/login';

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "Home" */ './container/Home/home'),
    loading: () => {
        return <div>loading</div>
    }
})

const Result = Loadable({
    loader: () => import(/* webpackChunkName: "result" */ './container/result/result'),
    loading: () => {
        return <div>loading...</div>
    }
})

const history = createHistory();

class Routers extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
                        <AuthLogin path="/home" component={Home} />
                        {/*<Route path="/home" component={Home} />*/}
                        <Route path="/second" component={Result} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
export default Routers;