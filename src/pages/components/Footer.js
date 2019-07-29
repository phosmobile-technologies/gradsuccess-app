import { Link } from "gatsby"
import React from "react"
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Image from "./logoImage"
import fb from "../../images/fb.svg"
import tw from "../../images/tw.svg"
import ig from "../../images/ig.svg"

const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)


const slash = css({
  fontSize: "20px",
  fontWeight: "bold"
})

const iconRight = css({
  margin: "0px 10px"
})
const Footer = () => (
  <div css={{ margin: "0 auto"}}>

    <div
      css={{
        display: "flex",
        margin: "0px auto",
        color: 'gray',
        width: "70%",
        paddingTop: "50px",
        
        [mq[2]]: {
          flexWrap: 'wrap'
      }
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
            marginBottom: '15px'
        }
        }}
      >
        <div>
          Home Page <span css={slash}> / </span>
          Services and Prices <span css={slash}> / </span>
          About Us <span css={slash}> / </span>
          Contact <span css={slash}> / </span> Blog{" "}
          <span css={slash}> / </span>
          Privacy Policy <span css={slash}> / </span>
          Website Terms of Use <span css={slash}> / </span>
          Disclaimer <span css={slash}> / </span>
          Client Terms of Service
        </div>
        <br /> <br />
        <div>
          GradSuccess Suite A54 Prima-Tek Plaza Egbeda Lagos
        </div>
      </div>
      {/* */}
      <div
        css={{
          width: "40%",
          [mq[2]]: {
            width: "100%",
            marginBottom: '15px'
        }
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
                  float: "none"
              }
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
              justifyContent: 'center'
          }
          }}
        >
          {/*Social Icons butons*/}
          <img
            src={fb}
            alt="Facebook"
            css={iconRight}
          />
          <img
            src={tw}
            alt="Twitter"
            css={iconRight}
          />
          <img
            src={ig}
            alt="Instagram"
            css={iconRight}
          />
        </div>
      </div>
    </div>
  

    <div css={{width: '70%',
  margin: '0 auto', paddingBottom: '10px'}}>
    © {new Date().getFullYear()}, Built By 
    <a href="https://www.phosmobile.org"> PhosMobile</a>
    </div>

  </div>
)

export default Footer
