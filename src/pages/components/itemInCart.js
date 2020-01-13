import React, { Component } from "react"
import SingleCartItem from "./SingleCartItem"
import { Link } from "gatsby"
import discouted from "../../images/10-discount.ico"
import { COUPON } from "../../api/couponCode"

export default class itemInCart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Items: [],
      totalAmount: 0,
      discountedAmount: 0,
      cartItem: 0,
      ItemInCar: null,
      hasCoupon: false,
      coupon: "",
      couponError: false,
      couponAplied: false,
      cApplied: true,
      applyingCoupon: false,
    }

    this.DeleteItem = this.DeleteItem.bind(this)
    this.addFormLS = this.addFormLS.bind(this)
    this.showCoupon = this.showCoupon.bind(this)
    this.applyCoupon = this.applyCoupon.bind(this)
    this.handleForm = this.handleForm.bind(this)
  }

  handleForm(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }
  applyCoupon() {
    this.setState({
      applyingCoupon: true,
    })
    setTimeout(() => {
      if (this.state.coupon === " ") {
        this.setState({
          couponMessage: "Coupon code can not be empty",
          couponError: true,
          applyingCoupon: false,
        })
      } else if (COUPON.code !== this.state.coupon) {
        this.setState({
          couponMessage: "Sorry, coupon has expired.",
          couponError: true,
          applyingCoupon: false,
        })
      } else {
        const discounttedAmount =
          (this.state.totalAmount / 100) * COUPON.discount
        const newAmount = this.state.totalAmount - discounttedAmount
        this.setState({
          couponError: false,
          couponAplied: true,
          applyingCoupon: false,
          discountedAmount: newAmount,
          totalAmount: newAmount,
          cApplied: false,
        })

        setTimeout(() => {
          this.setState({
            couponAplied: false,
          })
        }, 10000)
      }
    }, 2000)
  }

  showCoupon() {
    this.setState({
      hasCoupon: !this.state.hasCoupon,
    })
  }

  reCalcTotal = num => {
    this.setState(preState => {
      return {
        totalAmount:
          preState.totalAmount + Number(num.Price.replace(/\D/g, "")),
        cApplied: true,
      }
    })
  }

  DeleteItem(item) {
    let list = JSON.parse(localStorage.getItem("ItemsInCart"))
    var newList = list.splice(item, 1)

    localStorage.setItem("ItemsInCart", JSON.stringify(list))
    this.setState({
      Items: list,
      totalAmount: 0,
    })

    list.forEach(this.reCalcTotal)
  }

  addFormLS = num => {
    let amt = 0
    let _items = this.state.Items
    _items.push(num)

    this.setState(preState => {
      return {
        totalAmount:
          preState.totalAmount + Number(num.Price.replace(/\D/g, "")),
      }
    })
  }

  componentDidMount() {
    if (localStorage.getItem("ItemsInCart") === "undefined") {
      window.location = "/"
    } else {
      let _item = localStorage.getItem("ItemsInCart")
      let cartItem = JSON.parse(localStorage.getItem("ItemsInCart")) || []
      let couponApplied = localStorage.getItem("couponApplied")

      if (_item) {
        _item = JSON.parse(_item)
        _item.forEach(this.addFormLS)
      }
      this.setState({
        cartItem: cartItem.length,
        ItemInCart: "itemExist",
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let cartItem = JSON.parse(localStorage.getItem("ItemsInCart")) || []

    if (cartItem.length >= 3) {
      if (
        prevState.totalAmount != this.state.totalAmount ||
        this.state.discountedAmount === 0
      ) {
        let discountedPrice = this.state.totalAmount * 0.9
        this.setState({
          discountedAmount: discountedPrice,
          cartItem: cartItem.length,
        })
      }
    } else {
      if (this.state.cartItem != 2) {
        this.setState({
          cartItem: 2,
        })
      }
    }
  }

  setPackageVariable(itemInCart) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ"
    var string_length = 12
    var randomstring = ""

    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length)
      randomstring += chars.substring(rnum, rnum + 1)
    }

    if (itemInCart.length > 0) {
      var form = itemInCart[0].form
    } else {
      var form = "nil"
    }
    localStorage.setItem("form_id", randomstring)
    localStorage.setItem("package", form)
  }

  componentWillUnmount() {
    let cartItem = JSON.parse(localStorage.getItem("ItemsInCart")) || []
    if (cartItem.length >= 3) {
      localStorage.setItem("CheckoutAmount", this.state.discountedAmount)
      this.setPackageVariable(cartItem)
    } else {
      localStorage.setItem("CheckoutAmount", this.state.totalAmount)
      this.setPackageVariable(cartItem)
    }
  }

  render() {
    return (
      <div>
        {this.state.Items.length === 0 ? (
          <div className="emptyCart">
            <p
              css={{
                textAlign: "center",
              }}
            >
              Nothing in Cart
            </p>
          </div>
        ) : (
          <div className="cart-container">
            {this.state.cartItem >= 3 && (
              <img
                className="discounted"
                src={discouted}
                alt="Promo Discount"
              />
            )}
            <div className="cart-container-inner">
              <h1>Cart</h1>
              <div className="cart-header-wrapper">
                <div className="cart-header cart-layout">
                  <div>S/N</div>
                  <div>Item Description</div>
                  <div>Price (N) </div>
                  <div />
                </div>
              </div>
              {this.state.Items.map((item, index) => (
                <SingleCartItem
                  key={index}
                  index={index}
                  price={item.Price}
                  desc={item.IitemDescription}
                  delFunc={this.DeleteItem}
                />
              ))}

              <div className="cart-footer-wrapper">
                <div className="cart-footer cart-layout">
                  <div />
                  <div>Total</div>

                  {this.state.cartItem >= 3 && (
                    <div className="priceContainer">
                      <span className="strikedPrice">
                        N
                        {this.state.totalAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                      <span className="disPrice">
                        N
                        {this.state.discountedAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                      {this.state.couponAplied && (
                        <div className="couponAplied">Coupon Applied.</div>
                      )}
                    </div>
                  )}

                  {this.state.cartItem < 3 && (
                    <div>
                      <span>
                        N
                        {this.state.totalAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                      {this.state.couponAplied && (
                        <div className="couponAplied">Coupon Applied.</div>
                      )}
                    </div>
                  )}
                </div>
                {this.state.cApplied && (
                  <div className="couponWrapper">
                    <button
                      className="couponBtn"
                      type="button"
                      onClick={this.showCoupon}
                    >
                      I have Coupon code
                    </button>

                    {this.state.couponError && (
                      <div className="couponError">
                        {this.state.couponMessage}
                      </div>
                    )}

                    {this.state.hasCoupon && (
                      <div className="couponDiv">
                        <input
                          type="text"
                          name="coupon"
                          id="coupon"
                          placeholder="Your Coupon"
                          onChange={this.handleForm}
                        />{" "}
                        <button type="button" onClick={this.applyCoupon}>
                          {this.state.applyingCoupon ? "Applying" : "Apply"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="btn-wrap">
              <Link to="/Checkout">
                <button className="checkout-button">Checkout</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}
