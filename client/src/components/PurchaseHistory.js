import React, {Component} from "react";
import axios from "axios";

import Footer from "./Footer";
import Header from "./Header";

import { SERVER_HOST } from "../config/global-constants";

export default class PurchaseHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            purchases: []
        }
    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/user/purchases/${this.props.match.params.id}`)
            .then(res => {
                if(res.data){
                    this.setState({purchases: res.data.purchases});
                }
            })
    }

    render(){
        return(
            <>
                <Header/>
                <main>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>PayPal ID</th>
                                <th>Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.purchases.map(purchase => {
                                return (<tr>
                                    <td>{purchase.date}</td>
                                    <td>{purchase.paypalID}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </main>
                <Footer/>
            </>
        );
    }
}