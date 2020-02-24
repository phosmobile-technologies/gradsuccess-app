import React, { Component } from "react"
import DashboardLayout from "../commonModule/components/dashboardLayout"
import { user_nav_routes } from "./user_nav_routes"
import UserIndex from './components/dashboard';

export default class User extends Component {
  render() {
    return (
      <div>
        <DashboardLayout body={<UserIndex />} routes={user_nav_routes} title = "Dashboard"/>
      </div>
    )
  }
}
