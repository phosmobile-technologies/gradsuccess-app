import React from "react"
import Layout from "./components/layout"
import CartSummary from "./components/cartSummary"


class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartNotEmpty: true,
    }
  }
  render() {
     return (
       <Layout>
          <CartSummary />
       </Layout>
     )
    }
  }

  
export default Cart
