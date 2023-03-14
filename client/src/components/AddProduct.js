import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import axios from "axios"
import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global-constants"


export default class AddProduct extends Component {
    constructor(props){
        super(props)

        this.state = {
            productName:"",
            description:"",
            category:"",
            productPrice:"",
            stock:"",
            redirectToDisplayAllProducts: false
        
        }
    }

        
    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }

    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const createdProduct = {
            productName: this.state.productName,
            description: this.state.description,
            category: this.state.category,
            productPrice: this.state.productPrice,
            stock: this.state.stock,
        }

        axios.post(`${SERVER_HOST}/products`, createdProduct)
            .then(res => {
                if (res.data) {
                    
                console.log(res.data)
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Record added")
                        this.setState({ redirectToDisplayAllProducts: true })
                    }
                }
                else {
                    console.log("Record not added")
                }
            })
    }

    render(){
        return(
            <div className="productCreationForm">
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/DisplayAllProducts"/> : null}                                            
                    
                    <Form>
                        <Form.Group controlId="productName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="productName" value={this.state.productaName} onChange={this.handleChange} />
                        </Form.Group>
        
                        <Form.Group controlId="description">
                            <Form.Label> Item Description</Form.Label>
                            <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                        </Form.Group>
        
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                        </Form.Group>
                                              
                        <Form.Group controlId="productPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="text" name="productPrice" value={this.state.productPrice} onChange={this.handleChange} />
                        </Form.Group>
    
                                               
                        <Form.Group controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="text" name="stock" value={this.state.stock} onChange={this.handleChange} />
                        </Form.Group>
        
                            <LinkInClass value="Add" className="blue-button"  onClick={this.handleSubmit}/>            
                              <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>
                    </Form>
            </div>
        )
    }
 
}