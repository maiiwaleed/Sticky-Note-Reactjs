import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/js/dist/modal'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "jquery/dist/jquery.min.js"

import './index.css';
import App from './App';
import { LoginContextProvider } from './store/LoginContext';




ReactDOM.render( 
    <BrowserRouter>
        <LoginContextProvider>
                <App />  
        </LoginContextProvider>
    </BrowserRouter>
, 
document.getElementById('root'));
