import React, { Component } from "react"
import { associate_nav_routes } from "../associate_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import Logout from './../../commonModule/components/logout';

export default class UserLogout extends Component {
  render() {
    return (
      <DashboardLayout
        body={<Logout />}
        routes={associate_nav_routes}
        title="Logout"
      />
    )
  }
}
