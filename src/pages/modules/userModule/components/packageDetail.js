import React, { Component } from "react"
import { user_nav_routes } from "../user_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import PackageDetails from './../../commonModule/components/packageDetails';

export default class UserEditProfile extends Component {
                 constructor(props) {
                   super(props)

                   this.state = {
                     packageItem: null,
                   }
                 }

                 componentDidMount() {
                   this.setState({
                     packageItem: this.props.location.state.packageItem,
                   })
                 }
                 render() {
                   return (
                     <DashboardLayout
                       body={
                         <PackageDetails
                           packageItem={this.state.packageItem}
                         />
                       }
                       routes={user_nav_routes}
                       title="Package Detail"
                     />
                   )
                 }
               }
