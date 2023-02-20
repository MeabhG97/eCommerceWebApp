import React, {Component} from "react";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Main from "./components/Main";
import Footer from "./components/Footer";

import "./css/App.css";
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {buttonCount: 0};
    }

    handleButton = () => {
        this.setState({buttonCount: this.state.buttonCount + 1});
    }

    render(){
        return (
            <>
                <Header/>
                <SideMenu handleButton={this.handleButton}/>
                <Main buttonCount={this.state.buttonCount}/>
                <Footer/>
            </>
        );
    }
}