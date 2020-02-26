import React from "react"
import PryButton from "./pryButton"
/* eslint-disable */
const PriceBoxWithDescription = ({
  text,
  price,
  turnArroundTime,
  packageDetail,
  assignAssociate,
}) => (
  <div className="price-box p-d-box">
    <h5
      className="price-header-text"
      css={{
        fontFamily: "Poppins",
      }}
    >
      {text}
    </h5>
    <div className="box-divider"> {/* line */}</div>
    <h3
      css={{
        marginBottom: "10px",
        color: "#19a99d",
        fontWeight: "bolder",
        fontFamily: "Poppins",
      }}
    >
      {price}
    </h3>

    <h5
      css={{
        marginBottom: "20px",
        color: "#19a99d",
        fontFamily: "Poppins",
      }}
    >
      {turnArroundTime}
    </h5>
    <PryButton
      text="ADD TO CART"
      price={price}
      packageDetail={packageDetail}
      onClick={null}
      assignAssociate={assignAssociate}
    />
  </div>
)

export default PriceBoxWithDescription
