import React, {Component} from "react"
import {Redirect} from "react-router-dom"

import axios from "axios"
import {SERVER_HOST} from "../config/global-constants"

export default class DeleteProduct extends Component {
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToAdminDashboard:false
        }
    }

    componentDidMount() 
    {   
        axios.delete(`${SERVER_HOST}/products/${this.props.match.params.id}`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // success
                { 
                    console.log("Record deleted")
                }
                this.setState({redirectToAdminDashboard:true})
            }
            else 
            {
                console.log("Record not deleted")
            }
        })
    }
  
  
    render() 
    {
        return (
            <div>   
                {this.state.redirectToAdminDashboard ? <Redirect to="/Dashboard/"/> : null}                      
            </div>
        )
    }
}