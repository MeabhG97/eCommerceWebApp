import React, {Component} from "react";
import { Link } from "react-router-dom";

import {ReactComponent as EditIcon} from "../icons/edit.svg";
import {ReactComponent as DeleteIcon} from "../icons/delete.svg";

import "../css/ProductTableRow.css" ;

export default class ProductTableRow extends Component{
    render(){
        return(
            <tr>
                <td className="name">{this.props.product.productName}</td>
                <td className="description">{this.props.product.description}</td>
                <td className="category">{this.props.product.category}</td>
                <td className="price">€{this.props.product.productPrice}</td>
                <td className="stock">{this.props.product.stock}</td>
                <td className="controls">
                    <Link to={"/EditProduct/" + this.props.product._id} 
                        className="editButton">
                            <span>Edit</span>
                            <EditIcon/>
                    </Link>
                    <Link to={"/DeleteProduct/" + this.props.product._id} 
                        className="deleteButton">
                            <span>Delete</span>
                            <DeleteIcon/>
                    </Link>
                </td>     
            </tr>
        )
    }
}