import React, {Component} from "react"
import { Link } from "react-router-dom"

import axios from "axios"
import {SERVER_HOST} from "../config/global-constants" 

export default class ProductDetails extends Component{
    constructor(props){
        super(props)

        this.state = {
            productName : "",
            description: "",
            category:"",
            productPrice: "",
            stock: "",
            redirectToAdminDashboard: false
        }
    }

    componentDidMount() {
       

        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`)
            .then(res => {
                if (res.data) {
                    
                    if (res.data.errorMessage) {    
                        console.log(res.data.errorMessage)
                    }
                    else {
                        this.setState({
                            productName: res.data.productName,
                            description: res.data.description,
                            category: res.data.category,
                            productPrice: res.data.productPrice,
                            stock: res.data.stock,
                            
                        })
                    }
                }
                else {
                    console.log(`Record not found`)
                }
            })
    }

    render(){
        return(
            <div className="productCard">
                <div className="product-title">
                    <h3>{this.state.productName}</h3>
                </div>
                <img style={{width: "100%"}} src="https://preview.redd.it/80g7ddrm83n31.jpg?auto=webp&s=5e7190a2e6ff4fdd1861e8a1208a47277593fc70" alt=""/>
                <div className="product-info">
                    <span className="product-desc">{this.state.description}</span>
                    <span className="product-category">{this.state.category}</span>
                    <span className="product-price">€{this.state.productPrice}</span>
                    <span className="product-stock">Stock: {this.state.stock}</span>
                </div>
            </div>
        )
    }
}