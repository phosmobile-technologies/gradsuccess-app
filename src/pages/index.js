import React from "react"
import Modal from "react-responsive-modal"
import { jsx, css } from "@emotion/core"
import { navigate } from "gatsby"

// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import Layout from "./components/layout"
import SEO from "./components/seo"
import HomeHero from "./components/homeHero"
import TitleAndText from "./components/titleNtext"
import UniDivider from "./components/uniDivider"
import Steps from "./components/steps"
import FeaturedTestimonial from "./components/featuredTestimonial"
import BigCountCTA from "./components/bigCountCTA"
import bgImage from '../images/bgImage.jpg'
import { setContext } from 'apollo-link-context'
// import * as firebase from 'firebase'



const modal = { backgroundColor: "#E9E9E4" }

const bgURL = `url(${bgImage})`

const inputTab = {
  minWidth: '255px',
  height: "40px",
  margin: "0px 30px",
  background: "white",
  outline: "none",
  border: "none",
  fontFamily: "Lato",
  textIndent: "10px"
}

const steps = {
  textAlign: "center",
  color: "#19a99d",
  marginBottom: "10px",
  fontFamily: "Lato",
  fontWeight: "bolder",
}
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      firstUrl: "",
    }
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleEnable = this.handleEnable.bind(this)
  }

  handleEnable(event) {
    if (event.target.value == "Admissions" || "Careers" || "Scholarships") {
      const firstUrl = event.target.value
      this.setState({
        disabled: false,
        firstUrl: firstUrl,
      })
    }
  }

  componentDidMount(){

  }


  handleRedirect(event) {
    if (event.target.value === "essays" || "cv-resume" || "complete-packages") {
      var secondUrl = event.target.value
    }
    if (this.state.firstUrl && secondUrl) {
      navigate(this.state.firstUrl + "/" + secondUrl)
    }
  }

  render() {
    return (
      <div
        css={{
          paddingBottom: "10px",
        }}
      >
        <h2
          css={{
            fontFamily: "Lato",
            textAlign: "center",
          }}
        >
          {" "}
          Get Started!
        </h2>
        <h3 for="program-select" css={steps}>
          STEP 1
        </h3>
        <select id="program-select" onChange={this.handleEnable} css={inputTab}>
          <option value="" selected disabled>
            What's your interest?
          </option>
          <option value="Admissions"> Admission </option>
          <option value="Careers"> Career</option>
          <option value="Scholarships"> Scholarship</option>
        </select>
        {/* Second */} <br /> <br />
        <h3 for="program-select" css={steps}>
          {" "}
          STEP 2{" "}
        </h3>
        <select
          id="program-select2"
          disabled={this.state.disabled}
          onChange={this.handleRedirect}
          css={inputTab}
        >
          <option value=""> What do you need help with? </option>
          <option value="essays"> Essay Review </option>
          <option value="cv-resume"> CV Redraft</option>
          <option value="complete-packages"> Complete Packages </option>
        </select>
      </div>
    )
  }
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onOpenModal = () => {
    this.setState({ open: true })
  }
  onCloseModal = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state
    return (
      <Layout>
        <SEO title="Home" keywords={[`success`, `application`, `university`]} />
        <HomeHero
          title="Get expert help with your applications"
          text="We help young graduates and career people achieve their long and short academic and professional goals"
          button="Get Started"
          imgUrl={bgURL}
          openModal={this.onOpenModal}
        />
        <TitleAndText
          title="Apply With Confidence"
          text="Send out your applications knowing they are the very best they can be. Our review and redraft experts can’t wait to meet you!"
        />
        <UniDivider />
        <Steps />
        <FeaturedTestimonial openModal={this.onOpenModal} />
        <BigCountCTA openModals={this.onOpenModal} />
        <Modal
            open={open}
            onClose={this.onCloseModal}
            center
            styles={{ modal }}
          >
            <div>
              {" "}
              <Search />{" "}
            </div>
          </Modal>
      </Layout>
    )
  }
}

export default IndexPage
