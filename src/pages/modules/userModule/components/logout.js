import React, { Component } from "react"
import { user_nav_routes } from "../user_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import Logout from './../../commonModule/components/logout';

export default class UserLogout extends Component {
  render() {
    return (
      <DashboardLayout
        body={<Logout />}
        routes={user_nav_routes}
        title="Logout"
      />
    )
  }
}
