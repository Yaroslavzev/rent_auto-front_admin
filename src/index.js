import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes'
import './app.css'

import {Provider} from 'react-redux'; 
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'; 
import reducer from './store/reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
) )
const app = (
 
    <Provider store={store}>
        <BrowserRouter>
        <Routes />
        </BrowserRouter>  
        </Provider>
  );


ReactDOM.render(app, document.getElementById('root'));

