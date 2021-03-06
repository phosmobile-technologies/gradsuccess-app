import React from "react"
import Modal from "react-responsive-modal"
import { jsx } from "@emotion/core"
import { navigate } from "gatsby"

// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import Layout from "./modules/websiteModule/components/layout"
import SEO from "./modules/websiteModule/components/seo"
import HomeHero from "./modules/websiteModule/components/homeHero"
import TitleAndText from "./modules/websiteModule/components/titleNtext"
import UniDivider from "./modules/websiteModule/components/uniDivider"
import Steps from "./modules/websiteModule/components/steps"
import FeaturedTestimonial from "./modules/websiteModule/components/featuredTestimonial"
import BigCountCTA from "./modules/websiteModule/components/bigCountCTA"
import bgImage from "../images/bgImage.jpg"
import FeaturedExperts from "./modules/websiteModule/components/featuredExperts"

const modal = { backgroundColor: "#E9E9E4" }

const bgURL = `url(${bgImage})`

const inputTab = {
  minWidth: "255px",
  height: "40px",
  margin: "0px 30px",
  background: "white",
  outline: "none",
  border: "none",
  fontFamily: "poppins",
  textIndent: "10px",
}

const steps = {
  textAlign: "center",
  color: "#19a99d",
  marginBottom: "10px",
  fontFamily: "poppins",
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
    if (event.target.value === "admissions" || "careers" || "scholarships") {
      const firstUrl = event.target.value
      this.setState({
        disabled: false,
        firstUrl: firstUrl,
      })
    }
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
            fontFamily: "poppins",
            textAlign: "center",
          }}
        >
          {" "}
          Get Started!
        </h2>
        <h3 htmlFor="program-select" css={steps}>
          STEP 1
        </h3>
        <select id="program-select" onChange={this.handleEnable} css={inputTab}>
          <option value="" selected disabled>
            What's your interest?
          </option>
          <option value="admissions"> Admission </option>
          <option value="careers"> Career</option>
          <option value="scholarships"> Scholarship</option>
        </select>
        {/* Second */} <br /> <br />
        <h3 htmlFor="program-select" css={steps}>
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
          <option value="essays">Essays</option>
          <option value="cv-resume">CVs</option>
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
          text="Have you written your application with the fear of not getting accepted? Let’s help you review your application and get you into that dream school or career. 
"
          button="Get Started"
          imgUrl={bgURL}
          openModal={this.onOpenModal}
        />
        <TitleAndText
          title="Apply With Confidence"
          text="Have the best application that will make you easily noticeable from the rest of the competition."
        />
        <UniDivider />
        <Steps />
        <FeaturedTestimonial openModal={this.onOpenModal} />
        <BigCountCTA openModals={this.onOpenModal} />
        <FeaturedExperts />
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
