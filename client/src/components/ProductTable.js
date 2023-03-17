import React, { Component } from "react"
import ProductTableRow from "./ProductTableRow"

import "../css/ProductTable.css";

export default class ProductTable extends Component{
    render(){
        return(
            <table>
                <thead>
                    <tr id="headings">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.products.map((product) => <ProductTableRow key={product._id} product={product}/>)}
                </tbody>
            </table>
        )
    }
}