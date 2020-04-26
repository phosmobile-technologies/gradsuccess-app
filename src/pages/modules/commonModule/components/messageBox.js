import React, { Component } from 'react';
import MessageBoxView from './../views/messageBoxView';
import NoMessageView from '../views/NoMessageView';
import { connect } from 'react-redux';

class MessageBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  };
  
  render() {
    if (!this.props.chat) {
      return <NoMessageView />
    } else {
      return (
        <MessageBoxView
          messages={this.props.chat.messages}
          chatMember={this.props.chatMember}
          chennel={this.props.chennel}
        />
      )
    }
  }
}


function mapStateToProps(state) {
  return {
    chat: state.chat,
  }
}

export default connect(
  mapStateToProps,
  null
)(MessageBox)
