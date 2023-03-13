import React, { Component } from "react"
import ProductCard from "./ProductCard"
import "../css/ProductList.css";


export default class ProductList extends Component{
    render(){
        return(
            <div class="productList">
                {this.props.products.map((product) => <ProductCard key={product._id} product={product}/>)}
            </div>
        )
    }
}