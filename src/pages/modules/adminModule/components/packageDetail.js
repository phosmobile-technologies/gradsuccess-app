import React, { Component } from "react"
import { admin_nav_routes } from "../admin_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import PackageDetails from "./../../commonModule/components/packageDetails"
import { connect } from "react-redux"

class AdminEditProfle extends Component {
  constructor(props) {
    super()

    this.state = {
      packageItem: null,
    }
  } 

  componentDidMount() {
    this.setState({
      packageItem: this.props.packageDetail,
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

function mapStateToProps(state) {
  return {
    packageDetail:state.cart.package
  }
}
export default connect(
  mapStateToProps,
  null
)(AdminEditProfle)
