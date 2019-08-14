import React from 'react'
import PryButton from './pryButton';
import Modal from "react-responsive-modal"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import eightYears from "../../images/8years.jpeg"


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
    minWidth: 'auto'
})

class FeaturedTestimonial extends React.Component {
constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
  }
    
  openModal() {
    this.props.openModal()
  }
    
  render() {
      return(
    <div css={{
        display: 'flex',
        background: 'white',
        padding: '4em 10em',
        [mq[2]]: {
            flexWrap: 'wrap',
            padding: '40px 20px',
            margin: '5px',
            textAlign: 'center'
        }
    }}>
    <div css={{
        display: 'flex',
        flexWrap: 'wrap'
    }}>
        <div css={{
            flex: 1,
            padding: '3em 5em 3em 0',
            alignSelf: 'center',
            [mq[2]]: {
                padding: '15px'
            }
        }}>
            <p>
                I never expected getting an admission to an ivy league school to be so professional and straight-forward. GradSuccess team really did all of the heavy lifting allowing me align my thoughts and clearly lay out my goals, I was pleasantly surprised at the end of the process.
            </p>
            <h4>Damilola Kosibote</h4>
        </div>

        <div css={ImgDivStyles}>
            <h1 css={{
                fontSize: '1.3em',
                lineHeight: '1.4em',
                textAlign: 'center'
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
  fontFamily: `"Lato", sans-serif`,
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