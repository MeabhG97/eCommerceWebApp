import React, {Component} from "react";

import "../css/SideMenu.css";

export default class SideMenu extends Component{

    render(){
        return( <div id="SideMenu">
                    SideMenu
                    <button type="button" onClick={this.props.handleButton}>button</button>
                </div>);
    }
}