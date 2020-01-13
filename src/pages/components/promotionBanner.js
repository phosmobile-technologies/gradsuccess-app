import React, { Component } from "react"

export default class PromotionBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPromoCard: false,
    }
  }
  componentDidMount() {
    if (localStorage.hasOwnProperty("showPromo")) {
    } else {
      setTimeout(() => {
        document.getElementById("promotionBannerWrapper").style.height = "30vh"
        localStorage.setItem("showPromo", true)
      }, 5000)
    }
  }

  closePromo() {
    document.getElementById("promotionBannerWrapper").style.height = "0vh"
  }
  render() {
    return (
      <div className="promotion-banner-wrapper" id="promotionBannerWrapper">
        <div className="promotion-banner">
          <div className="closePromo" onClick={this.closePromo}>
            x
          </div>
          <div className="promotion-per">
            <h2>
              {" "}
              We've <strong>Launched!</strong>
            </h2>
          </div>
          <h3>Get 50% off your order with the coupon code</h3>
          <span>LAUNCH50</span>
        </div>
      </div>
    )
  }
}
