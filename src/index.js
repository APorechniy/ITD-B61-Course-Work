import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history';
import Routes from "./components/Routes";

ReactDOM.render(
    <BrowserRouter history={createBrowserHistory}>
        <Routes />
    </BrowserRouter>, 
document.querySelector("#root"));