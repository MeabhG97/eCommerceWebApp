import React, {Component} from "react";
import ProductTable from "./ProductTable";
import { Link } from "react-router-dom"
import axios from "axios"

import Header from "./Header";
import Footer from "./Footer";

import {SERVER_HOST} from "../config/global-constants"

import {ReactComponent as UserIcon} from "../icons/user.svg";
import {ReactComponent as ProductIcon} from "../icons/box.svg";

import "../css/AdminDashboard.css";

export default class AdminDashboard extends Component{
    
    constructor(props){
        super(props)
        
        this.state = {
            products : [],
            viewProducts: true
        }

    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/products`)
            .then(res => {
                if (res.data) {
                    console.log(res.data)
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Records read")
                        this.setState({ products: res.data })
                        console.log(res.data)
                    }
                }
                else {
                    console.log("Record not found")
                }
            })
    }

    switchToProducts = () => {
        this.setState({viewProducts: true});
    }

    switchToUsers = () => {
        this.setState({viewProducts: false});
    }

    render(){
        return(
            <div id="admin-dashboard">
                <Header showDashboard={false}/>

                <main>
                    <div id="adminViewOptions">
                        <button type="button" className="button" id="products" 
                            onClick={this.switchToProducts}>
                            <span>Products</span>
                            <ProductIcon/>
                        </button>

                        <button type="button" className="button" id="users" 
                            onClick={this.switchToUsers}>
                            <span>Users</span>
                            <UserIcon/>
                        </button>

                        <Link to={"/"} className="button" id="back">
                        <span>Back</span>
                    </Link>
                    </div>

                    {this.state.viewProducts ?
                        <ProductTable products={this.state.products}/>
                    :
                        null
                    }
                </main>

                <Footer/>
            </div>
        )
    }
}