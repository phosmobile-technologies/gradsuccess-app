import React from "react"
import Layout from "./components/layout"
import HomeHero from "./components/homeHero"
import ItemInCart from "./components/itemInCart"

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      cartNotEmpty:true
    }
  }

  componentDidMount(){
    if(localStorage.getItem("ItemsInCart") === []){
      this.setState({
        cartNotEmpty:false
      })
    }else if(localStorage.getItem("ItemsInCart") === null){
       this.setState({
        cartNotEmpty:false
      })
    }else if(localStorage.getItem("ItemsInCart") === ""){
      this.setState({
        cartNotEmpty:false
      })
    }
  }
  render() {
    if(this.state.cartNotEmpty){
          return (
      <Layout>
          <div
          css={{
            background: "white",
            padding: "3em 1em",
          }}
        >
          <ItemInCart />

        </div>
      </Layout>
    )
    }else{
      return(
        <Layout>
          <div
          css={{
            background: "white",
            padding: "3em 1em",
          }}
        >
          <div css={{
            textAlign:"center",
            minHeight: '430px',
          }}>
            <p>No item in cart</p>
          </div>

        </div>
      </Layout>
        
       )
    }

  }
}

export default Contact
