import React, {Component} from "react";
import DisplayAllProducts from "./DisplayAllProducts";
import ProductTable from "./ProductTable";
import { Link } from "react-router-dom"


import axios from "axios"
import {SERVER_HOST} from "../config/global-constants" 

export default class AdminDashboard extends Component{
    
    constructor(props){
        super(props)
        
        this.state = {
            products : []
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

    render(){
        return(
            <div className="admin-dashboard-container">
                <ProductTable products={this.state.products}/>
                <br/>
                <Link to={"/"}>Back to homepage</Link>
            </div>
        )
    }
}