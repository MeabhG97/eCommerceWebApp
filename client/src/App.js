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
import AdminRoute from "./components/AdminRoute";
import AddNewProduct from "./components/AddNewProduct";
import DeleteUser from "./components/DeleteUser";
import ShoppingBag from "./components/ShoppingBag";
import ProductDetails from "./components/ProductDetails";
import PayPalMessage from "./components/PayPalMessage";

import { ACCESS_LEVEL_GUEST } from "./config/global-constants";

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
                    <Route exact path="/product/:id" component={ProductDetails}/>
                    <Route exact path="/ShoppingBag" component={ShoppingBag}/>
                    <Route exact path="/PayPalMessage/:type/:orderID" component={PayPalMessage}/>
                    <LoggedInRoute exact path="/UserProfile" component={UserProfile}/>
                    <LoggedInRoute exact path="/PurchaseHistory" component={PurchaseHistory}/>
                    <AdminRoute exact path="/AdminDashboard" component={AdminDashboard}/>
                    <AdminRoute exact path="/AddNewProduct" component={AddNewProduct}/>
                    <AdminRoute exact path="/EditProduct/:id" component={EditProduct}/>
                    <AdminRoute exact path="/DeleteProduct/:id" component={DeleteProduct}/>
                    <AdminRoute exact path="/DeleteUser/:id" component={DeleteUser} />
                    <Route path="*" component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}