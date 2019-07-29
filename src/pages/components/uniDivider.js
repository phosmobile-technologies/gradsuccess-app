import React from "react"
import { jsx, css } from "@emotion/core"
import pic1 from "../../images/uni1.png"
import pic2 from "../../images/uni2.png"
import pic3 from "../../images/uni3.png"
import pic4 from "../../images/uni4.png"
import pic5 from "../../images/uni5.png"

const ImgStyle = {
  transform: "scale(0.7,0.7)",
  marginBottom: "0",
}

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
          padding: "0 5em",
        }}
      >
        <img src={pic1} alt="Goldman Sachs logo" css={ImgStyle} />
        <img src={pic2} alt="Oxford University logo" css={ImgStyle} />
        {this.state.windowWidth > 500 && (
          <img src={pic3} alt="Durham University logo" css={ImgStyle} />
        )}
        {this.state.windowWidth > 500 && (
          <img src={pic4} alt="Hult logo" css={ImgStyle} />
        )}
        {this.state.windowWidth > 500 && (
          <img src={pic5} alt="Notthingham University logo" css={ImgStyle} />
        )}
      </div>
    )
  }
}

export default UniDivider
