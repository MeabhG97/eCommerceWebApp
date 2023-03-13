import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../css/Header.css";

import {ReactComponent as MenuIcon} from "../icons/menu-burger.svg";
import {ReactComponent as MenuCloseIcon} from "../icons/cross.svg";
import {ReactComponent as LoginIcon} from "../icons/login.svg";
import {ReactComponent as RegisterIcon} from "../icons/register.svg";
import {ReactComponent as UserIcon} from "../icons/user.svg";
import {ReactComponent as LogoutIcon} from "../icons/logout.svg";

import { ACCESS_LEVEL_GUEST } from "../config/global-constants";
import { ACCESS_LEVEL_USER } from "../config/global-constants";
import { ACCESS_LEVEL_ADMIN } from "../config/global-constants";
export default class Header extends Component{

    render(){
        return( 
            <header>
                <div id="title">
                    <Link to={"/"} id="headerLink">
                        <h1>Heading</h1>
                    </Link>
                </div>
                <div id="buttons">
                    
                    {//Show Login and Register to Guests
                        this.props.showLogin &&
                        localStorage.userAccessLevel <= ACCESS_LEVEL_GUEST ?
                            <>
                                <Link to={"/Login"} className="button" id="login">
                                    <span>Login</span>
                                    <LoginIcon/>
                                </Link>
                                <Link to={"/Register"} className="button" id="register">
                                    <span>Register</span>
                                    <RegisterIcon/>
                                </Link>
                            </>
                        : null
                    }

                    {//Show User Profile to Users
                        localStorage.userAccessLevel == ACCESS_LEVEL_USER ?
                            <>
                                <Link to={"/UserProfile"} className="button" id="user">
                                    <span>Profile</span>
                                    <UserIcon/>
                                </Link>
                            </>
                        : null
                    }

                    {//Show Logout to Users and Admins
                        localStorage.userAccessLevel >= ACCESS_LEVEL_USER ?
                            <>
                                <Link to={"/Logout"} className="button" id="logout">
                                    <span>Logout</span>
                                    <LogoutIcon/>
                                </Link>
                            </>
                        : null
                    }

                    {this.props.showMenuButton ? 
                        (this.props.menuOpen ? 
                            <MenuCloseIcon className={"menuIcon"} onClick={this.props.handleMenuOpen}/> : 
                            <MenuIcon className={"menuIcon"} onClick={this.props.handleMenuOpen}/>)
                    : null}
                </div> 
            </header>   
        );
    }
}