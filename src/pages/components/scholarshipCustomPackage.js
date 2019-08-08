import React from "react"
import PriceBox from "./priceBox"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Component } from "react"
import { connect } from "react-redux"
import { Link } from "gatsby"

const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

class scholarshipCustomPackage extends Component {
  constructor(props) {
    super(props)
  }

  handleAddfunc(item) {
    console.log("products", item)
  }
  render() {
    return (
      <div>
        <div class="customer-container">
          <div class="cu-container">
            <h1>Resume Review Plans</h1>
            <p>
              {" "}
              A Quick Glance at Our Essay Review Plans On this plan, we
              critically access the bigger story–Your assigned associate will
              assess your essays and check them for overall engagement.<br />

              <Link to="/Scholarships/cv-resume" activeStyle={{color: 'white'}} className="pad">More Detais</Link>
              <br />
            </p>
            <div class="cu-container-inner">
              <PriceBox
                text="STANDARD"
                price="N7,500"
                form="coverLetterReviewForm"
                itemDescription="Essay Review (Graduate School Essay - STANDARD)"
              />
              <div css={{ width: "50px" }}> </div>
              <PriceBox
                text="FLASH PRICE"
                price="N15,000"
                form="coverLetterReviewForm"
                itemDescription="Essay Review (Graduate School Essay - FLASH PRICE)"
              />
            </div>
          </div>

          <div class="cu-container">
          <div className = "comming_soon">Comming Soon!</div>
            <h1>Resume Redraft Plans</h1>
            <p>
              
              The Essay Redraft Plan is designed to boost your confidence going
              into the most competitive application processes.
              <br />
              <Link to="/Scholarships/cv-resume" activeStyle={{color: 'white'}} className="pad">More Detais</Link>
              <br />
            </p>
            <div class="cu-container-inner">
              <PriceBox
                text="STANDARD"
                price="N20,000"
                form="coverLetterRedraft"
                itemDescription="Resume Redraft (STANDARD)"
              />{" "}
              <PriceBox
                text="FLASH PRICE"
                price="N30,000"
                form="coverLetterRedraft"
                itemDescription="Resume Redraft (FLASH PRICE)"
              />
            </div>
          </div>

          <div class="cu-container">
            <h1>Essay Review Plans</h1>
            <p>
              {" "}
              A Quick Glance at Our Essay Review Plans On this plan, we
              critically access the bigger story–Your assigned associate will
              assess your essays and check them for overall engagement.
              <br /> 

              <Link to="/Scholarships/essays" activeStyle={{color: 'white'}} className="pad">More Detais</Link>
              <br />
            </p>
            <div class="cu-container-inner">
              <PriceBox
                text="STANDARD"
                price="N7,500"
                form="coverLetterReviewForm"
                itemDescription="Essay Review (Graduate School Essay - STANDARD)"
              />
              <PriceBox
                text="FLASH PRICE"
                price="N15,000"
                form="coverLetterReviewForm"
                itemDescription="Essay Review (Graduate School Essay - FLASH PRICE)"
              />
            </div>
          </div>

          <div class="cu-container">
          <div className = "comming_soon">Comming Soon!</div>
            <h1>Essay Redraft Plans</h1>
            <p>
              The Essay Redraft Plan is designed to boost your confidence going
              into the most competitive application processes.
              <br />
              <Link to="/Scholarships/essays" activeStyle={{color: 'white'}} className="pad">More Detais</Link>
              <br />
            </p>
            <div class="cu-container-inner">
              <PriceBox
                text="STANDARD"
                price="N20,000"
                form="coverLetterRedraft"
                itemDescription="Essay Redraft (Job Application Letter - STANDARD)"
              />
              <PriceBox
                text="FLASH PRICE"
                price="N30,000"
                form="coverLetterRedraft"
                itemDescription="Essay Redraft (Job Application Letter - FLASH PRICE)"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default scholarshipCustomPackage
