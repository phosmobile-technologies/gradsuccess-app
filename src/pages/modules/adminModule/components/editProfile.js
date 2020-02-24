import React, { Component } from "react"
import { admin_nav_routes } from "../admin_nav_routes"
import EditProfile from './../../commonModule/components/editProfile';
import DashboardLayout from './../../commonModule/components/dashboardLayout';

export default class AdminEditProfle extends Component {
  render() {
    return (
      <DashboardLayout
        body={<EditProfile />}
        routes={admin_nav_routes}
        title="Edit Profile"
      />
    )
  }
}
