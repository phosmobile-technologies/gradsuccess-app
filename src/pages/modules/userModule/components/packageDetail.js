import React, { Component } from "react"
import { user_nav_routes } from "../user_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import PackageDetails from "./../../commonModule/components/packageDetails"
import { connect } from "react-redux"

class UserEditProfile extends Component {
  constructor(props) {
    super(props)

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
          routes={user_nav_routes}
          title="Package Detail"
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
)(UserEditProfile)



