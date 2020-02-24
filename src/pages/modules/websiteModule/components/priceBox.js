import React from "react"
import PryButton from "./pryButton"
 /* eslint-disable */
const PriceBox = ({ text, price, packageDetail }) => (
  <div className="price-box">
    <h2 className="price-header-text">{text}</h2>
    <div className="box-divider"> {/* line */}</div>
    <h3
      css={{
        marginBottom: "20px",
        color: "#19a99d",
        fontWeight: "bolder",
        fontFamily: "Poppins",
      }}
    >
      {price}
    </h3>
    <PryButton
      text="ADD TO CART"
      price={price}
      packageDetail={packageDetail}
      onClick={null}
    />
  </div>
)

export default PriceBox
