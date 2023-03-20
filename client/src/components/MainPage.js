import React, {Component} from "react";

import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";
import axios from "axios"
import {SERVER_HOST} from "../config/global-constants" 
import "../css/MainPage.css";
import DisplayAllProducts from "./DisplayAllProducts";
export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            allProducts : [],
            products : [],
            categories : [],
            menuOpen: false,
            selectedCategory: "All Products"
        };
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
                        this.setState({ allProducts: res.data })
                        let categories = res.data.map((product) => product.category);
                        let uniqueCategories = [...new Set(categories)];
                        uniqueCategories.unshift("All Categories");
                        this.setState({categories:uniqueCategories})
                    }
                }
                else {
                    console.log("Record not found")
                }
            })
    }



    handleMenuOpen = () => {
        this.setState({menuOpen: !this.state.menuOpen});
        
    }

    sortByPriceAscending(){
        let sortedProducts = this.state.products.sort((product1,product2) => (product1.productPrice - product2.productPrice))
        this.setState({products : sortedProducts})
    }

    sortByPriceDescending(){
        let sortedProducts = this.state.products.sort((product1,product2) => (product2.productPrice - product1.productPrice))
       this.setState({products : sortedProducts})
    }

    sortByNameAscending(){
        let sortedProducts = this.state.products.sort(function(a, b) {
            const product1Name = a.productName.toUpperCase(); // ignore upper and lowercase
            const product2Name = b.productName.toUpperCase(); // ignore upper and lowercase
            if (product1Name > product2Name) {
              return 1;
            }
            if (product1Name < product2Name) {
              return -1;
            }
          
            // names must be equal
            return 0;
          });
        this.setState({products : sortedProducts})
    }

    sortByNameDescending(){
        let sortedProducts = this.state.products.sort(function(a, b) {
            const product1Name = a.productName.toUpperCase(); // ignore upper and lowercase
            const product2Name = b.productName.toUpperCase(); // ignore upper and lowercase
            if (product1Name > product2Name) {
              return -1;
            }
            if (product1Name < product2Name) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
        this.setState({products : sortedProducts})
    }

    searchProduct(e){
        this.state.products = this.state.allProducts
        this.setState({products:this.state.products.filter((product) => product.productName.toLowerCase().includes(e.target.value.toLowerCase()))})
        console.log(this.state.products)
    }


    handleCategoryChange = (e) => {
        this.state.products = this.state.allProducts
        if (e.target.value === "All Categories") {
            this.setState({ products: this.state.allProducts });
        } else {

            this.setState({
                products: this.state.products.filter(
                    (product) => product.category === e.target.value
                ),
            });
        }
    };
    

    

    render(){
        return (
            <div id="MainPage" className={this.state.menuOpen ? "opened" : "closed"}>
                <Header menuOpen={this.state.menuOpen} handleMenuOpen={this.handleMenuOpen}
                  showLogin={true} showMenuButton={true} showDashboard={true} searchProduct={this.searchProduct.bind(this)} showShoppingBag={true}/>


                <div className="mainAndMenu">
                    <main className={this.state.menuOpen ? "opened" : "closed"}>
                        <DisplayAllProducts products={this.state.products}/>
                    </main>
                    <SideMenu handleCategoryChange={this.handleCategoryChange.bind(this)} categories={this.state.categories} sortByNameDescending={this.sortByNameDescending.bind(this)} sortByNameAscending={this.sortByNameAscending.bind(this)} sortByPriceDescending={this.sortByPriceDescending.bind(this)} sortByPriceAscending={this.sortByPriceAscending.bind(this)} products={this.state.products} menuOpen={this.state.menuOpen}/>
                </div>
                <Footer/>
            </div>
        );
    }
}