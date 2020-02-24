import React, { Component } from "react"
import { Callout } from "@blueprintjs/core"

export default class NoMessageView extends Component {
  render() {
    return (
      <div className="chat">
        <div className="messages empty-m" id="chat">
          <div>
            <Callout
              className="bp3-intent-primary"
              icon="folder-open"
              title="Select a Contact "
            >
              <span>Messages sent over this plaform is safe and secured</span>
            </Callout>
          </div>
        </div>
      </div>
    )
  }
}
