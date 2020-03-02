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
import careersbg from "../../../../images/careersbg.jpg"
import { navigate } from "gatsby"
import CareersFile from "../../../../files/CareersFile.pdf"
 /* eslint-disable */ 
const careersBgURL = `url(${careersbg})`
const modal = { backgroundColor: "#E9E9E4" }

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
    if (event.target.value == "admissions" || "careers" || "scholarships") {
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
          title="Welcome to the Career Center"
          imgUrl={careersBgURL}
          openModal={this.onOpenModal}
        />
        <TitleAndText
          title="We Think Your Career Could Use a Lift"
          text="From application letters to CVs, to reference letters we know the essentials you need to land that next job. So we have spent the last half decade honing the skills needed to ensure our clients have the very best application packages. Let’s be your partner on your next career move."
        />
        <PackageCards service="careers" />
        <UniDivider />
        <WhyChooseUs
          title="Why Choose Us For Your Admission Process"
          imgUrl={careersBgURL}
          openModal={this.onOpenModal}
        />
        <FeaturedTestimonial openModal={this.onOpenModal} />
        <SampleEssays
          read="Read Our Sample CV Review"
          essay="CV for Health Industry"
          type="Review"
          discipline="Chemistry major switching to Health Industry. Has background in banking and project management"
          pdfURL={CareersFile}
          downloadPdf={CareersFile}
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
