import React from "react"
import PriceBox from "./priceBox"
import { Link } from "gatsby"
 /* eslint-disable */
const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

class careerCustomPackage extends React.Component {
  constructor(props) {
    super(props)
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
              assess your essays and check them for overall engagement.
              <br />
              <Link to="/Careers/cv-resume" activeStyle={{ color: 'white' }} className="pad">More Detais</Link>
              <br />
            </p>
            <div class="cu-container-inner">
              <PriceBox
                text="STANDARD"
                price="N7,500"
                form="coverLetterReviewForm"
                itemDescription="Essay Review (Graduate School Essay - STANDARD)"
              />
              <div></div>
              <PriceBox
                text="FLASH PRICE"
                price="N15,000"
                form="coverLetterReviewForm"
                itemDescription="Essay Review (Graduate School Essay - FLASH PRICE)"
              />
            </div>
          </div>

          <div class="cu-container">
            <div className="comming_soon">Comming Soon!</div>
            <h1>Resume Redraft Plans</h1>
            <p>
              <h3> On our Essay redraft plan, you will get: </h3>
              <br />
              The Essay Redraft Plan is designed to boost your confidence going
              into the most competitive application processes.
              <br />
              <Link to="/Careers/cv-resume" activeStyle={{ color: 'white' }} className="pad">More Detais</Link>
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
              <Link to="/Careers/essays" activeStyle={{ color: 'white' }} className="pad">More Detais</Link>
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
            <div className="comming_soon">Comming Soon!</div>
            <h1>Essay Redraft Plans</h1>
            <p>
              <br />
              The Essay Redraft Plan is designed to boost your confidence going
              into the most competitive application processes.
              <br />
              <Link to="/Careers/essays" activeStyle={{ color: 'white' }} className="pad">More Detais</Link>
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

export default careerCustomPackage
