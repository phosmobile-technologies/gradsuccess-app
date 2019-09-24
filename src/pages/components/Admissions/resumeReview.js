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

 class ResumeReview extends Component {

    constructor(props){
        super(props)
    }

    render() {
      return (
        <div>
            <div css={{
                width: '70%',
                margin: '0px auto',
                padding: '50px 0px'
            }}>
            {/* TEXT */}
                <h2 css={{
                    color: '#19a99d'
                }}> Resume Review Plans </h2>
                  <p>For recruitments, career fairs and admissions, the resume is a powerful tool which can be a deal-breaker for candidates looking to go past initial screening stages to actually secure an offer. This is no surprise because with first glances averaging 6 seconds, impressions are already being made by admission panellists, HR personnel and even the bot who will be screening these one-pagers.</p>
                  <p> If you want to stand out in today’s competitive market, your resume should be outstanding, precise, and engaging altogether.</p>
                  <p> <b>Who is this service for? This service is for you if you already have a resume draft.</b> </p>
                <h2 css={{
                    color: '#19a99d'
                  }}> Our Resume Review Plan in Two Steps </h2>
                  <p> <b>Step 1: </b> We will evaluate your CV for strengths and weaknesses and provide an Initial Aggregate Score (IAS) to show how suited and aligned your current CV is for your prospective application.</p>
                  <p> <b>Step 2:</b>  We will assess your resume to help you highlight key achievements by providing feedback across 5 main areas;
                </p>
                  <ul className="content-ul">
                      <li><b><span><i>Appearance</i></span> - </b> Can your CV captivate in 5 seconds or less?</li>
                      <li><b><span><i>Aspects & Content</i></span> - </b> Have you left out critical fields in your CV?</li>
                      <li><b><span><i>Achievement Impact</i></span> - </b> Are you quantifying your achievements?</li>
                      <li><b><span><i>Articulation </i></span>- </b> Used the right wording for best results?</li>
                      <li><b><span><i>Alignment</i></span> - </b> Does your CV suit your intended industry or destination?</li>
                </ul>

                  <p> <b>Step 3: </b> As part of the review service, all clients get two templates of our best CV formats and can transfer this recommendations. Our clients are entitled to one revision only on this package within 12 months.</p>
                
                <h2 css={{
                    color: '#19a99d'
                  }}> What you get from Our Resume Review Plan </h2>
                  <p> The output of our review process would be: </p>
                <ul className = "content-ul">
                      <li> Current CV Score to show how good (or bad) your CV currently is. </li>
                      <li> Propositions for structured and clearly stated professional and educational profiles. </li>
                      <li> Propositions for well projected array of key accomplishments </li>
                      <li> Propositions to align your profile to match the position of interest </li>
                      <li> Better efficiency of your application process. We save you the hassle. </li>
                </ul>
                <h2 css={{
                    color: '#19a99d'
                }}> Price  & Delivery</h2>
                  <p> Our Regular turnaround is 3-5 business-days on each submission, while our Flash turnaround is 1-2 business-day on each submission.</p>
                <br/> <br/>

                <div css={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    margin: '0px auto',
                    [mq[2]]: {
                        flexDirection: 'column'
                    }
                }}>
                <PriceBox   text="STANDARD" price="N10,000"  form = "graduateSchoolStatementReviewForm" itemDescription = 'Resume Review (STANDARD)'/>     
                <div css={{ width: '50px'}}> </div>
                <PriceBox text="FLASH PRICE" form = "graduateSchoolStatementReviewForm" price="N15,000"  itemDescription = 'Resume Review (FLASH PRICE)' />
                </div>
            </div>
            {/* End  */}
            </div>
      )
    }
  
  
  }

export default ResumeReview;