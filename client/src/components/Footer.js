import React, {Component} from "react";

import "../css/Footer.css";

import {ReactComponent as GitHubIcon} from "../icons/github-logo.svg";

export default class Footer extends Component{

    render(){
        return( 
            <footer>
                <span>
                    eCommerce Website Assignment
                </span>
                <a targer="_blank" href="https://github.com/MeabhG97/eCommerceWebApp">
                    <GitHubIcon/>
                </a>
            </footer>
        );
    }
}