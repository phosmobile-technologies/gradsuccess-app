import React from "react"
import { jsx, css } from "@emotion/core"
import PackageCardElement from "./packageCardElement"
import resume from "../../images/resume.png"
import packageImg from "../../images/package.png"
import addResumeBg from "../../images/admission-resumebg-small.jpg"

const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const PackageCards = ({ service }) => (
  <div
    css={{
      width: "80%",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      margin: "1em auto 4em",
      [mq[2]]: {
        flexDirection: "column",
      },
    }}
  >
    <PackageCardElement
      imgUrl={resume}
      title="CV/Resume"
      text="Let's help you pull off a killer CV that would instantly get you hired."
      buttonUrl={`${service}/cv-resume`}
    />
    <PackageCardElement
      imgUrl={addResumeBg}
      title="Essays"
      text="Your Essay is your reflection, let's guide your brush."
      buttonUrl={`${service}/essays`}
    />
  </div>
)

export default PackageCards
