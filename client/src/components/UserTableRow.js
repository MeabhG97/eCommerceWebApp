import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { SERVER_HOST } from "../config/global-constants";

import {ReactComponent as DeleteIcon} from "../icons/delete.svg";
import {ReactComponent as UserIcon} from "../icons/user.svg";

export default class ProductTableRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            imageData: null
        }
    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/user/get/image/${this.props.user.profileImage}`)
            .then(res => {
                if(res.data){
                    this.setState({imageData: res.data.image});
                }
            });
    }

    render(){
        return(
            <tr>
                <td className="name">{this.props.user.userName}</td>
                <td className="image">
                    {this.state.imageData !== null ?
                        <img src={`data:;base64,${this.state.imageData}`} id="image" alt=""/>
                    :
                        <UserIcon id="image"/>
                    }
                </td>
                <td className="email">{this.props.user.email}</td>
                <td className="purchases">
                    Purchases
                </td>
                <td className="controls">
                    <Link to={"/user/delete/" + this.props.user._id} 
                        className="deleteButton">
                            <span>Delete</span>
                            <DeleteIcon/>
                    </Link>
                </td>     
            </tr>
        )
    }
}