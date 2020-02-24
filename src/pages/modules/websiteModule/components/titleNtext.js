import React from "react"
import PryButton from "./pryButton"
 /* eslint-disable */
const TitleAndText = ({ title, text, button }) => (
  <div
    css={{
      padding: "2em",
    }}
  >
    <h2
      css={{
        color: "#00a99d",
        textAlign: "center",
        margin: "1em auto .5em",
      }}
    >
      {title}
    </h2>
    <p
      css={{
        textAlign: "center",
        margin: ".1em auto 1em",
        maxWidth: "800px",
      }}
    >
      {text}
    </p>
    {button && <PryButton text={button} />}
  </div>
)

export default TitleAndText
