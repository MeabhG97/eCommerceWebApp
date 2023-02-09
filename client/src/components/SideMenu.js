import React, {Component} from "react";

import "../css/SideMenu.css";

export default class SideMenu extends Component{

    handleButton = () => {
        
    }

    render(){
        return( <div id="SideMenu">
                    SideMenu
                    <button type="button" onClick={this.handleButton}>button</button>
                </div>);
    }
}