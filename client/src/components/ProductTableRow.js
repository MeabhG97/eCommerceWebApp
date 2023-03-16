import React, {Component} from "react"
import { Link } from "react-router-dom"

export default class ProductTableRow extends Component{
    render(){
        return(
            <tr style={{ border: "1px solid black", padding: "20px"}}>
                <td >{this.props.product.productName}</td>
                <td>{this.props.product.description}</td>
                <td>{this.props.product.category}</td>
                <td>{this.props.product.productPrice}</td>
                <td>{this.props.product.stock}</td>
                <td><Link to={"/EditProduct/" + this.props.product._id}>Edit</Link></td>
                <td><Link to={"/DeleteProduct/" + this.props.product._id}>Delete</Link></td>     
            </tr>
        )
    }
}