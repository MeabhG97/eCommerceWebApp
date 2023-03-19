import React, {Component} from "react";

import "../css/SideMenu.css";

export default class SideMenu extends Component{
    
    render(){
        return( 
            <div id="SideMenu" className={this.props.menuOpen ? "opened" : "closed"}>
                <div></div>
            </div>
        );
    }
}