import React, {Component} from "react"
import "../css/ProductCard.css";


export default class ProductCard extends Component{
    render(){
        return(
            <div className="productCard">
                <div className="product-title">
                    <h3>{this.props.product.productName}</h3>
                </div>
                <img style={{width: "100%"}} src="https://preview.redd.it/80g7ddrm83n31.jpg?auto=webp&s=5e7190a2e6ff4fdd1861e8a1208a47277593fc70" alt=""/>
                <div className="product-info">
                    <span className="product-desc">{this.props.product.description}</span>
                    <span className="product-category">{this.props.product.category}</span>
                    <span className="product-price">€{this.props.product.productPrice}</span>
                    <span className="product-stock">Stock: {this.props.product.stock}</span>
                </div>
            </div>
        )
    }
}