import React, {Component} from "react";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Main from "./Main";
import Footer from "./Footer";

import "../css/Container.css";
export default class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false
        };
    }

    handleMenuOpen = () => {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    render(){
        return (
            <div id="Container" className={this.state.menuOpen ? "opened" : "closed"}>
                <Header menuOpen={this.state.menuOpen} handleMenuOpen={this.handleMenuOpen}
                    showLogin={true} showMenuButton={true}/>
                <SideMenu menuOpen={this.state.menuOpen} handleButton={this.handleButton}/>
                <Main menuOpen={this.state.menuOpen} buttonCount={this.state.buttonCount}/>
                <Footer/>
            </div>
        );
    }
}