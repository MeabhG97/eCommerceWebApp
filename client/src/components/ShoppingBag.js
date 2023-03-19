import React, {Component} from "react";

import Header from "./Header";
import Footer from "./Footer";

export default class ShoppingBag extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }


    render(){
        return(
            <div className="shoppingBag">
                <Header/>
                <main>

                </main>
                <Footer/>
            </div>
        );
    }
}