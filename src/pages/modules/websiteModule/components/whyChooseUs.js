import React from "react"
import ChooseUsCard from "./chooseUsCard"
import PryButton from "./pryButton"
import scores from "../../../../images/scores.svg"
import planet from "../../../../images/planet.svg"
import rocket from "../../../../images/rocket.svg"
import Modal from "react-responsive-modal"
import { navigate } from 'gatsby';
 /* eslint-disable */
const breakpoints = [375, 576, 768]
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

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




class WhyChooseUs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  openModal=()=> {
    this.setState({
      open: true,
    })
  }

  closeModal=()=> {
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <div
        css={{
          background: `linear-gradient(295deg, rgba(0,169,157,0.5) 0%, rgba(0,169,157,1) 100%), ${this.props.imgUrl}`,
          paddingBottom: "5em",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h2
          css={{
            textAlign: "center",
            paddingTop: "2em",
            paddingBottom: "1em",
            color: "white",
          }}
        >
          {this.props.title}
        </h2>
        <div
          css={{
            width: "70%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            [mq[2]]: {
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          <ChooseUsCard
            title="Excellent Service"
            text="Excellence is our watch word. We are ready to go above and beyond to secure the best outcomes for our clients.
"
            imgUrl={scores}
          />
          <ChooseUsCard
            title="Global Orientation"
            text="Our clients go to some of the most prestigious institutions around the world, and so our work is always set out to compete globally.
"
            imgUrl={planet}
          />
          <ChooseUsCard
            title="Speedy Delivery"
            text="We don't believe half-baked is better than none. We get the whole package ready and deliver in time to surpass your expectations.
"
            imgUrl={rocket}
          />
        </div>
        <div
          css={{
            display: "flex",
            margin: "0 auto",
            justifyContent: "center",
            marginTop: "0em",
          }}
        >
          <div
            css={{
              margin: "1em auto 0",
            }}
            onClick={this.openModal}
          >
            <button css={BigButtonStyles}>Get Started</button>
          </div>
        </div>
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          center
          styles={{ modal }}
        >
          <div>
            <Search />
          </div>
        </Modal>
      </div>
    )
  }
}

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

export default WhyChooseUs
