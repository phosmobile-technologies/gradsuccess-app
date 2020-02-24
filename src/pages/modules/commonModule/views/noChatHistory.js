import React, { Component } from "react"
import { Icon } from '@blueprintjs/core';

export default class NoChatHistory extends Component {
  render() {
    return (
      <div className="history-unavailable">
        <Icon icon="chat" iconSize={50} color="#7889a4" />
        <h1>No Chat History</h1>
      </div>
    )
    
  }
}
