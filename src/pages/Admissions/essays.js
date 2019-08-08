import React from "react"
import{ jsx, css } from "@emotion/core"
import Layout from "../components/layout"
import HomeHero from "../components/homeHero"
import EssayReview from "../components/Admissions/essayReview"
import EssayRedraft from "../components/Admissions/essayRedraft"
import admissionsbg from "../../images/admissionsbg.jpg"

const addBgURL = `url(${admissionsbg})`

const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)

class EssaysPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { reviewTab: true, redraftTab: false }
    this.toggleTabs = this.toggleTabs.bind(this)
  }
  toggleTabs = arg => e => {
    if (arg === "review") {
      console.log("here at review")
      this.setState({ reviewTab: true, redraftTab: false })
    }
    if (arg === "redraft") {
      console.log("here at redraft")
      this.setState({ reviewTab: false, redraftTab: true })
    }
  }

  render() {
    return (
      <Layout>
        <HomeHero
          title="Admissions Center - Essays"
          text="The math is simple. More applicants are applying for the same number of spots. Let's help you get into top schools around the world, stress free!"
          imgUrl={addBgURL}
        />
        <div css={{
          display: 'flex',
          width: '30%',
          height: '70px',
          margin: '0px auto',
          verticalAlign: 'middle',
          outline: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          [mq[2]]: {
            width: '70%',
        }
        }}>
        <div onClick={this.toggleTabs("review")} css={{
          height: '50px',
          width: '50%',
          border: 'none',
          outline: 'none',
          verticalAlign: 'middle'
        }}>
          <button css={{
            border: 'none',
            height: '50px',
            width: '100%',
            background: 'black',
            opacity: '0.6',
            verticalAlign: 'middle',
            textAlign: 'center',
            outline: 'none',
            cursor: this.state.reviewTab ? "default" : "pointer",
          }}> <h4 css={{marginBottom: '0px', color: this.state.reviewTab ? 'white' : '#19a99d'}}> Essay Review</h4> </button>
        </div>
        <div 
        // onClick={this.toggleTabs("redraft")} 
        css={{
          height: '50px',
          width: '50%',
          border: 'none',
          outline: 'none',
          position:"relative"
        }}>
          <button css={{
            height: '50px',
            width: '100%',
            background: 'black',
            opacity: '0.6',
            border: 'none',
            outline: 'none',
            verticalAlign: 'middle',
            cursor:"help"
            // cursor: this.state.redraftTab ? "default" : "pointer",
          }} disabled><p className = "comming_soon_p">Comming soon</p> <h4 css={{marginBottom: '0px', color: this.state.redraftTab ? 'white' : '#19a99d'}}> Essay Redraft </h4> </button>
        </div>
        </div>
        {this.state.reviewTab && <div> <EssayReview /> </div>}
        {this.state.redraftTab && <div> <EssayRedraft /> </div>}
      </Layout>
    )
  }
}

export default EssaysPage
