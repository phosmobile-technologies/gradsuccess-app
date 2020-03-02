import React from "react"
import Modal from "react-responsive-modal"
import Layout from "./components/layout"
import HomeHero from "./components/homeHero"
import AboutBox from "./components/aboutBox"
import FeaturedTestimonial from "./components/featuredTestimonial"
import aboutBg from "../../../images/aboutbg.jpg"
import { navigate } from "gatsby"
 /* eslint-disable */ 
const aboutBgURL = `url(${aboutBg})`

const modal = { backgroundColor: "#E9E9E4" }

const inputTab = {
  minWidth: "255px",
  height: "40px",
  margin: "0px 30px",
  background: "white",
  outline: "none",
  border: "none",
  fontFamily: "Lato",
  textIndent: "10px",
}

const steps = {
  textAlign: "center",
  color: "#19a99d",
  marginBottom: "10px",
  fontFamily: "Lato",
  fontWeight: "bolder",
}

const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const text1 = "About Us"
const text2 = `We are a top-tier consulting firm positioned to assist ambitious, forward looking graduates, and career people attain their short-term and long- term objectives. At GradSuccess you are the focus. We are positioned to help you from the moment you embark on your first internship, through graduation, and unto your first job. We will guide you with those important cover letters and graduate school essays, and refine your résumés to get results. From the instant you place your request with us, you are rest-assured of a job well done.
`
const text3 = "History"
const text4 = `In 2013, GradSuccess was formed as a tutorial club for final year students at Covenant University. Initially, the group which was called Club 340 at the time was devoted to tutoring it's members, some of the highest performing students across the set, for aptitude tests (such as McKinsey's PST), and popular graduate school exams like the GRE and GMAT. Since 2013, GradSuccess has expanded its services cover clients outside of the university space. Previously, our focus was on candidates at undergraduate or graduate school level, but this has since evolved to include entry-level to experienced professionals looking to advance careers with a new role or by attaining a second degree.
`

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
            fontFamily: "Lato",
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
          <option value="essays"> Essay Review </option>
          <option value="cv-resume"> CV Redraft</option>
          <option value="complete-packages"> Complete Packages </option>
        </select>
      </div>
    )
  }
}

class AboutUs extends React.Component {
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
        <HomeHero
          title="About Us"
          text="We're always glad to tell our story, this is where our identity is"
          imgUrl={aboutBgURL}
          openModal={this.onOpenModal}
        />
        <AboutBox first={text1} second={text2} third={""} />
        <AboutBox first={text3} second={text4} third={""} />
        {/* Breaker */}
        <FeaturedTestimonial openModal={this.onOpenModal} />

        <AboutBox
          first={"Our Charge"}
          third={"Dear Client,"}
          second={`GradSuccess affords you expert assistance on some of your most important graduate
                          school and professional ambitions. In the last 10 years, we have leveraged top-notch
                          excellence of our associate pool made up of professionals from some of the most elite
                          institutions to assist young graduates and professionals achieve the finest quality
                          admission statements, CVs and cover letters. When you choose GradSuccess, you will
                          be assigned your own consultant with values founded on three unbroken principles :
                          understanding, proactiveness and professionalism, all geared towards providing the
                          highest quality work. With a rigid and disciplined culture, we are set out to tread a
                          new path in the career and academic consultancy space, and we are not going to rest
                          on our oars. We will continue to build on our successes with our clients, creating a
                          resilient and truly transformational partnership in the process.`}
        />

        {/*Modal popup*/}
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

export default AboutUs
