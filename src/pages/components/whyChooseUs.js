import React from "react"
import{ jsx, css } from "@emotion/core"
import ChooseUsCard from "./chooseUsCard"
import PryButton from "./pryButton"
import scores from "../../images/scores.svg"
import planet from "../../images/planet.svg"
import rocket from "../../images/rocket.svg"


const breakpoints = [375, 576, 768 ]

const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)


class WhyChooseUs extends React.Component {
  constructor(props) {
      super(props)
      this.openModal = this.openModal.bind(this)
    }
      
      openModal() {
      this.props.openModal()
      }
      
      render() {
        return (
  <div
    css={{
      background: `linear-gradient(295deg, rgba(0,169,157,0.5) 0%, rgba(0,169,157,1) 100%), ${this.props.imgUrl}`,
      paddingBottom: "5em",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
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
        width: "65%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-around",
        [mq[2]]: {
          flexDirection: 'column'
      }
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
    <div css={{
        display: 'flex',
        margin: '0 auto',
        justifyContent: 'center',
        marginTop: '2em'
    }}> <span  onClick={this.openModal}>
      <PryButton text="Get Started"/> </span>
    </div>
  </div>
)
}}

export default WhyChooseUs