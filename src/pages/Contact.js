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
          text="“We are happy to assist with any enquiries regarding
our services. Feel free to send a message and one of our associates would get back to
you within 24 hours"
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
