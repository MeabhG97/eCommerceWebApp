import React, {Component} from "react";

import "../css/SideMenu.css";

export default class SideMenu extends Component{

    
    constructor(props) {
        super(props)
    }
    
    render(){
        return( 
            <div id="SideMenu" className={this.props.menuOpen ? "opened" : "closed"}>
                <button onClick={this.props.sortByPriceAscending}>Price - Low to High</button><br/>
                <button onClick={this.props.sortByPriceDescending}>Price - High to Low</button><br/>
                <button onClick={this.props.sortByNameAscending}>Alphabetical - A to Z</button><br/>
                <button onClick={this.props.sortByNameDescending}>Alphabetical - Z to A</button><br/>
                <select name="categories" onChange={this.props.handleCategoryChange}>
								{this.props.categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
            </div>
        );
    }
}