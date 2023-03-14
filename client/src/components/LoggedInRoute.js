import React from "react";
import { Route, Redirect } from "react-router-dom";

import { ACCESS_LEVEL_GUEST } from "../config/global-constants";

const LoggedInRoute = ({ component: Component, exact, path, ...rest }) => 
(
    <Route
        exact = {exact}
        path = {path}
        render = {props => localStorage.accessLevel > ACCESS_LEVEL_GUEST ? 
            <Component {...props} {...rest} /> : <Redirect to="/MainPage"/> }
    />
)

export default LoggedInRoute