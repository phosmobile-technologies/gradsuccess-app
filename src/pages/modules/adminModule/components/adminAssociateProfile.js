import React, { Component } from "react"
import { admin_nav_routes } from "../admin_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import AssociateProfile from "../../commonModule/components/associateProfile"

export default class AdminEditProfle extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       id:null
    };
  };
  componentDidMount(){
    this.setState({
        id:this.props.location.state.id
    })
  }
  render() {
    return (
      <DashboardLayout
        body={<AssociateProfile id={this.state.id} />}
        routes={admin_nav_routes}
        title="Associate Profile"
      />
    )
  }
}
