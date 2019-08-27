import React from "react"
import Modal from "react-responsive-modal"

import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeHero from "../components/homeHero"
import TitleAndText from "../components/titleNtext"
import UniDivider from "../components/uniDivider"
import FeaturedTestimonial from "../components/featuredTestimonial"
import PackageCards from "../components/packageCards"
import WhyChooseUs from "../components/whyChooseUs"
import SampleEssays from "../components/sampleEssays"
import admissionsbg from "../../images/admissionsbg.jpg"
import { navigate } from "gatsby"
import AdmissionsFile from "../../files/AdmissionsFile.pdf"

const modal = { backgroundColor: "#E9E9E4" }

const addBgURL = `url(${admissionsbg})`

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
    if (event.target.value == "Admissions" || "Careers" || "Scholarships") {
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
          title="Welcome to the Admissions Center"
          text="There is a lot of competition going on, and your desired spot is not exempted. If your application doesn’t fit in with the required standards of your career or school, you will most likely end up being rejected. We don’t want this to happen, this is why we are here to help you get into top schools around the world, stress free!"
          imgUrl={addBgURL}
          openModal={this.onOpenModal}
        />
        <TitleAndText
          title="Admissions Have Never Been This Exciting"
          text="University admissions is a daunting process, from personal statements, reference letters and several certificating tests (IELTS, GMAT & GMAT to name a few), there’s so much involved.  At GradSuccess, we have expertise in preparing our clients for the most competitive universities. Through our novel array of packages we are able to provide our clients with cutting-edge services ranging from reviews, redrafts and one-on-one coaching about preferred options. "
        />
        <PackageCards service="Admissions" />
        <UniDivider />
        <WhyChooseUs
          title="Why Choose Us For Your Admission Process"
          imgUrl={addBgURL}
          openModal={this.onOpenModal}
        />
        <FeaturedTestimonial openModal={this.onOpenModal} />
        <SampleEssays
          read="Read Our Sample Essay"
          essay="Application Statement to University of Birmingham Masters in Theatre and Film Studies"
          type="Redraft service"
          discipline="B.A. Theatre and Film Studies at Top undergraduate Nigerian University"
          downloadPdf={AdmissionsFile}
          fileName="Application Statement to University of Birmingham Masters in Theatre and Film Studies - (Redraft Service)"
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

export default IndexPage
