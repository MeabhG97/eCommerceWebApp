import React, {Component} from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";

import Footer from "./Footer";
import Header from "./Header";

import "../css/Register.css";
import { SERVER_HOST } from "../config/global-constants";
import { Redirect } from "react-router";

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            isRegistered: false,
            isNameValid: true,
            isEmailValid: true,
            doPasswordMatch: true
        };
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.name !== prevState.name){
            let namePattern = /^[\w]{4,20}$/;
            if(!this.state.name.match(namePattern) && this.state.isNameValid){
                this.setState({isNameValid: false});
            }
            else if(this.state.name.match(namePattern) && !this.state.isNameValid){
                this.setState({isNameValid: true});
            }
        }

        if(this.state.email !== prevState.email){
            let emailPattern = /(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}/;
            if(!this.state.email.match(emailPattern) && this.state.isEmailValid){
                this.setState({isEmailValid: false});
            }
            else if(this.state.email.match(emailPattern) && !this.state.isEmailValid){
                this.setState({isEmailValid: true});
            }
        }

        if(this.state.confirmPassword !== prevState.confirmPassword){
            if(this.state.confirmPassword !== this.state.password){
                this.setState({doPasswordMatch: false});
            }
            else if(this.state.confirmPassword === this.state.password){
                this.setState({doPasswordMatch: true});
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.isNameValid && this.state.isEmailValid && this.state.doPasswordMatch){
            console.log(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`);
            axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`)
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
                            this.setState({isRegistered: true});
                        }
                    }
                });
        }
    }

    render(){
        return(
            <>
                <>
                    {this.state.isRegistered ? <Redirect to="/"/> : null}
                </>
                <div id="RegisterPage">
                    <Header showLogin={false}/>

                    <main>
                        <h3>Register</h3>
                        <form noValidate={true} id="login">
                            <input name="name" type="text" placeholder="User Name" autoComplete="name" 
                                value={this.state.name} onChange={this.handleInputChange}
                            />
                            {!this.state.isNameValid ?
                                <div className="inputErrorMessage">
                                    User Name must only contain alphanumeric characters and _ <br/> <br/>
                                    User Name must be between 4-20 characters long
                                </div>
                            : null}

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
                            <input name="confirmPassword" type="password" placeholder="Confirm Password" 
                                autoComplete="confirmPassword" value={this.state.confirmPassword} 
                                onChange={this.handleInputChange}
                            />
                            {!this.state.doPasswordMatch ?
                                <div className="inputErrorMessage">
                                    Passwords do not match
                                </div>
                            : null}
                        </form>

                        <div id="buttons">
                            <Link id={"cancel"} to={"/"}>Cancel</Link>
                            <button type="button" id="register" onClick={this.handleSubmit}>
                                Register
                            </button>
                        </div>
                    </main>

                    <Footer/>
                </div>
            </>
        );
    }
}