import React, { Component } from "react"
import ChatFormView from "./../views/chatFormView"

export default class ChatForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       recipient:null
    };
  };

  componentDidMount(){
    this.setState({
      recipient: this.props.recipient,
    })
  }
  
  render() {
    if (this.state.recipient) {
      return <ChatFormView recipient_id={this.state.recipient.id} />
    } else {
      return <div></div>
    }
  }
}
