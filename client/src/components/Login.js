import React, {Component} from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import "../css/Login.css";

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            isEmailValid: true
        };
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidUpdate(prevProps, prevState){
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
                        <button type="button" id="login">
                            Login
                        </button>
                    </div>
                </main>

                <Footer/>
            </div>
        );
    }
}