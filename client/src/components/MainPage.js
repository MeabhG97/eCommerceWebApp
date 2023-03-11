import React, {Component} from "react";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

import "../css/MainPage.css";
export default class MainPage extends Component {
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
            <div id="MainPage" className={this.state.menuOpen ? "opened" : "closed"}>
                <Header menuOpen={this.state.menuOpen} handleMenuOpen={this.handleMenuOpen}
                    showLogin={true} showMenuButton={true}/>
                <SideMenu menuOpen={this.state.menuOpen}/>
                <main className={this.state.menuOpen ? "opened" : "closed"}>
                    
                </main>
                <Footer/>
            </div>
        );
    }
}