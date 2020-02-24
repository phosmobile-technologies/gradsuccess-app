import React, { Component } from "react"

export default class UserNavRoutes extends Component {
  render() {
    return <div> </div>
  }
}

export const user_nav_routes = [
         {
           name: "Dashboard",
           icon: "dashboard",
           path: "user/account/dashboard",
         },
         {
           name: "chat With Associate",
           icon: "chat",
           path: "user/account/chat-room",
         },
         {
           name: "Change Password",
           icon: "changes",
           path: "user/account/change-password",
         },
         {
           name: "Edit Profile",
           icon: "edit",
           path: "user/account/edit-profile",
         },
         {
           name: "Logout",
           icon: "log-in",
           path: "user/account/logout",
         },
       ]
