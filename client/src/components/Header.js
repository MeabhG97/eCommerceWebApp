import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../css/Header.css";
import {ReactComponent as MenuIcon} from "../icons/menu-burger.svg";
import {ReactComponent as MenuCloseIcon} from "../icons/cross.svg";
import {ReactComponent as LoginIcon} from "../icons/login.svg";
import {ReactComponent as RegisterIcon} from "../icons/register.svg";

export default class Header extends Component{

    render(){
        return( 
            <header>
                <h1>Heading</h1>

                <div id="buttons">
                    {this.props.showLogin ?
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
                    : null}
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