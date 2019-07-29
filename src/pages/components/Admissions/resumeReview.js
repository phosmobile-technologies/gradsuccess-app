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


    handleAddfunc(item){
        console.log('products',item);
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
                <p> For all things recruitment, career fairs and admissions, the resume is a powerful tool which can be a deal-breaker for candidates looking to go past initial screening stages to actually clinch an offer. This is no surprise because with initial glances averaging 6 seconds, impressions are already being made by admission panellists, HR personnel and even the computer bot who will be perusing these one-pagers.</p>
                <br/>
                <p> Hence, for every candidate who really wants to stand out in today’s competitive climes, the Resume should be outstanding, precise, and engaging altogether.</p>
                <br/> <br/>
                <p> <b>Who is this service for? You, if you already have a resume draft.</b> </p>
                <h2 css={{
                    color: '#19a99d'
                }}> Our Resume Review Plan in Two Steps </h2>
                <p> <b>First:</b> Assess the content of your resume, help you highlight key experiences/achievements </p>
                <p> <b>Second:</b> Suggest additional information you can include to bolster the quality of your resume.  </p>
                <br/> <p> This service is provided on an hourly basis – you get as much or as little editing as you need after meeting our one-hour minimum charge. </p>
                
                <h2 css={{
                    color: '#19a99d'
                }}> What you get from Our Resume Review Plan </h2>
                <p> The output of our review process would be: </p>
                <ul>
                <li> A Structured and clearly stated work experience and educational profiles. </li>
                <li> Well projected array of your key accomplishments and achievements. </li>
                <li> Thoroughly aligned profile to match the position of interest to you. </li>
                <li> Better efficiency of your application process. We save you the hassle. </li>
                </ul>
                <br/> <br/>
                <h2 css={{
                    color: '#19a99d'
                }}> Price </h2>
                <p> *Regular turnaround is two business-days on each submission. Flash turnaround is one business-day on each submission.*</p>
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
                <PriceBox   text="STANDARD" price="N5,000"  form = "graduateSchoolStatementReviewForm" itemDescription = 'Resume Review (STANDARD)'/>     
                <div css={{ width: '50px'}}> </div>
                <PriceBox text="FLASH PRICE" form = "graduateSchoolStatementReviewForm" price="N10,000"  itemDescription = 'Resume Review (FLASH PRICE)' />
                </div>
            </div>
            {/* End  */}
            </div>
      )
    }
  
  
  }

export default ResumeReview;