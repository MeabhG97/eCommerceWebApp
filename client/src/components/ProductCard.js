import React, {Component} from "react";
import axios from "axios";

import {SERVER_HOST} from "../config/global-constants";

import {ReactComponent as NoImage} from "../icons/no-image.svg";

import "../css/ProductCard.css";

export default class ProductCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            imageData: ""
        }
    }

    componentDidMount(){
        if(this.props.product.images[0] !== null){
            axios.get(`${SERVER_HOST}/products/image/${this.props.product.images[0]}`)
                .then(res => {
                    if(res.data){
                        this.setState({imagesData: res.data.image});
                    }
                });
        }
    }

    render(){
        return(
            <a href={"/product/" + this.props.product._id}>
            <div className="productCard">
                <div className="product-title">
                    <h3>{this.props.product.productName}</h3>
                </div>

                <div className="imageContainer">
                    {this.state.imageData !== "" ?
                        <img src={`data:;base64,${this.state.imageData}`} className="image"/>
                    :
                        <NoImage/>
                    }
                </div>
                
                <div className="product-info">
                    <span className="product-price">€{this.props.product.productPrice}</span>
                    <span className="product-stock">Stock: {this.props.product.stock}</span>
                </div>
            </div>
            </a>
        )
    }
}