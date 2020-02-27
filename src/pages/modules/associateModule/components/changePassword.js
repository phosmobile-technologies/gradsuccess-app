import React, { Component } from "react"
import { associate_nav_routes } from "../associate_nav_routes"
import ChangePassword from './../../commonModule/components/changePassword';
import DashboardLayout from './../../commonModule/components/dashboardLayout';


export default class AssociateChangePassword extends Component {
  render() {
    return (
      <DashboardLayout
        body={
          <ChangePassword redirectLink="/associate/account/new-application" />
        }
        routes={associate_nav_routes}
        title="Change Password"
      />
    )
  }
}
