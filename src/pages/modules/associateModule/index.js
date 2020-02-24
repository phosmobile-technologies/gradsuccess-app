
import React, { Component } from "react"
import DashboardLayout from "../commonModule/components/dashboardLayout"
import { associate_nav_routes } from "./associate_nav_routes"
import AssociateNewApplication from './components/newApplication';

export default class AssociateIndex extends Component {
  render() {
    return (
      <div>
        <DashboardLayout body={<AssociateNewApplication />} routes={associate_nav_routes} title = "New Applications"/>
      </div>
    )
  }
}
