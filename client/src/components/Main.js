import React, {Component} from "react";

import "../css/Main.css";

export default class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return( <main>
                    main
                    buttonCount: {this.props.buttonCount} 
                </main>);
    }
}