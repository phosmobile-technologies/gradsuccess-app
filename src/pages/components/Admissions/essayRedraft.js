import React, { Component } from "react"
import{ jsx, css } from "@emotion/core"
import PriceBox from "../../components/priceBox"


const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

 class EssayRedraft extends Component {
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
                }}> Essay Redraft Plans </h2>
                <p> We know there are times when the inspiration to piece that stellar essay performance together isn’t coming, so we created the redraft plan to save the day, and help you get the results you desire!</p>
                <br/>
                <p> Who is this service for? You, if you don’t have anEssay draft for:</p>
                <ul className = "content-ul">
                <li>	Admission Statements </li>
                <li>	Cover Letters </li>
                <li>	Reference Letters </li> 
                </ul>
                <h2 css={{
                    color: '#19a99d'
                }}> Explore Our Comprehensive Essay Redraft Plan </h2>
                <h3> On our Essay redraft plan, you will get: </h3>
                <ul className = "content-ul">
                <li> Closer guidance on how to deliver a stunning essay. The process starts with you completing our questionnaire. Based on your responses, our associate will meet with you via phone or Skype to better understand and explore the most suitable ways of projecting you and your qualifications in your essays. In this interactive session, you will provide a narrative of your key experiences and the very essence you want to see in your essay. A structure would also be laid out for your proposed essay.</li>
                <br/>
                <li> A ‘Starter’ for your personal statement based on your responses in the questionnaire and the brainstorming session. The starter is our unique proposal to you, and consists of prompts and bullet points. It is NOT a full draft. 
                Our Clients say that a combination of our interactive session and the Starters we propose gives them direction to proceed and gives the opportunity to produce original, superior essays whilst saving time through the whole process.
                </li>
                <br/>
                <li> Thoroughly Edited Essays– Whilst our associates are keenly looking to see that your story connects on the surface, they also go deeper, focusing on the smaller details like clarity, spelling, formatting, sentence construction and variability. After this stage, the Associate sends you a final draft. You’ll revise it and send it back. This back and front revision process will continue with the essay until you are happy with it. The volley process is capped at a 4th session.</li>
                <br/>
                <li> The Essay Redraft Plan is designed to boost your confidence going into the most competitive application processes. </li>
                </ul>
                <h2 css={{
                    color: '#19a99d'
                }}> Price </h2>
                <p> Regular turnaround is three business-days on each submission. Flash turnaround is one business-day on each submission.* </p>
                
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
                <PriceBox text="STANDARD" 
                price="N20,000" form="graduateSchoolEssayRedraftForm" 
                itemDescription = 'Essay Redraft (Job Application Letter - STANDARD)'/>     
                <div css={{ width: '50px'}}> </div>
                
                <PriceBox text="FLASH PRICE" 
                price="N30,000" 
                form="graduateSchoolEssayRedraftForm" 
                itemDescription = 'Essay Redraft (Job Application Letter - FLASH PRICE)'/>
                </div>
        </div>
    </div>
      )
    }
  
    
  }

  
    
    export default EssayRedraft