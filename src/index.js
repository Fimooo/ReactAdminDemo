import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './pages/demo/Life';
import Admin from './admin'
import RouteDemo from './pages/router_demo/router1/Home'
import RouteDemo2 from './pages/router_demo/router2/router'
import RouteDemo3 from './pages/router_demo/router3/router'
import Router from './router'
import { Provider } from 'react-redux';
import configStore from './redux/store'
import rootReducer from './redux/reducer'
import { createStore } from 'redux'

import * as serviceWorker from './serviceWorker';
const store = createStore(rootReducer)
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
