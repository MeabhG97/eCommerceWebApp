import React, { Component } from "react"
import ProductTableRow from "./ProductTableRow"

import "../css/ProductTable.css";

export default class ProductTable extends Component{
    render(){
        return(
            <table>
                <thead>
                    <tr id="headings">
                        <th className="name">Name</th>
                        <th className="description">Description</th>
                        <th className="category">Category</th>
                        <th className="price">Price</th>
                        <th className="stock">Stock</th>
                        <th className="controls">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.products.map((product) => <ProductTableRow key={product._id} product={product}/>)}
                </tbody>
            </table>
        )
    }
}