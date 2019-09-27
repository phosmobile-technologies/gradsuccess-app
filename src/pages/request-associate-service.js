import React, { Component } from 'react';
import Layout from "./components/layout"
import SEO from "./components/seo"
import ExpertSpecificRequest from './components/Forms/ExpertSpecificRequest'



export default class ExpertSpecificApplication extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:this.props.location.state.id
        }
    }

    componentDidMount(){
        console.log(this.props.location.state.id);
    }
  render() {
    return (
      <Layout>
        <SEO title="Request Associate Service" keywords={[`success`, `application`, `university`]} />
        <ExpertSpecificRequest />
      </Layout>
    );
  }
}
