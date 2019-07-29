import React from "react"
import Layout from "./components/layout"
import HomeHero from "./components/homeHero"
import MessageUs from "./components/messageUs"
import contactBg from "../images/contactbg.jpg"


const contactBgURL = `url(${contactBg})`

class Contact extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        
          <HomeHero
            title="Contact Us"
            text="We are available for any questions you might have, just leave a message below and we'll get in touch with you"
            imgUrl={contactBgURL}
            openModal={this.onOpenModal}
          />
          <div
          css={{
            background: "white",
            padding: "3em 1em",
          }}
        >
          {/* Contact */}
          <MessageUs />
        </div>
      </Layout>
    )
  }
}

export default Contact
