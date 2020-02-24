import React, { Component } from "react"
import ChatRoomView from "./../views/chatRoomView"
import { connect } from "react-redux"

class ChatRoom extends Component {
  render() {
    if (this.props.user) {
      return (
        <div>
          <ChatRoomView
            chatList={this.props.chatList}
            user_id={this.props.user.id}
          />
        </div>
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
)(ChatRoom)
