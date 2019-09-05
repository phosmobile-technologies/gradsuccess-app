import React from 'react'
import PryButton from './pryButton';
import Modal from "react-responsive-modal"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import eightYears from "../../images/8years.jpeg"
import AppRating from "./appRating"


const EightYearsURL = `url(${eightYears})`

const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
  )


const ImgDivStyles = css({
    flex: 1,
    background: `linear-gradient(295deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,.7) 100%), ${EightYearsURL}`,
    backgroundSize: 'cover',
    color: 'white',
    padding: '3em',
    boxShadow: '30px 30px 0px rgba(87,222,191, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    minWidth: 'auto',
})

class FeaturedTestimonial extends React.Component {
constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.state = {
      rateValue:4.5
    }
  }
    
  openModal() {
    this.props.openModal()
  }
    
  render() {
      return(
    <div css={{
        display: 'flex',
        background: 'white',
        [mq[2]]: {
            flexWrap: 'wrap',
            padding: '40px 20px',
            margin: '5px',
            textAlign: 'center',
            marginBottom: '27em'
        }
    }}>
    <div css={{
        display: 'flex',
        flexWrap: 'wrap',
        width:'80%',
        margin:'auto',
        marginTop:'40px',
        marginBottom:'40px',
    }}>
        <div css={{
            flex: 1,
            alignSelf: 'center',
            overflow: 'hidden',
            position:'relative',
            height: '100%',
            [mq[2]]: {
                padding: '15px'
            }
        }}>
          <div className="item-1">
            <p>
                  Being successful at earning a place with an International Business School is a challenging experience, but GradSuccess really assisted me with the application process through its professional and timely reviews of my essays and resume at affordable prices. 
                  I will definitely recommend GradSuccess to prospective applicants
            </p>
            <br />
            <hr />
            <h4>Babajide, MIB, Hult international business school</h4>
            <AppRating ratingValue = {4} />
          </div>

          <div className="item-2"> 
            <p>
                  I got accepted to Robison's College of Business's MBA program. Thank you for being a part of the application process. Your help in developing my essay strategy, reviewing my resume and GRE waiver leter went a long way. My application wouldn't have gone so smoothly without you. Thank you again for your help.
            </p>
            <br />
            <hr />
            <h4>Bukola, M.A Andrew Young School of Policy Studies, Georgia State University </h4>
            <AppRating ratingValue = {4.5} /></div>
        </div>

        <div css={ImgDivStyles}>
            <h1 css={{
                fontSize: '1.3em',
                lineHeight: '1.4em',
                textAlign: 'center',
                fontFamily: 'Lato',
            }}>Over 8 years of helping applicants fulfill their dreams.</h1>
            <div onClick={this.openModal}>
            <button css={BigButtonStyles}>Work With An Expert</button>
            </div>
        </div>
        </div>
    </div>
)}}

const BigButtonStyles = {
  color: "#111",
  textAlign: "center",
  minWidth: "200px",
  minHeight: "50px",
  fontSize: "17px",
  background: "yellow",
  border: "none",
  margin: "0px auto",
  fontFamily: `"Poppins", sans-serif`,
  fontWeight: "700",
  cursor: "pointer",
  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  ":hover": {
    background: "#47dcbc",
    color: "yellow",
  },
  transition: "all .2s ease-out",
  boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
}

export default FeaturedTestimonial