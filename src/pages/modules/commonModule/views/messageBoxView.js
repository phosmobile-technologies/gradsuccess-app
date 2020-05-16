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
            {messages.length <= 0 ? (
              <NoChatHistory />
            ) : (
              messages.map((m, key) => {
                var _date = new Date(m.created_at).toDateString()
                if (m.recipient_id === chatMember.id) {
                  return (
                    <div className="message parker" key={key}>
                      {m.attached_file_type === "File" && (
                        <a
                          href={m.attached_file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="file-name-m">
                            <img
                              src={File}
                              alt="uploaded file"
                              className="d-image"
                            />
                            <span>{m.attached_file_name}</span>
                          </div>
                        </a>
                      )}
                      {m.attached_file_type === "Image" && (
                        <a
                          href={m.attached_file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="uploaded-image">
                            <div className="a-image">
                              <img src={m.attached_file} alt="uploaded file" />
                            </div>
                          </div>
                        </a>
                      )}
                      {m.message}

                      {m.sending ? (
                        <div className="sending-i">
                          <Spinner size={10} className="bp3-intent-primary " />
                          <span>Sending</span>
                        </div>
                      ) : (
                        <span className="message-time">{_date}</span>
                      )}
                    </div>
                  )
                } else {
                  return (
                    <div className="message stark" key={key}>
                      {m.attached_file_type === "File" && (
                        <a
                          href={m.attached_file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="file-name-m">
                            <img
                              src={File}
                              alt="uploaded file"
                              className="d-image"
                            />
                            <span>{m.attached_file_name}</span>
                          </div>
                        </a>
                      )}
                      {m.attached_file_type === "Image" && (
                        <a
                          href={m.attached_file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="uploaded-image">
                            <div className="a-image">
                              <img src={m.attached_file} alt="uploaded file" />
                            </div>
                          </div>
                        </a>
                      )}
                      {m.message}
                      <span className="message-time">{_date}</span>
                    </div>
                  )
                }
              })
            )}
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
