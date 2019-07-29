import React from "react"
import { jsx, css } from "@emotion/core"
import Layout from "../components/layout"
import HomeHero from "../components/homeHero"
import CareerCustomPackage from "../components/careerCustomPackage"
import careersbg from "../../images/careersbg.jpg"

const addBgURL = `url(${careersbg})`

const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

class CompletePackage extends React.Component {
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
          title="Careers Center - Complete Package"
          text="We understand your career means a lot to you, that's because we are have what it takes to give your career a big boost"
          imgUrl={addBgURL}
        />
        <div
          css={{
            display: "flex",
            width: "30%",
            height: "70px",
            margin: "0px auto",
            verticalAlign: "middle",
            outline: "none",
            alignItems: "center",
            justifyContent: "center",
            [mq[2]]: {
              width: "70%",
            },
          }}
        >
          <div
            onClick={this.toggleTabs("review")}
            css={{
              height: "50px",
              width: "50%",

              border: "none",
              outline: "none",
            }}
          >
            <button
              css={{
                border: "none",
                height: "50px",
                width: "100%",
                background: "black",
                opacity: "0.6",
                verticalAlign: "middle",
                textAlign: "center",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {" "}
              <h4
                css={{
                  marginBottom: "0px",
                  color: this.state.reviewTab ? "white" : "#19a99d",
                }}
              >
                {" "}
                Custom Package{" "}
              </h4>{" "}
            </button>
          </div>
        </div>
        {this.state.reviewTab && (
          <div>
            {" "}
            <CareerCustomPackage />{" "}
          </div>
        )}
        {this.state.redraftTab && (
          <div>
            {" "}
            <careerCustomPackage />{" "}
          </div>
        )}{" "}
      </Layout>
    )
  }
}

export default CompletePackage
