import React, {Component} from "react";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import axios from "axios";
import {Redirect} from "react-router";

import PayPalMessage from "./PayPalMessage";

import {SERVER_HOST, SANDBOX_ID} from "../config/global-constants";

export default class Purchase extends Component{
    constructor(props){
        super(props);
        this.state = {
            paypalMessage: null,
            redirectToMessage: false,
            paypalOrderID: null,
            productsIDAndQuantity: []
        }
    }

    componentDidMount(){
        this.props.products.map(product => {
            let pIDQ = {};
            pIDQ.id = product.id;
            pIDQ.quantity = product.quantity;
            this.setState({productsIDAndQuantity: [...this.state.productsIDAndQuantity, pIDQ]});
        });
    }

    createOrder = (data, actions) => {
        return actions.order.create({purchase_units:[{amount:{value:this.props.price}}]});
    }

    approve = (data) => {
        console.log(`${SERVER_HOST}/user/purchase/${localStorage.getItem("userID")}/${data.orderID}/${JSON.stringify(this.state.productsIDAndQuantity)}`)
        axios.put(`${SERVER_HOST}/user/purchase/${localStorage.getItem("userID")}/${data.orderID}/${JSON.stringify(this.state.productsIDAndQuantity)}`)
            .then(res => {
                this.setState({
                    paypalMessage: PayPalMessage.type.SUCCESS,
                    paypalOrderID: data.orderID,
                    redirectToMessage: true
                });
                localStorage.removeItem("shoppingBag");
            }).catch(error => {
                console.log(error);
                this.setState({
                    paypalMessage: PayPalMessage.type.ERROR,
                    redirectToMessage: true
                });
            });
    }

    error = (data) => {
        this.setState({
            paypalMessage: PayPalMessage.type.ERROR,
            redirectToMessage: true
        });
    }

    cancel = (data) => {
        this.setState({
            paypalMessage: PayPalMessage.type.CANCEL,
            redirectToMessage: true
        });
    }

    render(){
        return(
            <>
                {this.state.redirectToMessage ? 
                    <Redirect to={`/PayPalMessage/${this.state.paypalMessage}/${this.state.paypalOrderID}`}/> 
                : null}
                <PayPalScriptProvider options={{currency: "EUR", "client-id": SANDBOX_ID}}>
                    <PayPalButtons createOrder={this.createOrder} onApprove={this.approve} onCancel={this.cancel} onError={this.error}/>
                </PayPalScriptProvider>
            </>
        );
    }
}
