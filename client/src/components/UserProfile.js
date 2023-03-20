import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

import { SERVER_HOST } from "../config/global-constants";

import Footer from "./Footer";
import Header from "./Header";

import {ReactComponent as UserIcon} from "../icons/user.svg";
import {ReactComponent as EditIcon} from "../icons/edit.svg";

import "../css/UserProfile.css";

export default class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            image: "",
            editImage: false,
            selectedFile: null
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

    editImage = () => {
        this.setState({editImage: !this.state.editImage});
    }

    handleFileChange = (e) => {
        this.setState({selectedFile: e.target.files[0]});
    }

    componentDidUpdate(prevProps, prevState){
        let formData = new FormData();
        formData.append("image", this.state.selectedFile);

        if(this.state.selectedFile !== prevState.selectedFile){
            axios.put(`${SERVER_HOST}/user/image/${localStorage.userID}`, formData, {headers: {"Content-Type": "multipart/form-data"}})
                .then(res => {
                    if(res.data){
                        if(res.data.image){
                            this.setState({image: res.data.image});
                        }
                    }
                });
        }
    }

    render(){
        return(
            <div id="UserProfile">
                <Header showLogin={false}/>
                <main>
                    <div className="profileImage">
                    {this.state.image === "" ?
                        <>
                            <UserIcon id="image"/>
                            <EditIcon id="edit" onClick={this.editImage}/>
                        </>
                    : 
                        <>
                            <img src={`data:;base64,${this.state.image}`} id="image" alt=""/>
                            <EditIcon id="edit" onClick={this.editImage}/>
                        </>
                    }
                    </div>

                    {this.state.editImage === true ?
                        <>
                            <label htmlFor="userImage" id="userImageLabel">
                                <input type="file" id="userImage" 
                                    accept="image/png image/jpeg" onChange={this.handleFileChange}/>
                                <span>Select Image</span>
                            </label>
                        </>
                    : 
                        null
                    }
                    <div className="userInfo">
                        <span className="heading">Username</span>
                        <span className="info">{this.state.name}</span>
                    </div>
                    <div className="userInfo">
                        <span className="heading">Email</span>
                        <span className="info">{this.state.email}</span>
                    </div>
                    <Link to={`/PurchaseHistory/${localStorage.getItem("userID")}`} className="button" id="PurchaseHistory">
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