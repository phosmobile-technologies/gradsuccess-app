import {
  Button,
  Card,
  Elevation,
  Divider,
  Collapse,
  InputGroup,
} from "@blueprintjs/core"
import React, { Component } from "react"
import CurrencyFormat from "react-currency-format"
import { connect } from "react-redux"
import { Callout } from "@blueprintjs/core"
import { COUPONS } from "../../../../api/couponCode"
import { Link } from "gatsby"

class CartPriceCard extends Component {
  constructor(props) {
    super()
    this.state = {
      isOpen: false,
      coupon: null,
      couponApplied: false,
    }
  }

  componentDidMount() {
    this.props.calSubTotal()

    if (this.props.cartItems.length >= 3) {
      var amount = this.getCartSubtotal() / 10
      this.props.calTotal(amount)
      this.props.showSuccessDialogue(
        "A 10% Discount applied, for service request of more than (3) three"
      )
    } else {
      this.props.calTotal(0)
    }
  }

  handlCollapsible = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  applyCoupon = () => {
    this.props.calTotal(0)
    this.setState({ isOpen: !this.state.isOpen })

    let applied_coupon = {
      code: null,
      discount: 0,
    }

    COUPONS.map(COUPON => {
      if (this.state.coupon === COUPON.code) {
        applied_coupon = COUPON
      }
    })

    console.log(applied_coupon)

    if (this.state.coupon !== applied_coupon.code) {
      this.props.showErrorDialogue(
        "Failed to apply your coupon code, it either expired or you enter a wrong coupon code."
      )
    } else {
      var amount = (this.getCartSubtotal() / 100) * applied_coupon.discount
      this.props.calTotal(amount)
      this.props.showSuccessDialogue("Coupon was successfully aplied")
      this.setState({
        couponApplied: true,
      })
    }
  }
  /* eslint-disable */
  getCartSubtotal = () => {
    var subTotal = 0
    this.props.cartItems.map(item => {
      subTotal += parseInt(item.price)
    })

    return subTotal
  }

  handleCouponInput = event => {
    const { name, value } = event.target
    this.setState(prevState => ({
      ...prevState.data,
      [name]: value,
    }))
  }

  render() {
    return (
      <div className="cart-item-card-container">
        {" "}
        <Card interactive={false} elevation={Elevation.ONE}>
          <h5>Order Sub-Total</h5>
          <Divider />
          <div className="price-wrapper sub-total ">
            <div className="cart-item-price-title">Sub Total:</div>
            <CurrencyFormat
              value={this.props.subTotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
              renderText={value => (
                <div
                  className={
                    "cart-item-price " +
                    (this.props.subTotal > this.props.total ? "cancel " : "")
                  }
                >
                  {value}
                </div>
              )}
            />
          </div>

          <div className="price-wrapper total">
            <div className="cart-item-price-title">Total:</div>
            <CurrencyFormat
              value={this.props.total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
              renderText={value => (
                <div className="cart-item-price">{value}</div>
              )}
            />
          </div>

          <Divider />
          {this.state.couponApplied ? (
            <Callout className="bp3-intent-success cart-resize" icon="tick">
              Coupon Applied
            </Callout>
          ) : (
            <div>
              <Button
                onClick={this.handlCollapsible}
                className="bp3-intent-primary"
              >
                Apply Coupon
              </Button>
              <Collapse isOpen={this.state.isOpen}>
                <InputGroup
                  large={true}
                  className="coup-btn"
                  placeholder="Your Coupon"
                  name="coupon"
                  value={this.state.coupon}
                  onChange={this.handleCouponInput}
                />
                <Button
                  onClick={this.applyCoupon}
                  className="bp3-intent-primary"
                  small={true}
                >
                  Apply
                </Button>
              </Collapse>
            </div>
          )}
          <Divider />
          <Link to="/checkout">
            <Button fill={true} large={true} className="bp3-intent-success">
              Checkout
            </Button>
          </Link>
        </Card>{" "}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    subTotal: state.cart.subTotal,
    total: state.cart.total,
    cartItems: state.cart.cartItems,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    calSubTotal: item => {
      dispatch({
        type: "CALCULATE_SUB_TOTAL",
        item,
      })
    },
    calTotal: amount => {
      dispatch({
        type: "CALCULATE_TOTAL",
        amount,
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPriceCard)
