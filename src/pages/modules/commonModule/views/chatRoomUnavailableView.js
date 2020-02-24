import React, { Component } from "react"
import { Icon } from "@blueprintjs/core"

export default class ChatRoomUnavailableView extends Component {
  render() {
    return (
      <div className="c-unavailable">
        <Icon icon="chat" iconSize={100} color="#7889a4" />
        <h1>Chat Not Activated</h1>
      </div>
    )
  }
}
