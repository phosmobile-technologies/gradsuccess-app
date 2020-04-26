import React, { Component } from "react"
import File from "../../../../images/file.svg"
import UserImage from "../../../../images/default_profile_img.png"
import NoChatHistory from "./noChatHistory"
import ChatForm from "./../components/chatForm"
import { Spinner } from "@blueprintjs/core"
import { connect } from "react-redux"

class MessageBoxView extends Component {
  render() {
    var today = new Date()
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var chatMember = this.props.chatMember
    var messages = this.props.messages

    if (this.props.chatMember || this.props.messages) {
      return (
        <div className="chat">
          <div className="contact bar">
            <div className="pic">
              {chatMember.details ? (
                <img
                  src={chatMember.details.profile_image_ref}
                  alt={chatMember.first_name + " " + chatMember.last_name}
                />
              ) : (
                <img src={UserImage} alt="Default profile" />
              )}
            </div>
            <div className="name">
              {chatMember.first_name + " " + chatMember.last_name}
            </div>
            <div className="seen"> Today, {time}</div>
          </div>
          <div className="messages" id="chat">
            <div className="history-unavailable">
              <Spinner size = {Spinner.SIZE_SMALL}></Spinner>
            </div>
          </div>
          <ChatForm recipient={chatMember} />
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

export default connect(mapStateToProps)(MessageBoxView)

