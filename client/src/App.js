import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import MainPage from "./components/MainPage";
import Login from "./components/Login";
import PurchaseHistory from "./components/PurchaseHistory";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import LoggedInRoute from "./components/LoggedInRoute";

import { ACCESS_LEVEL_GUEST } from "./config/global-constants";
import Logout from "./components/Logout";
import AddProduct from "./components/AddProduct";

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
                    <Route exact path="/AddProduct" component={AddProduct}/>
                    <LoggedInRoute exact path="/UserProfile" component={UserProfile}/>
                    <LoggedInRoute exact path="/PurchaseHistory" component={PurchaseHistory}/>
                    <LoggedInRoute exact path="/Logout" component={Logout}/>
                    <Route path="*" component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}