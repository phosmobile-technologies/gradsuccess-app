import React, { Component } from "react"
import { user_nav_routes } from "../user_nav_routes"
import ChangePassword from './../../commonModule/components/changePassword';
import DashboardLayout from './../../commonModule/components/dashboardLayout';


export default class UserChangePassword extends Component {
  render() {
    return (
      <DashboardLayout
        body={<ChangePassword />}
        routes={user_nav_routes}
        title="Change Password"
      />
    )
  }
}
