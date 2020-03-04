import React, { Component } from "react"
import { connect } from "react-redux"
import CartItemCard from "./cartItemCard"
import CartPriceCard from "./cartPriceCard"
import EmptyCart from './emptyCart'
import { Callout} from "@blueprintjs/core"

class CartSummary extends Component {
  constructor(props) {
    super()
    this.state = {
      subTotal: 0,
      total: 0,
      showErrorDialogue: false,
      showSuccessDialogue: false,
      errorMessage: "",
      successMessage: "",
    }
  }
  showErrorDialogue = message => {
    this.setState({
      showErrorDialogue: true,
      errorMessage: message,
    })

    setInterval(() => {
      this.setState({
        showErrorDialogue: false,
      })
    }, 5000)
  }

  showSuccessDialogue = message => {
    this.setState({
      showSuccessDialogue: true,
      successMessage: message,
    })

    setInterval(() => {
      this.setState({
        showSuccessDialogue: false,
      })
    }, 5000)
  }


  render() {
    return (
      <div>
        {this.props.cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-summary-container">
            <section className="c-s-main">
              {this.state.showErrorDialogue && (
                <Callout
                  title="Something went wrong"
                  className="bp3-intent-danger cart-resize"
                  icon="error"
                >
                  {this.state.errorMessage}
                </Callout>
              )}
              {this.state.showSuccessDialogue && (
                <Callout
                  title="Successful"
                  className="bp3-intent-success cart-resize"
                  icon="tick"
                >
                  {this.state.successMessage}
                </Callout>
              ) }

              <div className="cart-header">
                <h2>Your Cart</h2>
                <p>
                  You have sellected{" "}
                  <span>({this.props.cartItems.length})</span> packages
                </p>
              </div>
              {this.props.cartItems.map((item, index) => {
                return (
                  <CartItemCard
                    details={item}
                    key={index}
                    index={index}
                    calculateState={this.calculateState}
                  />
                )
              })}
            </section>
            <section className="cart-summary-card">
              <CartPriceCard
                showErrorDialogue={this.showErrorDialogue}
                showSuccessDialogue =  {this.showSuccessDialogue}
               />
            </section>
          </div>
        )}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    cartItems: state.cart.cartItems,
  }
}

export default connect(
  mapStateToProps,
  null
)(CartSummary)
