import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import Header from "./Header";
import Footer from "./Footer";

import { SERVER_HOST } from "../config/global-constants"

import {ReactComponent as NoImage} from "../icons/no-image.svg";


export default class AddNewProduct extends Component{
    constructor(props){
        super(props)

        this.state = {
            productName : "",
            description: "",
            category:"",
            productPrice: "",
            stock: "",
            images: [],
            selectedFile: "",
            imagesData: [],
            redirectToAdminDashboard: false
        }
    }

    componentDidMount() {
        
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleFileChange = (e) => {
        this.setState({selectedFile: e.target.files[0]});
    }
    
    componentDidUpdate(prevProps, prevState){
        if(this.state.selectedFile !== prevState.selectedFile){
            let formData = new FormData();
            formData.append("image", this.state.selectedFile);

            axios.put(`${SERVER_HOST}/product/new-image`, formData, {headers: {"Content-Type": "multipart/form-data"}})
                .then(res => {
                    if(res.data){
                        if(res.data.filename){
                            this.setState({images: [...this.state.images, res.data.filename]}, () => {
                                this.setState({imagesData: []});
                                this.state.images.map(image => {
                                    return axios.get(`${SERVER_HOST}/products/image/${image}`)
                                        .then(res => {
                                            if(res.data){
                                                this.setState({
                                                    imagesData: [...this.state.imagesData, res.data.image]
                                                });
                                            }
                                        });
                                });
                            });
                        }
                    }
                });
        }
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
                    <div id="productImagesDisplay">
                        <label htmlFor="productImage" id="productImageLabel">
                            <input type="file" id="productImage" name="productImage"
                                accept="image/png image/jpeg" onChange={this.handleFileChange}/>
                            <span>Add Image</span>
                        </label>

                        {this.state.imagesData.length > 0 ?
                            this.state.imagesData.map(image => <img src={`data:;base64,${image}`} className="image"/>)
                        : 
                            <NoImage/>
                        }
                    </div>

                    <div id="productInfo">
                        <div id="info">
                            Product Information
                        </div>

                        <input ref={(input) => { this.inputToFocus = input }} type="text" 
                            name="productName" value={this.state.productName} 
                            onChange={this.handleChange} placeholder="Product Name"/>
                        <textarea value={this.state.description} name="description" 
                            onChange={this.handleChange} placeholder="Product Description"></textarea>

                        <input type="text" name="category" value={this.state.category} 
                            onChange={this.handleChange} placeholder="Product Category"/>

                        <input type="text" name="productPrice" value={this.state.productPrice} 
                            onChange={this.handleChange} placeholder="Product Price"/>
                        
                        <input type="text" name="stock" value={this.state.stock} 
                            onChange={this.handleChange} placeholder="Stock Count"/>
                        

                        <div id="buttons">
                            <button type="button" id="confirm" onClick={this.handleSubmit}>
                                <span>Confirm</span>
                            </button>
                            <Link to={"/Dashboard"} id="cancel">
                                <span>Cancel</span>
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}