import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Container from "./components/Container";
import Login from "./components/Login";
import Register from "./components/Register";

export default class App extends Component {


    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Login" component={Login}/>
                    <Route exact path="/Register" component={Register}/>
                    <Route path="*" component={Container}/>
                </Switch>
            </BrowserRouter>
        );
    }
}