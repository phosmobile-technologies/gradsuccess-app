import React from "react"
 /* eslint-disable */
const breakpoints = [375, 576, 768]
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const styleRight = {
  background: "",
  minWidth: "70%",
}
const AboutBox = ({ first, second, third }) => (
  <div>
    <div
      css={{
        margin: "100px 15%",
        fontFamily: "Lato",
        textAlign:"left",
        [mq[2]]: {
          flexWrap: "wrap",
        },
      }}
    >
      <div css={styleRight}> <strong>{first}</strong></div>
      <div css={styleRight}> <strong>{third}</strong></div>
      <br />
      <div css={styleRight}> {second}</div>
    </div>
  </div>
)

export default AboutBox
