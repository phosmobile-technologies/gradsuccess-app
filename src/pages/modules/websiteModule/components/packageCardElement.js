import React from "react"
import { Link } from "gatsby"
 /* eslint-disable */
const PackageCardElement = ({ imgUrl, title, text, buttonUrl, custom }) => (
  <div className = "package-card-element"
  >
    <img src={imgUrl} alt="image for package" css={{ marginBottom: "5px" }} />
    <div
      css={{
        color: "white",
        padding: "0 1em 1em",
      }}
    >
      <h4 css={{ marginBottom: "5px" }}>{title}</h4>
      <p css={{ fontSize: "13px", lineHeight: 1.2 }}>{text}</p>
      <br />
      <Link to={buttonUrl}>
        <div>
          <button css={SmallButtonStyles}>Get Started</button>
        </div>
      </Link>
    </div>
  </div>
)

const SmallButtonStyles = {
  color: "#111",
  textAlign: "center",
  minWidth: "100px",
  minHeight: "30px",
  fontSize: "12px",
  background: "yellow",
  border: "none",
  margin: "0px auto",
  fontFamily: `"Poppins", sans-serif`,
  fontWeight: "700",
  cursor: "pointer",
  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  ":hover": {
    background: "#47dcbc",
    color: "yellow",
    boxShadow: "0 1px 10px rgba(0,0,0,0.2)",
  },
  transition: "all .2s ease-out",
  boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
}

export default PackageCardElement
