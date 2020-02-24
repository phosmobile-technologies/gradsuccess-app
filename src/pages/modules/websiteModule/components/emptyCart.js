import React, { Component } from 'react';

export default class EmptyCart extends Component {
  render() {
    return (
      <div>
        <div className="cart-summary-container">
          No Item in Cart
        </div>
      </div>
    )
  }
}
