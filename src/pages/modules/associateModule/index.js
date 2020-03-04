import React, { Component } from "react"
import DashboardLayout from "../commonModule/components/dashboardLayout"
import { associate_nav_routes } from "./associate_nav_routes"
import AssociateNewApplication from "./components/newApplication"
import { navigate } from "gatsby"
import { connect } from "react-redux"
 class AssociateIndex extends Component {
  componentDidMount() {
    if (!this.props.user) {
      navigate("/")
    }
  }
  render() {
    if (this.props.user) {
      return (
        <div>
          <DashboardLayout
            body={<AssociateNewApplication />}
            routes={associate_nav_routes}
            title="New Applications"
          />
        </div>
      )
    } else {
      return <div></div>
    }
  }
}


function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  null
)(AssociateIndex)
