import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import MainPage from "./components/MainPage";
import Login from "./components/Login";
import PurchaseHistory from "./components/PurchaseHistory";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import LoggedInRoute from "./components/LoggedInRoute";
import AdminDashboard from "./components/AdminDashboard";
import EditProduct from "./components/EditProduct";
import DeleteProduct from "./components/DeleteProduct";

import { ACCESS_LEVEL_GUEST } from "./config/global-constants";
import AdminRoute from "./components/AdminRoute";
import AddNewProduct from "./components/AddNewProduct";

const createError = require("http-errors");

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
                    <LoggedInRoute exact path="/UserProfile" component={UserProfile}/>
                    <LoggedInRoute exact path="/PurchaseHistory" component={PurchaseHistory}/>
                    <AdminRoute exact path="/AdminDashboard" component={AdminDashboard}/>
                    <AdminRoute exact path="/AddNewProduct" component={AddNewProduct}/>
                    <AdminRoute exact path="/EditProduct/:id" component={EditProduct} />
                    <AdminRoute exact path="/DeleteProduct/:id" component={DeleteProduct} />
                    <Route path="*" component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}