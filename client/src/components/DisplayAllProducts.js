import React, {Component} from "react"
import { Link } from "react-router-dom"

import axios from "axios"
import {SERVER_HOST} from "../config/global-constants" 
import ProductList from "./ProductList"

export default class DisplayAllProducts extends Component{
    
    constructor(props) {
        super(props)
    }

   

    render(){
        return(
            <div className="list-container">
                <ProductList products={this.props.products}/>
            </div>
        )
    }
}