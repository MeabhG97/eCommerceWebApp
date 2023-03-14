import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

import Footer from "./Footer";
import Header from "./Header";

import "../css/UserProfile.css";
import { SERVER_HOST } from "../config/global-constants";

export default class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            image: ""
        }
    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/users/one/${localStorage.userID}`)
            .then(res => {
                if(res.data){
                    if(res.data.code === 200){
                        this.setState({name: res.data.name, email: res.data.email, image: res.data.image});
                    }
                    else{
                        console.log(res.data.code + res.data.errorMessage);
                    }
                }
            });
    }

    render(){
        return(
            <div id="UserProfile">
                <Header showLogin={false}/>
                <main>
                    <div className="profileImage">
                        
                    </div>
                    <div className="userInfo">
                        <span className="heading">Username</span>
                        <span className="info">{this.state.name}</span>
                    </div>
                    <div className="userInfo">
                        <span className="heading">Email</span>
                        <span className="info">{this.state.email}</span>
                    </div>
                    <Link to={"/PurchaseHistory"} className="button" id="PurchaseHistory">
                        <span>Purchase History</span>
                    </Link>
                    <Link to={"/"} className="button" id="back">
                        <span>Back</span>
                    </Link>
                </main>
                <Footer/>
            </div>
        );
    }
}