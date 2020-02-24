import { Link } from "gatsby"
import React from "react"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */

import Disclaimer from "../../../../utils/Disclaimer"
import ClientTermsOfService from "../../../../utils/clientTermsOfService"
import FAQ from "../../../../utils/faq"
import GradSuccessWebsiteTerms from "../../../../utils/gradSuccessWebsiteTerms"
import PrivacyGradSuccess from "../../../../utils/privacyGradSuccess"

import Modal from "react-modal"
import { jsx, css } from "@emotion/core"
import Image from "./logoImage"
import fb from "../../../../images/fb.svg"
import tw from "../../../../images/tw.svg"
import ig from "../../../../images/ig.svg"
 /* eslint-disable */
const defaultStyles = {
  content: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(17, 153, 146, 0.3)",
  },
}

const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const slash = css({
  fontSize: "20px",
  fontWeight: "bold",
})

const iconRight = css({
  margin: "0px 10px",
})

export default class resumeReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      PrivacyPolicy: false,
      WebsiteTermOfUse: false,
      Disclaimer: false,
      ClientTermOfService: false,
      faq: false,
    }
    this.handleDisplayComponent = this.handleDisplayComponent.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }
  handleDisplayComponent(event) {
    let Component = event.target.id
    let currentComponent = event.target.name

    this.setState({
      PrivacyPolicy: false,
      WebsiteTermOfUse: false,
      Disclaimer: false,
      ClientTermOfService: false,
      faq: false,
    })

    this.setState({
      [Component]: true,
    })
  }

  handleCloseModal() {
    this.setState({
      PrivacyPolicy: false,
      WebsiteTermOfUse: false,
      Disclaimer: false,
      ClientTermOfService: false,
      faq: false,
    })
  }

  render() {
    return (
      <div
        css={{
          margin: "0 auto",
          backgroundColor: "rgba(0,0,0,.8)",
          color: "#ccc",
        }}
      >
        <div
          css={{
            display: "flex",
            margin: "0px auto",
            color: "gray",
            width: "70%",
            paddingTop: "50px",
            [mq[2]]: {
              flexWrap: "wrap",
            },
          }}
        >
          {" "}
          <div
            css={{
              width: "60%",
              fontSize: "15px",
              [mq[2]]: {
                width: "100%",
                order: 2,
                marginBottom: "15px",
              },
            }}
          >
            <div css={{ color: "#ccc" }}>
              <Link to="/">
                <button
                  name="PrivacyPolicy"
                  id="PrivacyPolicy"
                  className="footerBtn"
                >
                  Home Page
                </button>
              </Link>
              <span css={slash}> / </span>
              <Link to="/Admissions">
                <button
                  name="PrivacyPolicy"
                  id="PrivacyPolicy"
                  className="footerBtn"
                >
                  Services and Prices
                </button>
              </Link>
              <span css={slash}> / </span>
              <Link to="/about-us">
                <button
                  name="PrivacyPolicy"
                  id="PrivacyPolicy"
                  className="footerBtn"
                >
                  About Us
                </button>
              </Link>
              <span css={slash}> / </span>
              <Link to="/Contact">
                <button
                  name="PrivacyPolicy"
                  id="PrivacyPolicy"
                  className="footerBtn"
                >
                  Contact
                </button>
              </Link>
              <span css={slash}> / </span>
              <Link to="/Blog">
                <button
                  name="PrivacyPolicy"
                  id="PrivacyPolicy"
                  className="footerBtn"
                >
                  Blog
                </button>
              </Link>
              <span css={slash}> / </span>
              <button
                name="PrivacyPolicy"
                id="PrivacyPolicy"
                className="footerBtn"
                onClick={this.handleDisplayComponent}
              >
                Privacy Policy{" "}
              </button>
              <span css={slash}> / </span>
              <button
                name="WebsiteTermOfUse"
                id="WebsiteTermOfUse"
                className="footerBtn"
                onClick={this.handleDisplayComponent}
              >
                Website Terms of Use{" "}
              </button>
              <span css={slash}> / </span>
              <button
                name="Disclaimer"
                id="Disclaimer"
                className="footerBtn"
                onClick={this.handleDisplayComponent}
              >
                Disclaimer{" "}
              </button>
              <span css={slash}> / </span>
              <button
                name="ClientTermOfService"
                id="ClientTermOfService"
                className="footerBtn"
                onClick={this.handleDisplayComponent}
              >
                Client Terms of Service
              </button>
              <span css={slash}> / </span>
              <button
                name="faq"
                id="faq"
                className="footerBtn"
                onClick={this.handleDisplayComponent}
              >
                FAQ
              </button>
            </div>
            <br /> <br />
            <div css={{ color: "#ccc" }} className="footer_addresss">
              GradSuccess Suite A54 Prima-Tek Plaza Egbeda Lagos
            </div>
          </div>
          {/* */}
          <div
            css={{
              width: "40%",
              [mq[2]]: {
                width: "100%",
                marginBottom: "15px",
              },
            }}
          >
            <div>
              <Link to="/">
                <div
                  css={{
                    width: "200px",
                    margin: ".5em auto .1em",
                    float: "right",
                    [mq[2]]: {
                      float: "none",
                    },
                  }}
                >
                  <Image />
                </div>
              </Link>
            </div>
            {/* Social Icons*/}
            <div
              css={{
                clear: "both",
                float: "right",
                margin: "0px auto",
                display: "flex",
                justifyContent: "flex-start",
                [mq[2]]: {
                  float: "none",
                  justifyContent: "center",
                },
              }}
            >
              {/*Social Icons butons*/}
              <img src={fb} alt="Facebook" css={iconRight} />
              <img src={tw} alt="Twitter" css={iconRight} />
              <img src={ig} alt="Instagram" css={iconRight} />
            </div>
          </div>
        </div>

        <div
          css={{
            width: "70%",
            margin: "0 auto",
            paddingBottom: "10px",
            color: "white",
            fontFamily: '"Poppins", "sans-serif"',
          }}
        >
          © {new Date().getFullYear()}, Built By
          <a href="https://www.phosmobile.com"> PhosMobile</a>
        </div>
        <div className="modal_wrapper">
          <Modal
            isOpen={this.state.PrivacyPolicy}
            contentLabel="Minimal Modal Example"
            style={defaultStyles}
            ariaHideApp={false}
          >
            <PrivacyGradSuccess />
            <a className="ModalCloseBut" onClick={this.handleCloseModal}>
              x
            </a>
          </Modal>
        </div>
        <div className="modal_wrapper">
          <Modal
            isOpen={this.state.WebsiteTermOfUse}
            contentLabel="Minimal Modal Example"
            style={defaultStyles}
            ariaHideApp={false}
          >
            <GradSuccessWebsiteTerms />

            <a className="ModalCloseBut" onClick={this.handleCloseModal}>
              x
            </a>
          </Modal>
        </div>
        <div className="modal_wrapper">
          <Modal
            isOpen={this.state.Disclaimer}
            contentLabel="Minimal Modal Example"
            style={defaultStyles}
            ariaHideApp={false}
          >
            <Disclaimer />

            <a className="ModalCloseBut" onClick={this.handleCloseModal}>
              x
            </a>
          </Modal>
        </div>
        <div className="modal_wrapper">
          <Modal
            isOpen={this.state.ClientTermOfService}
            contentLabel="Minimal Modal Example"
            style={defaultStyles}
            ariaHideApp={false}
          >
            <ClientTermsOfService />

            <a className="ModalCloseBut" onClick={this.handleCloseModal}>
              x
            </a>
          </Modal>
        </div>
        <div className="modal_wrapper">
          <Modal
            isOpen={this.state.faq}
            contentLabel="Minimal Modal Example"
            style={defaultStyles}
            ariaHideApp={false}
          >
            <FAQ />

            <a className="ModalCloseBut" onClick={this.handleCloseModal}>
              x
            </a>
          </Modal>
        </div>
      </div>
    )
  }
}
