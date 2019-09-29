import React, { Component } from "react"

export default class PromotionBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPromoCard: false,
    }
  }
  closePromo() {
    document.getElementById("promotionBannerWrapper").style.height = "0vh"
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty("showPromo")) {
      
    }else{
      setTimeout(() => {
        document.getElementById("promotionBannerWrapper").style.height = "50vh"
        localStorage.setItem("showPromo",true)
      }, 5000)
    }
    
  }
  render() {
    return (
      <div className="promotion-banner-wrapper" id="promotionBannerWrapper">
        <div className="clossPromo" onClick={this.closePromo}>
          x
        </div>
        <div className="promotion-banner">
          <div className="promotion-per">
            <h1>50%</h1>
            <h2>Discount</h2>
          </div>
          <h3>
            Get 50% off your total price.
            <br />
            <span>
              Also get extra 10% off for custom package of up to three or more
              review/redraft plan
            </span>
          </h3>
          <p>Promo till 21 October, 2019</p>
        </div>
      </div>
    )
  }
}
