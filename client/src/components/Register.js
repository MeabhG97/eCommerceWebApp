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
            isRegistered: false,
            isNameValid: true,
            isEmailValid: true
        };
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidUpdate(prevState){
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
    }

    render(){
        return(
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
                                User Name must only contain alphanumeric characters and _ <br/>
                                User Name muct be between 4-20 characters long
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
                    </form>

                    <div id="buttons">
                        <Link id={"cancel"} to={"/"}>Cancel</Link>
                        <button type="button" id="register">
                            Register
                        </button>
                    </div>
                </main>

                <Footer/>
            </div>
        );
    }
}