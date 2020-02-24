import React, { Component } from "react"

export default class AssociateNavRoutes extends Component {
  render() {
    return <div> </div>
  }
}

export const associate_nav_routes = [
         {
           name: "New Application",
           icon: "new-object",
           path: "associate/account/new-application",
         },
         {
           name: "Awaiting Approval",
           icon: "automatic-updates",
           path: "associate/account/awaiting-approval",
         },
         {
           name: "Assigned Application",
           icon: "property",
           path: "associate/account/assigned-application",
         },
         {
           name: "In Progress Application",
           icon: "trending-up",
           path: "associate/account/in-progress-application",
         },
         {
           name: "Completed Application",
           icon: "comparison",
           path: "associate/account/completed-application",
         },
         {
           name: "Messages",
           icon: "chat",
           path: "associate/account/chat-room",
         },
         {
           name: "Change Password",
           icon: "changes",
           path: "associate/account/change-password",
         },
         {
           name: "Edit Profile",
           icon: "edit",
           path: "associate/account/edit-profile",
         },
         {
           name: "Logout",
           icon: "log-in",
           path: "associate/account/logout",
         },
       ]
