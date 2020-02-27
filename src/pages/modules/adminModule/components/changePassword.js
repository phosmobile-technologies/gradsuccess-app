import React, { Component } from "react"
import { admin_nav_routes } from "../admin_nav_routes"
import ChangePassword from './../../commonModule/components/changePassword';
import DashboardLayout from './../../commonModule/components/dashboardLayout';


export default class AdminChangePassword extends Component {
  render() {
    return (
      <DashboardLayout
        body={<ChangePassword redirectLink="/admin/account/new-application" />}
        routes={admin_nav_routes}
        title="Change Password"
      />
    )
  }
}
