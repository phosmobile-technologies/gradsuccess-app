import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ItemSummary from './itemSummary' 
import paymentGateway from "../../images/payment_gateway.jpg"
    //import the library

    class checkoutSummary extends Component {
      render() {
        return (
          <div className = "cartStyle">

        
                <div className = "details-side-bar">
                    <ItemSummary />

                </div>
                <div className = "paymentGateway">
               <p>Pay with: </p> <img src={paymentGateway} alt="Logo"  />
               </div>
          </div>
        );
      }
    }


    export default checkoutSummary;