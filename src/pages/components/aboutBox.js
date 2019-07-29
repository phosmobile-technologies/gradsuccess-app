import React from "react"

const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const styleLeft = {
  minWidth: "40%",
  background: "",
  color: "black",
  fontWeight: "bolder",
  [mq[2]]: {
    height: "50px",
  },
}

const styleRight = {
  background: "",
  minWidth: "60%",
}
const AboutBox = ({ first, second }) => (
  <div>
    <div
      css={{
        display: "flex",
        margin: "100px 15%",
        fontFamily: "poppins",
        [mq[2]]: {
          flexWrap: "wrap",
        },
      }}
    >
      <div css={styleLeft}> {first} </div>

      <div css={styleRight}>
        {" "}
        {second}
      </div>
    </div>
  </div>
)

export default AboutBox
