import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckoutList from './CheckoutList'
import { Link } from "gatsby"



export default class ItemSummary extends Component {
  constructor(props){
    super(props);

    this.state = {
      Items:[],
      totalAmount: 0
    }
    this.addFormLS = this.addFormLS.bind(this);
  }

  addFormLS = (num)=>{

    let amt = 0
  	let _items = this.state.Items
  	_items.push(num);
  }

  componentDidMount() {
    let _item = localStorage.getItem('ItemsInCart')
    let CheckoutAmount = localStorage.getItem('CheckoutAmount')

    if(_item){
    	_item = JSON.parse(_item)
    	_item.forEach(this.addFormLS)
    }
     this.setState({
      totalAmount: CheckoutAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    })

    }
  
  render() {
    return (
      <div>
        <h3>Cart</h3>
        {
          this.state.Items.map((item,index) =>(
            <CheckoutList key={index} index = {index} desc = {item.IitemDescription} delFunc = {this.DeleteItem}/>
              ))
        
        }
      <div className = "summaryPrice">N {this.state.totalAmount}</div>
      </div>
    )
  }
}


