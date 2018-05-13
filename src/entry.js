import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducers from './reducers/index';
import thunk from 'redux-thunk';
import Router from './router';
import { Map } from 'immutable';

const history = createHistory();
const middleware = routerMiddleware(history);
const middlewares = [middleware, thunk];

const store = createStore(
    combineReducers(rootReducers),
    Map({}),
    composeWithDevTools(applyMiddleware(...middlewares))
)

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
)
