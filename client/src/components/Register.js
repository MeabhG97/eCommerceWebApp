import React, {Component} from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import "../css/Register.css";

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            isRegistered: false
        };
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <>
                <Header showLogin={false}/>
                <h3>Register</h3>
                <form noValidate={true} id="login">
                    <input name="name" type="text" placeholder="Name" autoComplete="name" 
                        value={this.state.name} onChange={this.handleInputChange}
                    />
                    <input name="email" type="text" placeholder="Email" autoComplete="email"
                        value={this.state.email} onChange={this.handleInputChange}
                    />
                    <input name="password" type="password" placeholder="Password" autoComplete="password"
                        value={this.state.password} onChange={this.handleInputChange}
                    />
                    <input name="confirmPassword" type="password" placeholder="Confirm Password" 
                        autoComplete="confirmPassword" value={this.state.confirmPassword} 
                        onChange={this.handleInputChange}
                    />
                </form>

                <Link id={"cancel"} to={"/"}>Cancel</Link>
                <button type="button" id="register">
                    Register New User
                </button>

                <Footer/>
            </>
        );
    }
}