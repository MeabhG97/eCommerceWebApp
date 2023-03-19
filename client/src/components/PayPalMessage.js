import React, {Component} from "react";
import {Redirect, Link} from "react-router-dom";

export default class PayPalMessage extends Component{
    static type = {
        SUCCESS: "success",
        ERROR: "error",
        CANCEL: "cancel"
    }

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            heading: "",
            body: "",
        }
    }

    componentDidMount(){
        if(this.props.match.params.type === PayPalMessage.type.SUCCESS){
            this.setState({
                heading: "Payment Confirmed",
                body: "Your order will be on the way shortly "
            })
        }
        else if(this.props.match.params.type === PayPalMessage.type.CANCEL){
            this.setState({
                heading: "Payment Canclled",
                body: "Your order has been cancelled"
            });
        }
        else if(this.params.match.type === PayPalMessage.type.ERROR){
            this.setState({
                heading: "Payment Error",
                body: "There was an issue in processing your payment"
            })
        }
    }

    continue = () => {
        this.setState({redirect: true})
    }

    render(){
        return(
            <div className="paypal">
                {this.state.redirect ?
                    <Redirect to={"/"}/>
                :
                    null
                }
                <span className="heading">{this.state.heading}</span>
                <span className="body">{this.state.body}</span>
                {this.props.match.params.type === PayPalMessage.type.SUCCESS ?
                    <div className="orderID">
                        <span className="message">PayPal Order ID:</span>
                        <span className="id">{this.props.match.params.orderID}</span>
                    </div>
                    :
                    null
                }
                <button type="button" onClick={this.continue}>
                    <span>Continue</span>
                </button>
            </div>
        );
    }
}