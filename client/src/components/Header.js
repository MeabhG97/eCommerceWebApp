import React, {Component} from "react";

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
                <button  type="button" className="white-purple">
                    Login
                    <LoginIcon/>
                </button>
                <button  type="button" className="purple-white">
                    Register
                    <RegisterIcon/>
                </button> 

                {this.props.menuOpen ? <MenuCloseIcon onClick={this.props.handleMenuOpen}/> : 
                <MenuIcon onClick={this.props.handleMenuOpen}/>} 
            </header>   
        );
    }
}