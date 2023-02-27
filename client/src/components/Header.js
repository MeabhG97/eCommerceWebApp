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
                {this.props.showLogin ?
                    <>
                        <Link to={"/Login"} className="whitePuprleButtonLink">
                            Login
                            <LoginIcon/>
                        </Link>
                        <Link to={"/Register"} className="purpleWhiteButtonLink">
                            Register
                            <RegisterIcon/>
                        </Link>
                    </>
                : null}
                {this.props.showMenuButton ? (this.props.menuOpen ? <MenuCloseIcon onClick={this.props.handleMenuOpen}/> : 
                        <MenuIcon onClick={this.props.handleMenuOpen}/>)
                : null} 
            </header>   
        );
    }
}