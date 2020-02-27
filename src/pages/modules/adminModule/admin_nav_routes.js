import React, { Component } from 'react';

export default class AdminNavRoutes extends Component {
  render() {
    return (
      <div>  </div>
    );
  }
}


export const admin_nav_routes = [
         {
           name: "New Application",
           icon: "new-object",
           path: "admin/account/new-application",
         },
         {
           name: "Awaiting Approval",
           icon: "automatic-updates",
           path: "admin/account/awaiting-approval",
         },
         {
           name: "Assigned Application",
           icon: "property",
           path: "admin/account/assigned-application",
         },
         {
           name: "In Progress Application",
           icon: "trending-up",
           path: "admin/account/in-progress-application",
         },
         {
           name: "Completed Application",
           icon: "comparison",
           path: "admin/account/completed-application",
         },
         {
           name: "Associates",
           icon: "comparison",
           path: "admin/account/associates",
         },
         {
           name: "Messages",
           icon: "chat",
           path: "admin/account/chat-room",
         },
         {
           name: "Change Password",
           icon: "changes",
           path: "admin/account/change-password",
         },
         {
           name: "Edit Profile",
           icon: "edit",
           path: "admin/account/edit-profile",
         },
         {
           name: "Logout",
           icon: "log-in",
           path: "admin/account/logout",
         },
       ]