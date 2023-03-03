import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import MainPage from "./components/MainPage";
import Login from "./components/Login";
import PurchaseHistory from "./components/PurchaseHistory";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import { ACCESS_LEVEL_GUEST } from "./config/global-constansts";

if(typeof localStorage.userAccessLevel === "undefined"){
    localStorage.userAccessLevel = ACCESS_LEVEL_GUEST;
    localStorage.userName = "Guest";
    localStorage.userID = -1;
}

export default class App extends Component {

    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Login" component={Login}/>
                    <Route exact path="/Register" component={Register}/>
                    <Route exact path="/UserProfile" component={UserProfile}/>
                    <Route exact path="/PurchaseHistory" component={PurchaseHistory}/>
                    <Route path="*" component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}