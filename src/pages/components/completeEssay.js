import React from "react"
import PriceBox from "./priceBox"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Component } from "react"
import { connect } from "react-redux"


const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

 class CompleteEssay extends Component {

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
            <p> <b>*Get a 10% discount when you purchase a complete package of our Essay plan or Resume plan*</b> </p>
            {/* Essay Review */}
                <h2 css={{
                    color: '#19a99d'
                }}> Essay Review Plans </h2>
                <p> We are here to help at any stage of your essay writing process. The EssayReview service is best suited if you already have an essay that’s set to go and just needs some fine-tuning.</p>
                <br/>
                <p> Who is this service for? You, if you already have anEssay draft for:</p>
                <ul>
                <li>	Admission Statements </li>
                <li>	Cover Letters </li>
                <li>	Reference Letters. </li>
                
                </ul>
                <br/> <br/>
                <h2 css={{
                    color: '#19a99d'
                }}> A Quick Glance at Our Essay Review Plans </h2>
                <p > On this plan, we critically access the bigger story–Your assigned associate will assess your essays and check them for overall engagement. They will check if you have: </p>
                <ul>
                <li>	Satisfied the question. </li>
                <li>	Outlined your thoughts clearly. </li>
                <li>	Structured your essays in a logical flow. </li>
                <li>	Used captivating openings and aligned conclusions. </li>
                </ul>
                <br/>
                <p> The associate then gives feedback and recommends areas of improvement. You take it from here by implementing suggestions and sending a revised draft back. </p>
                <p> Evaluating between the Lines–Whilst our associates are keenly looking to see that your story connects on the surface, they also go deeper, focusing on the smaller details like clarity, spelling, formatting, sentence construction and variability. After this stage, the Associate sends you a final draft.</p>
                <p> Your submission is now ready! </p>
                <br/>
                {/* Break - Essay Redraft */}
                <h2 css={{
                    color: '#19a99d'
                }}> Essay Redraft Plans </h2>
                <p> We know there are times when the inspiration to piece that stellar essay performance together isn’t coming, so we created the redraft plan to save the day, and help you get the results you desire!</p>
                <br/>
                <p> Who is this service for? You, if you don’t have anEssay draft for:</p>
                <ul>
                <li>	Admission Statements </li>
                <li>	Cover Letters </li>
                <li>	Reference Letters </li> 
                </ul>
                <br/> <br/>
                <h2 css={{
                    color: '#19a99d'
                }}> Explore Our Comprehensive Essay Redraft Plan </h2>
                <h3> On our Essay redraft plan, you will get: </h3>
                <p> * Closer guidance on how to deliver a stunning essay. The process starts with you completing our questionnaire. Based on your responses, our associate will meet with you via phone or Skype to better understand and explore the most suitable ways of projecting you and your qualifications in your essays. In this interactive session, you will provide a narrative of your key experiences and the very essence you want to see in your essay. A structure would also be laid out for your proposed essay.</p>
                <br/>
                <p> * A ‘starter’ for your personal statement based on your responses in the questionnaire and the brainstorming session. The starter is our unique proposal to you, and consists of prompts and bullet points. It is NOT a full draft. 
                Our Clients say that a combination of our interactive session and the Starters we propose gives them direction to proceed and gives the opportunity to produce original, superior essays whilst saving time through the whole process.
                </p>
                <br/>
                <p> * Thoroughly Edited Essays– Whilst our associates are keenly looking to see that your story connects on the surface, they also go deeper, focusing on the smaller details like clarity, spelling, formatting, sentence construction and variability. After this stage, the Associate sends you a final draft. You’ll revise it and send it back. This back and front revision process will continue with the essay until you are happy with it. The volley process is capped at a 4th session.</p>
                <br/>
                <p> * The Essay Redraft Plan is designed to boost your confidence going into the most competitive application processes. </p>
                <br/>
                {/*Contimue */}
                <h2 css={{
                    color: '#19a99d'
                }}> Price </h2>
                <p> *Regular turnaround is five business-days on each submission. Flash turnaround is three business-day on each submission.*</p>
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
                <PriceBox   text="STANDARD" price="N24,750"  itemDescription = 'Complete Essay Plans: A Quick Glance at Our Complete Essay Plans(STANDARD)'/>     
                <div css={{ width: '50px'}}> </div>
                <PriceBox text="FLASH PRICE" price="N40,500"  itemDescription = 'Complete Essay Plans: A Quick Glance at Our Complete Essay Plans(FLASH PRICE)' />
                </div>
            </div>
            {/* End  */}
            </div>
      )
    }
  
  
  }

export default CompleteEssay;