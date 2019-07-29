import React from "react"
import Layout from "../components/layout"
import HomeHero from "../components/homeHero"
import CheckoutForm from "../components/checkoutForm"

class Contact extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Layout>

          <div
          css={{
            background: "white",
            padding: "3em 1em",
          }}
        >
        <CheckoutForm />
        </div>
      </Layout>
    )
  }
}

export default Contact
