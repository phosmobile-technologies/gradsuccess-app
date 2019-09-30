import React from "react"
import PriceBox from "../../components/priceBox"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Component } from "react"
import { connect } from "react-redux"


const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

 class EssayReview extends Component {

    constructor(props){
        super(props)
    }




    render() {
      return (
        <div>
          <div
            css={{
              width: "70%",
              margin: "0px auto",
              padding: "50px 0px",
            }}
          >
            {/* TEXT */}
            <h2
              css={{
                color: "#19a99d",
              }}
            >
              {" "}
              Essay Review Plans{" "}
            </h2>
            <p>
              We are here to help at any stage of your essay writing process.
              The essay review service is best suited if you already have an
              essay that’s set to go and just needs some fine-tuning.
            </p>
            <p>
              {" "}
              <strong>Who is this service for?</strong> This service is for you
              if you already have an essay draft for:
            </p>
            <ul className="content-ul">
              <li> Admission Statements </li>
              <li> Cover Letters </li>
              <li> Reference Letters. </li>
            </ul>
            <h2
              css={{
                color: "#19a99d",
              }}
            >
              {" "}
              Our Essay Review Plan in Two Steps{" "}
            </h2>
            <p>
              <strong>Step 1:</strong>We will evaluate your Essay for strengths
              and weaknesses and provide an Initial Aggregate Score (IAS) to
              show how suited and aligned your current Essay is for your
              prospective application.
            </p>
            <p>
              <strong>Step 2:</strong>We will assess your resume to help you
              highlight key achievements by providing feedback across 5 main
              areas;
            </p>
            <ul className="content-ul">
              <li>
                <b>
                  <span>
                    <i>Appearance</i>
                  </span>{" "}
                  -{" "}
                </b>{" "}
                Can your Essay captivate in 5 seconds or less?
              </li>
              <li>
                <b>
                  <span>
                    <i>Aspects & Content</i>
                  </span>{" "}
                  -{" "}
                </b>{" "}
                Have you left out critical fields in your Essay?
              </li>
              <li>
                <b>
                  <span>
                    <i>Achievement Impact</i>
                  </span>{" "}
                  -{" "}
                </b>{" "}
                Are you quantifying your achievements?
              </li>
              <li>
                <b>
                  <span>
                    <i>Articulation </i>
                  </span>
                  -{" "}
                </b>{" "}
                Used the right wording for best results?
              </li>
              <li>
                <b>
                  <span>
                    <i>Alignment</i>
                  </span>{" "}
                  -{" "}
                </b>{" "}
                Does your Essay suit your intended industry or destination?
              </li>
            </ul>
            <br />
            <h2
              css={{
                color: "#19a99d",
              }}
            >
              {" "}
              What you get from Our Essay Review Plan{" "}
            </h2>
            <p> The output of our review process would be: </p>
            <ul className="content-ul">
              <li>
                {" "}
                Current Essay Score to show the strength of your default Essay{" "}
              </li>
              <li>
                {" "}
                Propositions for structured and clearly stated problem
                statements{" "}
              </li>
              <li>
                {" "}
                Propositions for well projected array of key accomplishments{" "}
              </li>
              <li>
                {" "}
                Propositions to align your profile to match the
                organization/University{" "}
              </li>
              <li>
                {" "}
                Better efficiency of your application process. We save you the
                hassle.{" "}
              </li>
            </ul>
            <h2
              css={{
                color: "#19a99d",
              }}
            >
              {" "}
              Price
            </h2>
            <p>
              Our Regular turnaround is 3-5 business-days on each submission,
              while our Flash turnaround is 1-2 business-day on each submission.
            </p>
            <br /> <br />
            <div
              css={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                margin: "0px auto",
                [mq[2]]: {
                  flexDirection: "column",
                },
              }}
            >
              <PriceBox
                text="STANDARD"
                price="N18,500"
                form="graduateSchoolStatementReviewForm"
                itemDescription="Essay Review (Graduate School Essay - STANDARD)"
              />
              <div css={{ width: "50px" }}> </div>
              <PriceBox
                text="FLASH PRICE"
                form="graduateSchoolStatementReviewForm"
                price="N25,000"
                itemDescription="Essay Review (Graduate School Essay - FLASH PRICE)"
              />
            </div>
          </div>
          {/* End  */}
        </div>
      )
    }
  
  
  }

export default EssayReview;