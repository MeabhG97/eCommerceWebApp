import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";

import Footer from "./Footer";
import Header from "./Header";

import "../css/Login.css";
import { SERVER_HOST } from "../config/global-constants";

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            isEmailValid: true,
            isLoggedIn: false
        };
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.email !== prevState.email){
            // eslint-disable-next-line
            let emailPattern = /(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}/;
            if(!this.state.email.match(emailPattern) && this.state.isEmailValid){
                this.setState({isEmailValid: false});
            }
            else if(this.state.email.match(emailPattern) && !this.state.isEmailValid){
                this.setState({isEmailValid: true});
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.isEmailValid){
            console.log(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`);
            axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
                .then(res => {
                    console.log(res);
                    if(res.data){
                        if(res.data.errorMessage){
                            console.log(res.data.errorMessage);
                        }
                        else{
                            localStorage.userName = res.data.name;
                            localStorage.userID = res.data.userID;
                            localStorage.userAccessLevel = res.data.accessLevel;
                            this.setState({isLoggedIn: true});
                        }
                    }
                });
        }
    }

    render(){
        return(
            <>
                <>
                    {this.state.isLoggedIn ? <Redirect to="/"/> : null}
                </>
                <div id="LoginPage">
                    <Header showLogin={false}/>

                    <main>
                        <h3>Login</h3>
                        
                        <form noValidate={true} id="loginForm">
                            <input name="email" type="text" placeholder="Email" autoComplete="email"
                                value={this.state.email} onChange={this.handleInputChange}
                            />
                            {!this.state.isEmailValid ?
                                <div className="inputErrorMessage">
                                    Invalid email
                                </div>
                            : null}

                            <input name="password" type="password" placeholder="Password" autoComplete="password"
                                value={this.state.password} onChange={this.handleInputChange}
                            />
                        </form>

                        <div id="buttons">
                            <Link id={"cancel"} to={"/"}>Cancel</Link>
                            <button type="button" id="login" onClick={this.handleSubmit}>
                                Login
                            </button>
                        </div>
                    </main>

                    <Footer/>
                </div>
            </>
        );
    }
}