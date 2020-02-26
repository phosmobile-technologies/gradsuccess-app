import React, { Component } from "react"
import { admin_nav_routes } from "../admin_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import PackageDetails from "./../../commonModule/components/packageDetails"

export default class AdminEditProfle extends Component {
  constructor(props) {
    super()

    this.state = {
      packageItem: null,
    }
  }

  componentDidMount() {
    this.setState({
      packageItem: this.props.location.state.packageItem,
    })
  }

  render() {
    if (this.state.packageItem) {
      return (
        <DashboardLayout
          body={<PackageDetails packageItem={this.state.packageItem} />}
          routes={admin_nav_routes}
          title="Package Details"
        />
      )
    } else {
      return <div></div>
    }
  }
}
