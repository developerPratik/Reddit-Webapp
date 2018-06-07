import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import Router from './router';
import reducers from './_reducers';
import './assets/style.css';

let store = createStore(reducers, applyMiddleware(Thunk));


ReactDOM.render(<Router store={store}/>, document.getElementById('app'));

module.hot.accept();