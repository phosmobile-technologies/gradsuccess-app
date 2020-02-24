import React from "react"
import { Link } from "gatsby"
const lowerCount = {
  background: "#00a99d",
  textAlign: "center",
}

const slash = {
  color: "yellow",
  fontSize: "30px",
  fontWeight: "bold",
}

class LowerCTA extends React.Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
  }

  openModal() {
    this.props.openModal()
  }

  render() {
    return (
      <div>
        {/* Get Started */}
        <div css={lowerCount}>
          <div
            css={{
              fontWeight: "bold",
              color: "white",
              paddingTop: "5%",
            }}
          >
            <h2> Get Expert Help With Your Application </h2>{" "}
          </div>
          <div>
            <h4
              css={{
                color: "white",
                fontWeight: "500",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              {" "}
              CV REDRAFTS <span css={slash}> / </span>
              ESSAY REDRAFTS <span css={slash}> / </span>
              CV REVIEWS <span css={slash}> / </span>
              ESSAY REVIEWS{" "}
            </h4>{" "}
          </div>
          <div
            css={{
              padding: "40px",
            }}
          >
            {" "}
            <span onClick={this.openModal}>
              <button css={BigButtonStyles}>Get Started</button>{" "}
            </span>
            <Link to="about-us">
              <button
                css={{
                  border: "2px solid yellow",
                  minWidth: "200px",
                  minHeight: "50px",
                  margin: "0px auto",
                  outline: "none",
                  background: "none",
                  color: "white",
                  fontFamily: '"Poppins", sans-serif',
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {" "}
                Learn More{" "}
              </button>{" "}
            </Link>{" "}
          </div>
        </div>
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
  display: "block",
  ":hover": {
    background: "#47dcbc",
    color: "yellow",
  },
  transition: "all .2s ease-out",
  boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
}
export default LowerCTA
