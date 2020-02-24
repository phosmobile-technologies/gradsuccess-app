import React, { Component } from "react"
import { associate_nav_routes } from "../associate_nav_routes"
import EditProfile from './../../commonModule/components/editProfile';
import DashboardLayout from './../../commonModule/components/dashboardLayout';

export default class AssociateEditProfile extends Component {
  render() {
    return (
      <DashboardLayout
        body={<EditProfile />}
        routes={associate_nav_routes}
        title="Edit Profile"
      />
    )
  }
}
