import React, { Component } from "react"
import{ jsx, css } from "@emotion/core"
import PriceBox from "../../components/priceBox"


const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

 class ResumeRedraft extends Component {
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
                <h2 css={{
                    color: '#19a99d'
                }}> Resume Redraft Plans </h2>
                <p> For all things recruitment, career fairs and admissions, the resume is a powerful tool which can be a deal-breaker for candidates looking to go past initial screening stages to actually clinch an offer. This is no surprise because with first glances averaging 6 seconds, impressions are already being made by admission panellists, HR personnel and even the computer bot who will be perusing these one-pagers.</p>
                <br/>
                <p> Hence, for every candidate who really wants to stand out in today’s competitive climes, the Resume should be outstanding, precise, and engaging altogether. </p>
                <p> <b>Who is this service for? You, if you don’t have anEssay draft for: </b></p>
                
                <h2 css={{
                    color: '#19a99d'
                }}> Our Resume Redraft Plan in Three Steps </h2>
                <p> <b>Our three-step process is as follow: </b> </p>
                <p> <b>First:</b> We garner all the data about your experiences/achievements on our form. </p>
                <p> <b>Second:</b> We follow-up with a quick chat/interview to get the full-story. </p>
                <p> <b>Third:</b> Provide you with a resume draft so you can provide feedback and additions. Once we have your feedback, a final draft would be sent back to you. </p>
                <br/>
                <p> This is a flat rate, comprehensive package – you will get the help you need for one resume. </p>
              
                <h2 css={{
                    color: '#19a99d'
                }}> What you get from Our Resume Redraft Plan </h2>
                <p> The output of our Redraft process would be: </p>

                <ul className = "content-ul">
                <li> A Structured and clearly stated work experience and educational profiles. </li>
                <li> Well projected array of your key accomplishments and achievements. </li>
                <li> Thoroughly aligned profile to match the position of interest to you. </li>
                <li> Better efficiency of your application process. We save you the hassle. </li>
                </ul>
                <h2 css={{
                    color: '#19a99d'
                }}> Price </h2>
                <p> Regular turnaround is three business-days on each submission. Flash turnaround is one business-day on each submission. </p>
                
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
                <PriceBox text="STANDARD" price="N20,000" form="graduateSchoolEssayRedraftForm" itemDescription = 'Resume Redraft (STANDARD)'/>     <div css={{ width: '50px'}}> </div>
                <PriceBox text="FLASH PRICE" price="N30,000" form="graduateSchoolEssayRedraftForm" itemDescription = 'Resume Redraft (FLASH PRICE)'/>
                </div>
        </div>
    </div>
      )
    }
  
    
  }

  
    
    export default ResumeRedraft