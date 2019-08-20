import React from "react"
import { jsx, css } from "@emotion/core"
import step1 from "../../images/step1.svg"
import step2 from "../../images/step2.svg"
import step3 from "../../images/step3.svg"

const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)

const ImgStyles = {
  width: "100px",
  marginBottom: 0,
}

const DivStyles = {
  padding: "1em",
  flex: 1,
  minWidth: '200px',
  textAlign:'center'
}

const TextStyles = {
  fontSize: "14px",
  textAlign: 'justify',
  textJustify: 'inter-word',
}

const Steps = () => (
  <div
    css={{
      display: "flex",
      padding: "1em 10%",
      [mq[2]]: {
        flexDirection: 'column'
    }
    }}
  >
    <div css={DivStyles}>
      <img src={step1} alt="step 1 icon" css={ImgStyles} />
      <h4
        css={{
          margin: "7px 0",
        }}
      >
        Let's know your needs
      </h4>
      <p css={TextStyles}>
        Your advancement in career or academia is of interest to us. We have
        garnered the skills to fine-tune your essays and resumes for the best
        results so don't hesitate to engage us.
      </p>
    </div>
    <div css={DivStyles}>
      <img src={step2} alt="step 1 icon" css={ImgStyles} />
      <h4
        css={{
          margin: "7px 0",
        }}
      >
        Work With An Expert
      </h4>
      <p css={TextStyles}>
        The average associate at gradsuccess has a history of accomplishments at
        high-end institutions and organizations, so be rest-assured you're
        entrusting your work to the very best.
      </p>
    </div>
    <div css={DivStyles}>
      <img src={step3} alt="step 1 icon" css={ImgStyles} />
      <h4
        css={{
          margin: "7px 0",
        }}
      >
        Apply With Confidence
      </h4>
      <p css={TextStyles}>
        We always exceed your expectations, so by the time you're set to apply,
        you're sure success is only one click away.
      </p>
    </div>
  </div>
)

export default Steps
