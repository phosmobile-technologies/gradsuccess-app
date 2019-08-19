import React from "react"
import Modal from "react-responsive-modal"
import Layout from "./components/layout"
import HomeHero from "./components/homeHero"
import AboutBox from "./components/aboutBox"
import Team from "./components/team"
import dan from "../images/dan.jpeg"
import FeaturedTestimonial from "./components/featuredTestimonial"
import aboutBg from "../images/aboutbg.jpg"
import { navigate } from "gatsby"

const aboutBgURL = `url(${aboutBg})`

const modal = { backgroundColor: "#E9E9E4" }

const inputTab = {
  minWidth: '255px',
  height: "40px",
  margin: "0px 30px",
  background: "white",
  outline: "none",
  border: "none",
  fontFamily: 'Lato',
  textIndent: "10px",
}

const steps = {
  textAlign: "center",
  color: "#19a99d",
  marginBottom: "10px",
  fontFamily: 'Lato',
  fontWeight: "bolder",
}


const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const text1 = "About Us"
const text2 = `We are a top-tier consulting firm positioned to assist ambitious, forward looking
  graduates and midlevel to experienced career people to attain their short-term and long-
  term objectives. At Admission Success you are the focus. We are positioned to help you
  from the moment you embark on your first internship, through graduation and unto your
  first job. We will guide you with those important cover letters and graduate school
  essays, and refine your résumés to get results. From the instant you place your request
  with us, you are rest-assured of a job well done.`
const text3 = "History"
const text4 = `In 2013, Admission Success was formed as a tutorial club for final year students at
Covenant University in 2013. Initially, the group which was called Club 340 at the time
was devoted to tutoring it's members, some of the highest performing students across
the set, for aptitude tests (such as McKinsey's PST), and popular graduate school
exams like the GRE and GMAT. Since 2013, Admission Success has expanded its
services cover clients outside of the university space. Previously focus was on
candidates at undergraduate or graduate school level, but this has since evolved to
include entry-level to experienced professionals looking to advance careers with a new
role or by attaining a second degree.`


class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      firstUrl: ""
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
            fontFamily: 'Lato',
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
          <option value="admissions"> Admission </option>
          <option value="careers"> Career</option>
          <option value="scholarships"> Scholarship</option>
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
        <AboutBox first={text1} second={text2} />
        <AboutBox first={text3} second={text4} />
        {/* Breaker */}
        <FeaturedTestimonial openModal={this.onOpenModal} />
        <AboutBox first={"CEO’s Charge"} second={`Dear Client,
        
        GradSuccess is an ambitious and innovative firm with an innovative array of services. Capitalizing on the
unique range of our portfolios, we are set out to provide high-level value for the clients we work with.
From dealings with graduates, mid-career and experienced professionals over the last half-decade, we
have been able to hone the skills and expertise to deliver the best quality improvement services for such
things as CVs, Cover Letters and associated essays.
Our excellence henceforth is founded on three unbroken principles and engrafted values: understanding,
proactiveness and professionalism. With a rigid and disciplined culture, we are set out to tread a new
path in the career and academic consultancy space.
We are on course in establishing a rapidly advancing company that fully caters to the vision of an
innovative and evolving consultancy business. Yet we are not going to rest on our oars, and will continue
to build on our successes first with the business, and then with our clients, creating a resilient and truly
transformational organization in the process.`} />
        <div css={{
          background: 'white',
          padding: '2em'
        }}>
          <div
            css={{
              textAlign: "center",
              fontFamily: 'Lato', 
              fontSize: "2em",
              fontWeight: "bolder",
              marginBottom: '1em'
            }}
          >
            {" "}
            Meet the Team{" "}
          </div>
          <div
            css={{
              display: "flex",
              margin: "0px auto",
              justifyContent: "center",
              [mq[2]]: {
                flexWrap: "wrap",
              },
            }}
          >
            <Team imgUrl={dan} jobTitle="Founder" name="Daniel Ukasoanya" />
            <Team imgUrl={dan} jobTitle="Co Founder" name="David Ubanyi" />
          </div>
        </div>

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
