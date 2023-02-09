import React, {Component} from "react";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Main from "./components/Main";
import Footer from "./components/Footer";

import "./css/App.css";
export default class App extends Component {
    render(){
        return (
            <>
                <Header/>
                <SideMenu/>
                <Main/>
                <Footer/>
            </>
        );
    }
}