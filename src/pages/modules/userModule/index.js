import React, { Component } from "react"
import DashboardLayout from "../commonModule/components/dashboardLayout"
import { user_nav_routes } from "./user_nav_routes"
import UserIndex from './components/dashboard';
import { navigate } from 'gatsby';
import { connect } from "react-redux";

class User extends Component {
  componentDidMount() {
    if (!this.props.user) {
      navigate("/")
    }
  }

  render() {
    if (this.props.user) {
      return (
        <div>
          <DashboardLayout body={<UserIndex />} routes={user_nav_routes} title="Dashboard" />
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
)(User)
