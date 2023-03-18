import React, {Component} from "react"
import { Link } from "react-router-dom"

import axios from "axios"
import {SERVER_HOST} from "../config/global-constants" 
import ProductList from "./ProductList"

export default class DisplayAllProducts extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            products : []
        }

    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/products`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        this.setState({ products: res.data })
                    }
                }
                else {
                    console.log("Record not found")
                }
            })
    }

    render(){
        return(
            <div className="list-container">
                <ProductList products={this.state.products}/>
            </div>
        )
    }
}