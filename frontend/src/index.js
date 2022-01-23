import React from 'react'
import {render} from 'react-dom'
import './index.css'
import App from './components/App'
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./store/reducers";

const store = createStore(rootReducer);

render((
    <Provider store={store}>
        <App/>
    </Provider>),
    document.getElementById('root')
);