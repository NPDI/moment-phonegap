/* import 'framework7/dist/css/framework7.ios.min.css';
import 'framework7/dist/css/framework7.ios.colors.min.css'; */

/* OR for Material Theme: */
import 'framework7/dist/css/framework7.material.min.css'
import 'framework7/dist/css/framework7.material.colors.min.css'

import 'font-awesome/css/font-awesome.min.css'

import './css/app.css';

import React from 'react';
import ReactDOM from 'react-dom';

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './components/main/reducers'
import {App} from './components/main/App';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
&& window.__REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
