import React from "react"
import PriceBox from "./priceBox"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
import { Link } from "gatsby"

class admissionCustomPackage extends React.Component {

  render() {
    return (
      <div>
        <div className="customer-container">
          <div className="cu-container">
            <h1>Resume Review Plans</h1>
            <p>
              For recruitments, career fairs and admissions, the resume is a
              powerful tool which can be a deal-breaker for candidates looking
              to go past initial screening stages to actually clinch an offer.
              <br />
              <Link
                to="/Admissions/cv-resume"
                activeStyle={{ color: "white" }}
                className="pad"
              >
                More Details
              </Link>
              <br />
            </p>
            <div className="cu-container-inner">
              <PriceBox
                text="STANDARD"
                price="N5,000"
                form="graduateSchoolStatementReviewForm"
                itemDescription="Resume Review (STANDARD)"
              />
              <PriceBox
                text="FLASH PRICE"
                price="N10,000"
                form="graduateSchoolStatementReviewForm"
                itemDescription="Resume Review (FLASH PRICE)"
              />
            </div>
          </div>

          <div className="cu-container">
            <div className="comming_soon">Comming Soon!</div>
            <h1>Resume Redraft Plans</h1>
            <p>
              This is a flat rate, comprehensive package – you will get the help
              you need for one resume.
              <br />
              <Link
                to="/Admissions/cv-resume"
                activeStyle={{ color: "white" }}
                className="pad"
              >
                More Details
              </Link>
              <br />
            </p>
            <div className="cu-container-inner">
              <PriceBox
                text="STANDARD"
                price="N20,000"
                form="graduateSchoolEssayRedraftForm"
                itemDescription="Resume Redraft (STANDARD)"
              />{" "}
              <PriceBox
                text="FLASH PRICE"
                price="N30,000"
                form="graduateSchoolEssayRedraftForm"
                itemDescription="Resume Redraft (FLASH PRICE)"
              />
            </div>
          </div>

          <div className="cu-container">
            <h1>Essay Review Plans</h1>
            <p>
              {" "}
              A Quick Glance at Our Essay Review Plans On this plan, we
              critically access the bigger story–Your assigned associate will
              assess your essays and check them for overall engagement. They
              will check if you have:
              <br />
              <Link
                to="/Admissions/essays"
                activeStyle={{ color: "white" }}
                className="pad"
              >
                More Details
              </Link>
              <br />
            </p>
            <div className="cu-container-inner">
              <PriceBox
                text="STANDARD"
                price="N7,500"
                form="graduateSchoolStatementReviewForm"
                itemDescription="Essay Review (Graduate School Essay - STANDARD)"
              />
              <PriceBox
                text="FLASH PRICE"
                price="N15,000"
                form="graduateSchoolStatementReviewForm"
                itemDescription="Essay Review (Graduate School Essay - FLASH PRICE)"
              />
            </div>
          </div>

          <div className="cu-container">
            <div className="comming_soon">Comming Soon!</div>
            <h1>Essay Redraft Plans</h1>
            <p>
              <h3> On our Essay redraft plan, you will get: </h3>
              <br />
              The Essay Redraft Plan is designed to boost your confidence going
              into the most competitive application processes.
              <br />
              <Link
                to="/Admissions/essays"
                activeStyle={{ color: "white" }}
                className="pad"
              >
                More Details
              </Link>
              <br />
            </p>
            <div className="cu-container-inner">
              <PriceBox
                text="STANDARD"
                price="N20,000"
                form="graduateSchoolEssayRedraftForm"
                itemDescription="Essay Redraft (Job Application Letter - STANDARD)"
              />
              <PriceBox
                text="FLASH PRICE"
                price="N30,000"
                form="graduateSchoolEssayRedraftForm"
                itemDescription="Essay Redraft (Job Application Letter - FLASH PRICE)"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default admissionCustomPackage
