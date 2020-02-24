import React, { Component } from "react"
import { associate_nav_routes } from "../associate_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import PackageDetails from './../../commonModule/components/packageDetails';

export default class AssociateEditProfile extends Component {
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
                       routes={associate_nav_routes}
                       title="Package Detail"
                     />
                   )
                 }
               }
