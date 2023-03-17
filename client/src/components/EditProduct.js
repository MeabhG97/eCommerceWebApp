import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import Header from "./Header";
import Footer from "./Footer";

import LinkInClass from "../components/LinkInClass"
import { SERVER_HOST } from "../config/global-constants"

export default class EditProduct extends Component{
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
        this.inputToFocus.focus()

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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const editedProduct = {
            productName: this.state.productName,
            description: this.state.description,
            category: this.state.category,
            productPrice: this.state.productPrice,
            stock: this.state.stock
        }

        axios.put(`${SERVER_HOST}/products/${this.props.match.params.id}`, editedProduct)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log(`Record updated`)
                        this.setState({ redirectToAdminDashboard: true })
                    }
                }
                else {
                    console.log(`Record not updated`)
                }
            })
    }

    render() {
        return (
            <div id="editProduct">
                {this.state.redirectToAdminDashboard ? <Redirect to="/Dashboard" /> : null}
                <Header showDashboard={true}/>
                <main>
                    <div id="productImages">
                        
                    </div>

                    <div id="productInfo">
                        <div id="name">
                            <input ref={(input) => { this.inputToFocus = input }} type="text" 
                                name="productName" defaultValue={this.state.productName} 
                                onChange={this.handleChange}/>
                        </div>

                        <div id="description">
                            <input type="text" name="description" value={this.state.description} 
                                onChange={this.handleChange} />
                        </div>

                        <div id="category">
                        <input type="text" name="category" value={this.state.category} 
                            onChange={this.handleChange} />
                        </div>

                        <div id="price">
                        <input type="text" name="productPrice" value={this.state.productPrice} 
                            onChange={this.handleChange} />
                        </div>

                        <div id="stock">
                        <input type="text" name="stock" value={this.state.stock} 
                            onChange={this.handleChange} />
                        </div>
                    </div>
                    <LinkInClass value="Confirm changes" onClick={this.handleSubmit} />

                    <Link to={"/Dashboard"}>Cancel</Link>
                </main>
                <Footer/>
            </div>
        )
    }


}