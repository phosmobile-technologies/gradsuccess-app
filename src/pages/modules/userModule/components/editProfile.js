import React, { Component } from "react"
import { user_nav_routes } from "../user_nav_routes"
import EditProfile from './../../commonModule/components/editProfile';
import DashboardLayout from './../../commonModule/components/dashboardLayout';

export default class UserEditProfile extends Component {
  render() {
    return (
      <DashboardLayout
        body={<EditProfile redirectLink="/user/account/dashboard" />}
        routes={user_nav_routes}
        title="Edit Profile"
      />
    )
  }
}
