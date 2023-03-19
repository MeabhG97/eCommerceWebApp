import React, {Component} from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import Purchase from "./Purchase";

import {ReactComponent as MinusIcon} from "../icons/minus.svg";
import {ReactComponent as PlusIcon} from "../icons/plus.svg";
import {ReactComponent as RemoveIcon} from "../icons/cross.svg";
import {ReactComponent as NoImageIcon} from "../icons/no-image.svg";

import { SERVER_HOST } from "../config/global-constants";

import "../css/ShoppingBag.css";

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
        this.getAllItemsFromBag();
    }

    getAllItemsFromBag(){
        this.setState({products: []});
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

    remove = (id) => {
        let localItems = JSON.parse(localStorage.getItem("shoppingBag"));
        let remainingItems = localItems.filter(item => {
            return item !== id;
        });
        localStorage.setItem("shoppingBag", JSON.stringify(remainingItems));
        this.getAllItemsFromBag();
    } 

    render(){
        return(
            <div className="shoppingBag">
                <Header/>
                <main>
                    <span className="heading">Shopping Bag</span>
                    <span className="subHeading">Items currently in your bag:</span>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(product => {
                                return (
                                    <tr>
                                        <td>{product.name}</td>
                                        {typeof product.image !== "undefined"?
                                            <td className="image">{product.image}</td>
                                        :
                                            <td className="noImage"><NoImageIcon/></td>
                                        }
                                        <td className="quantity">
                                            <MinusIcon onClick={() => this.decreaseQuantity(product.id)}/>
                                            <span>{product.quantity}</span>
                                            <PlusIcon  onClick={() => this.increaseQuantity(product.id)}/>  
                                        </td>
                                        <td>
                                            {(Math.round(product.price * product.quantity * 100) / 100).toFixed(2)}
                                        </td>
                                        <td className="removeItem">
                                            <RemoveIcon onClick={() => this.remove(product.id)}/>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total:</td>
                                <td>{(Math.round(this.state.totalPrice * 100) / 100).toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <Purchase price={this.state.totalPrice} products={this.state.products}/>
                </main>
                <Footer/>
            </div>
        );
    }
}