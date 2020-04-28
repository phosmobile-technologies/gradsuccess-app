import React, { Component } from "react"
import { user_nav_routes } from "../user_nav_routes"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import ChatRoom from "../../commonModule/components/chatRoom"
import { connect } from "react-redux"
import ChatRoomUnavailableView from './../../commonModule/views/chatRoomUnavailableView';

class UserChatWindow extends Component {
  constructor(props) {
    super()
    this.state = {
      chatList: [],
    }
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  componentDidMount() {
    const data = this.props.user

    let userIDs = []
    let newPackages = [].concat(
      data.cover_letter_redrafts,
      data.cover_letter_reviews,
      data.graduate_school_essay_redrafts,
      data.graduate_school_statement_review,
      data.resume_reviews
    )
    newPackages.map(p => {
      if (p.assigned_associate_id) {
        userIDs.push(p.assigned_associate_id)
      }
    })
    var uniqueChatList = userIDs.filter(this.onlyUnique)
    this.setState(
      {
        chatList: uniqueChatList,
      }
    )
  }

  render() {
    if (this.state.chatList[0] == null) {
      return (
        <DashboardLayout
          body={
            <ChatRoomUnavailableView />
          }
          routes={user_nav_routes}
          title="Message Associate"
        />
      )
    }else{
      return (
        <DashboardLayout
          body={
            <ChatRoom chatList={this.state.chatList} user={this.props.user} />
          }
          routes={user_nav_routes}
          title="Message Associate"
        />
      )
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
)(UserChatWindow)
