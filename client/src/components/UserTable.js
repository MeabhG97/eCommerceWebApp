import React, { Component } from "react";

import UserTableRow from "./UserTableRow";

import { ACCESS_LEVEL_ADMIN } from "../config/global-constants";

import "../css/UserTable.css";

export default class UserTable extends Component{
    render(){
        return(
            <table>
                <thead>
                    <tr id="headings">
                        <th className="name">Name</th>
                        <th className="image">Image</th>
                        <th className="email">Email</th>
                        <th className="purchases">Purchases</th>
                        <th className="controls">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.users.map((user) => {
                        return user.accessLevel < ACCESS_LEVEL_ADMIN ?
                            <UserTableRow key={user._id} user={user}/>
                        : null
                        }
                    )}
                </tbody>
            </table>
        )
    }
}