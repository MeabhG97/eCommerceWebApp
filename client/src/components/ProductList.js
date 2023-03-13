import React, { Component } from "react"
import ProductCard from "./ProductCard"
import "../css/ProductList.css";


export default class ProductList extends Component{
    render(){
        return(
            <div className="productList">
                {this.props.products.map((product) => <ProductCard key={product._id} product={product}/>)}
            </div>
        )
    }
}