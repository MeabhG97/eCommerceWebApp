import React, {Component} from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";

import {ReactComponent as NoImage} from "../icons/no-image.svg";
import {ReactComponent as BackArrow} from "../icons/arrow-back.svg";
import {ReactComponent as ForwardArrow} from "../icons/arrow-forward.svg";

import {SERVER_HOST} from "../config/global-constants";

import "../css/ProductDetails.css";

export default class ProductDetails extends Component{
    constructor(props){
        super(props)

        this.state = {
            productName : "",
            description: "",
            category:"",
            productPrice: "",
            stock: "",
            images: [],
            imagesData: [],
            imageIndex: 0,
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
                            images: res.data.images
                        }, () => {
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
                else {
                    console.log(`Record not found`);
                }
            })
    }

    prevImage = () => {
        if(this.state.imageIndex-1 < 0){
            this.setState({imageIndex: this.state.imagesData.length-1});
        }
        else{
            this.setState({imageIndex: this.state.imageIndex-1});
        }
    }

    nextImage = () => {
        if(this.state.imageIndex+1 >= this.state.imagesData.length){
            this.setState({imageIndex: 0});
        }
        else{
            this.setState({imageIndex: this.state.imageIndex+1});
        }
    }

    render(){
        return(
            <>
                <Header showLogin={true}/>
                <main>
                    <div className="productImages">
                        {this.state.imagesData.length > 0 ?
                            <>
                                <img src={`data:;base64,${this.state.imagesData[this.state.imageIndex]}`} 
                                    className="image"/>
                                <div className="buttons">
                                    <button type="button" className="arrowButton" onClick={this.prevImage}>
                                        <BackArrow/>
                                    </button>
                                    <button type="button" className="arrowButton" onClick={this.nextImage}>
                                        <ForwardArrow/>
                                    </button>
                                </div>
                            </>
                        :
                            <NoImage className="noImage"/>
                        }
                    </div>
                    <div className="productInfo">
                            {this.state.productName}
                            <span className="info">{this.state.description}</span>
                            <span className="info">{this.state.category}</span>
                            <span className="info">€{this.state.productPrice}</span>
                            <span className="info">Stock: {this.state.stock}</span>
                    </div>
                </main>
                <Footer/>
            </>
        )
    }
}