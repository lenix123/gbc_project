import React from 'react';
import {render} from 'react-dom';
import './index.css'
import App from './components/App';
import Signin from "./components/Signin";
import {Provider} from "react-redux";
import {createStore, compose, applyMiddleware} from "redux";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./components/Signup";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

render((
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    </Provider>),
    document.getElementById('root')
);