import React, { Component } from "react"
import DashboardLayout from "../commonModule/components/dashboardLayout"
import { admin_nav_routes } from "./admin_nav_routes"
import AdminNewApplication from "./components/newApplication"

export default class AssociateIndex extends Component {
  render() {
    return (
      <div>
        <DashboardLayout
          body={<AdminNewApplication />}
          routes={admin_nav_routes}
          title="New Applications"
        />
      </div>
    )
  }
}
