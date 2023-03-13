import React, {Component} from "react"
import "../css/ProductCard.css";


export default class ProductCard extends Component{
    render(){
        return(
            <div className="productCard">
                <div className="product-head"><h1>{this.props.product.productName}</h1></div>
                <div className="product-body"><img style={{width: "100%"}} src="https://preview.redd.it/80g7ddrm83n31.jpg?auto=webp&s=5e7190a2e6ff4fdd1861e8a1208a47277593fc70"></img></div>
                <div className="product-footer">
                    <p>{this.props.product.description}</p>
                    <p>{this.props.product.category}</p>
                    <p>{this.props.product.productPrice}</p>
                    <p>{this.props.product.stock}</p>
                </div>
            </div>
        )
    }
}