import React, { Component } from "react"
import Layout from "./components/layout"
import SEO from "./components/seo"
import ExpertSpecificRequest from "./components/Forms/ExpertSpecificRequest"
 /* eslint-disable */ 
export default class ExpertSpecificApplication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      associate:null,
    }
  }
  componentDidMount(){
    this.setState({
      associate:this.props.location.state.associate
    })
  }

  render() {
    return (
      <Layout>
        <SEO
          title="Request Associate Service"
          keywords={[`success`, `application`, `university`]}
        />
        <ExpertSpecificRequest
          associate={this.state.associate}
        />
      </Layout>
    )
  }
}
