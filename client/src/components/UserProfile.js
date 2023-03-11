import React, {Component} from "react";
import {Link} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import "../css/UserProfile.css";

export default class UserProfile extends Component{

    render(){
        return(
            <div id="UserProfile">
                <Header showLogin={false}/>
                <main>
                    <div className="profileImage">
                        
                    </div>
                    <div className="userInfo">
                        <span className="heading">Username</span>
                        <span className="info">{localStorage.userName}</span>
                    </div>
                    <div className="userInfo">
                        <span className="heading">Email</span>
                        <span className="info">{localStorage.userEmail}</span>
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