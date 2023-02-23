import React, {Component} from "react";

import "../css/Header.css";
import menuIcon from "../icons/menu-burger.svg";
import menuCloseIcon from "../icons/cross.svg";

export default class Header extends Component{

    render(){
        return( 
            <header>
                <h1>Heading</h1>
                <img src={this.props.menuOpen ? menuIcon : menuCloseIcon} alt="menu icon" 
                    onClick={this.props.handleMenuOpen}/>
            </header>   
        );
    }
}