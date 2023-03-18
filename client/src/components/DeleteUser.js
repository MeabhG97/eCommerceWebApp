import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

import {SERVER_HOST} from "../config/global-constants"

export default class DeleteUser extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            redirectToAdminDashboard:false
        }
    }

    componentDidMount() {
        axios.delete(`${SERVER_HOST}/user/delete/${this.props.match.params.id}`)
            .then(res => {
                if(res.data){
                    if(res.data.errorMessage) {
                        console.log(res.data.errorMessage);    
                    }
                    else { 
                        console.log("Record deleted");
                    }
                }
                else{
                    console.log("Record not deleted");
                }
                this.setState({redirectToAdminDashboard:true});
            })
    }
  
  
    render() {
        return (
            <>   
                {this.state.redirectToAdminDashboard ? <Redirect to="/AdminDashboard"/> : null}                      
            </>
        );
    }
}