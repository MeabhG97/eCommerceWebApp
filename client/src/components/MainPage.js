import React, {Component} from "react";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

import "../css/MainPage.css";
import DisplayAllProducts from "./DisplayAllProducts";
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
                    showLogin={true} showMenuButton={true} showDashboard={true}/>

                <div className="mainAndMenu">
                    <main className={this.state.menuOpen ? "opened" : "closed"}>
                        <DisplayAllProducts/>
                    </main>
                    <SideMenu menuOpen={this.state.menuOpen}/>
                </div>
                <Footer/>
            </div>
        );
    }
}