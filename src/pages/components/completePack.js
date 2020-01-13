import React from "react"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Component } from "react"
import AdmissionCustomPackage from "./admissionCustomPackage"
import CareerCustomPackage from "./careerCustomPackage"
import ScholarshipCustomPackage from "./scholarshipCustomPackage"

const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

class CompletePack extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <AdmissionCustomPackage />
      </div>
    )
  }
}

export default CompletePack
