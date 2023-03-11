import React, {Component} from "react";

import "../css/Main.css";

export default class Main extends Component{

    render(){
        return( 
            <main className={this.props.menuOpen ? "opened" : "closed"}>
                    
            </main>
        );
    }
}