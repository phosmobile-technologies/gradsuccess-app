import React from "react"
import { jsx, css } from "@emotion/core"
import Layout from "../components/layout"
import HomeHero from "../components/homeHero"
import ScholarshipCustomPackage from "../components/scholarshipCustomPackage"
import scholarshipsbg from "../../images/scholarshipsbg.jpg"

const addBgURL = `url(${scholarshipsbg})`

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
          title="Scholarships Center - Complete Package"
          text="Getting world class education shouldn't mean breaking the bank because we are committed to helping you get the best scholarship offers"
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
              width: "100%",
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
              verticalAlign: "middle",
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
                cursor: this.state.reviewTab ? "default" : "pointer",
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
                Complete Package{" "}
              </h4>{" "}
            </button>
          </div>

          {/* Removed second Tab */}
        </div>
        {this.state.reviewTab && (
          <div>
            {" "}
            <ScholarshipCustomPackage />{" "}
          </div>
        )}
        {/* {this.state.redraftTab && <div> <EssayRedraft /> </div>} */}{" "}
      </Layout>
    )
  }
}

export default CompletePackage
