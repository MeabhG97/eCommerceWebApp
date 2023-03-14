import React, {Component} from "react"
import "../css/ProductCard.css";


export default class ProductCard extends Component{
    render(){
        return(
            <div className="productCard">
                <div className="product-head"><h1>{this.props.product.productName}</h1></div>
                <div className="product-body"><img style={{width: "100%"}} src="https://static.nike.com/a/images/t_default/e839f55c-84d5-4030-9bcf-644e6a6463ea/revolution-6-running-shoes-FgfhgR.png"></img></div>
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