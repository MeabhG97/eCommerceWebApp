import React, {Component} from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";

import { SERVER_HOST } from "../config/global-constants";

export default class ShoppingBag extends Component{
    constructor(props){
        super(props);
        this.state = {
            isBagEmpty: false,
            products: [],
            totalPrice: 0
        }
    }

    componentDidMount(){
        if(typeof localStorage.shoppingBag !== "undefined"){
            let items = JSON.parse(localStorage.getItem("shoppingBag"));
            items.map(item => {
                return axios.get(`${SERVER_HOST}/products/${item}`)
                    .then(res => {
                        if(res.data){
                            let product = {};
                            product.id = item;
                            product.name = res.data.productName;
                            product.price = res.data.productPrice;
                            product.stock = res.data.stock;
                            product.image = res.data.images[0];
                            product.quantity = 1;
                            this.setState({products: [...this.state.products, product]}, () => {this.calculateTotalPrice()});
                        }
                    });
            });
        }
        else{
            this.setState({isBagEmpty: true});
        }
    }

    calculateTotalPrice = () => {
        console.log("total")
        let total = 0;
        this.state.products.map(product => {
            total += product.price * product.quantity;
        });
        this.setState({totalPrice: total});
    }

    decreaseQuantity = (id) => {
        let productArr = this.state.products.filter(product => {
            return product.id === id;
        });
        let productUpdate = productArr[0];
        if(productUpdate.quantity > 1){
            productUpdate.quantity -= 1;
            this.setState({
                products: this.state.products.map(product =>{
                    return (product.id === id ?
                        {...product,  productUpdate}
                        : product)
                    })
                }, () => {this.calculateTotalPrice()});
        }
    }

    increaseQuantity = (id) => {
        let productArr = this.state.products.filter(product => {
            return product.id === id;
        });
        let productUpdate = productArr[0];
        if(productUpdate.quantity < productUpdate.stock){
            productUpdate.quantity += 1;
            this.setState({
                products: this.state.products.map(product =>{
                    return (product.id === id ?
                        {...product,  productUpdate}
                        : product)
                    })
                }, () => {this.calculateTotalPrice()});
        }
    }


    render(){
        return(
            <div className="shoppingBag">
                <Header/>
                <main>
                    <span>Shopping Bag</span>
                    <span>Items currently in your bag:</span>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(product => {
                                return (
                                    <tr>
                                        <td>{product.name}</td>
                                        {typeof product.image !== "undefined"?
                                            <td>{product.image}</td>
                                        :
                                            <td>null</td>
                                        }
                                        <td>
                                            <button type="button" 
                                                onClick={() => this.decreaseQuantity(product.id)}>

                                            </button>
                                            {product.quantity}
                                            <button type="button" 
                                                onClick={() => this.increaseQuantity(product.id)}>

                                            </button>
                                        </td>
                                        <td>
                                            {(Math.round(product.price * product.quantity * 100) / 100).toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <span>{(Math.round(this.state.totalPrice * 100) / 100).toFixed(2)}</span>
                </main>
                <Footer/>
            </div>
        );
    }
}