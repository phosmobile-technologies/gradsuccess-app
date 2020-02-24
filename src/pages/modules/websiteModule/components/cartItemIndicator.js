import React, { Component } from "react"
import cartImage from "../../../../images/cart.svg"
import { Link } from "gatsby"
import { connect } from "react-redux"

const mapStateToProps = state => {
  return { items: state.cart.cartItems }
}

class CartItemIndicator extends Component {
  render() {
    return (
      <div>
        <div className="cart_wrapper">
          <Link to="cart">
            <div className="cart">
              <div>
                {this.props.items.length > 0 ? (
                  <span id="counter" className="cart_indicator">
                    {this.props.items.length}
                  </span>
                ) : (
                  <div></div>
                )}
                <img src={cartImage} alt="cart icon" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null,
  null
)(CartItemIndicator)
