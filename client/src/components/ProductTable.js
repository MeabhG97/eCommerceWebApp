import React, { Component } from "react"
import ProductTableRow from "./ProductTableRow"


export default class ProductTable extends Component{
    render(){
        return(
            <div>
                <tr style={{ border: "1px solid black", padding: "20px"}}>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th> Controls</th>
                </tr>
                {this.props.products.map((product) => <ProductTableRow key={product._id} product={product} />)}
            </div>
        )
    }
}