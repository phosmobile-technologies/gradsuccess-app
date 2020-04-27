import React, { Component } from "react"
import { associate_nav_routes } from "../associate_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import ChatRoom from "../../commonModule/components/chatRoom"
import logo from "../../../../images/logo2.png"
import { Spinner } from '@blueprintjs/core';
import { Query } from 'react-apollo';
import { COMBINED_PACKAGE_QUERY_BY_ASSOCIATE_ID } from "../../../graphql/queries"
import { connect } from "react-redux"


 class AssociateEditProfile extends Component {
                 constructor(props) {
                   super()
                   this.state = {
                     chatList: [],
                   }
                 }
                 onlyUnique(value, index, self) {
                   return self.indexOf(value) === index
                 }

                 render() {
                   if (this.props.user) {
                     return (
                       <Query
                         query={COMBINED_PACKAGE_QUERY_BY_ASSOCIATE_ID}
                         variables={{
                           user_id: this.props.user.id,
                         }}
                         fetchPolicy="no-cache"
                         onCompleted={data => {
                           let userIDs = []
                           let newPackages = [].concat(
                             data.getCoverLetterReviewByAssociateId,
                             data.getGraduateSchoolStatementReviewByAssociateId,
                             data.getCoverLetterRedraftByAssociateId,
                             data.getGraduateSchoolEssayRedraftByAssociateId,
                             data.getResumeReviewByAssociateId
                           )
                           newPackages.map(p => {
                             if (p.user_id) {
                               userIDs.push(p.user_id)
                             }
                           })
                           var uniqueChatList = userIDs.filter(this.onlyUnique)
                           this.setState({
                             chatList: uniqueChatList,
                           })
                         }}
                       >
                         {({ loading, error, data }) => {
                           if (loading)
                             return (
                               <DashboardLayout
                                 body={
                                   <div className="loading-logged-user-landing">
                                     <img src={logo} alt="gradsuccess" />
                                     <Spinner
                                       className="bp3-intent-success"
                                       number={Spinner.SIZE_LARG}
                                     />
                                   </div>
                                 }
                                 routes={associate_nav_routes}
                                 title="Message Client"
                               />
                             )
                           if (error) return <div>Failed to load data</div>
                           return (
                             <DashboardLayout
                               body={
                                 <ChatRoom
                                   chatList={this.state.chatList}
                                   user={this.props.user.id}
                                 />
                               }
                               routes={associate_nav_routes}
                               title="Message Client"
                             />
                           )
                         }}
                       </Query>
                     )
                   } else {
                     return <div></div>
                   }
                 }
               }

function mapStateToProps(state) {
  return {
    user: state.loggedInUser,
  }
}


export default connect(
  mapStateToProps,
  null
)(AssociateEditProfile)

