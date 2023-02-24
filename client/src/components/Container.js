import React, {Component} from "react";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Main from "./components/Main";
import Footer from "./components/Footer";

import "./css/Container.css";
export default class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonCount: 0,
            menuOpen: false
        };
    }

    handleMenuOpen = () => {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    handleButton = () => {
        this.setState({buttonCount: this.state.buttonCount + 1});
    }

    render(){
        return (
            <div id="Container" className={this.state.menuOpen ? "opened" : "closed"}>
                <Header menuOpen={this.state.menuOpen} handleMenuOpen={this.handleMenuOpen}/>
                <SideMenu menuOpen={this.state.menuOpen} handleButton={this.handleButton}/>
                <Main menuOpen={this.state.menuOpen} buttonCount={this.state.buttonCount}/>
                <Footer/>
            </div>
        );
    }
}