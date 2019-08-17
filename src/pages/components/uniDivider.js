import React from "react"
import { jsx, css } from "@emotion/core"
import excited from "../../images/excited-heart.png"


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

       <div className = "Uni-divider">
         <div className = "Uni-divider-image-section">
           <div className = "excited-img-container"><img src = {excited} /></div>
           <div>
             <h1>Our clients get offers from</h1>
                <p><i>from these</i></p>
           </div>
         </div>
         <div className = "sliding-text">
           <ul>
             <li>MIB <span>/</span></li>
             <li>Goldman Sachs <span>/</span></li>
             <li>Oxford University <span>/</span></li>
             <li>Hult International Business School<span>/</span></li>
             <li>Notthingham University</li>
           </ul>
       </div>
      </div>
      </div>
    )
  }
}

export default UniDivider
