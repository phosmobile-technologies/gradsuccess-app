import React from "react"
import excited from "../../../../images/excited-heart.png"

 /* eslint-disable */
class UniDivider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      windowWidth: null,
    }
  }

  componentDidMount() {
    this.setState({ windowWidth: window.innerWidth })
  }
  render() {
    return (
      <div
        css={{
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
          background: "white",
          padding:"50px 0px"
        }}
      >
        <div className="Uni-divider">
          <div className="Uni-divider-image-section">
            <div className="excited-img-container">
              <img src={excited} />
            </div>
            <div>
              <h1
                css={{
                  fontFamily: "Lato",
                }}
              >
                Our clients get offers from
              </h1>
            </div>
          </div>
          <div className="sliding-text">
            <ul>
              <li>
                Goldman Sachs <span>/</span>
              </li>
              <li>
                Oxford University <span>/</span>
              </li>
              <li>
                Hult International Business School<span>/</span>
              </li>
              <li>Notthingham University</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default UniDivider
