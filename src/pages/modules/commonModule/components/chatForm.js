import React, { Component } from "react"
import ChatFormView from "./../views/chatFormView"

export default class ChatForm extends Component {
  constructor(props) {
    super(props)
  };

  
  render() {
    if (this.props.recipient) {
      return <ChatFormView recipient_id={this.props.recipient.id} />
    } else {
      return <div></div>
    }
  }
}
