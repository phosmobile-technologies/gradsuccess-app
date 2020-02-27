import React, { Component } from "react"
import AssociateProfileCardView from "./associateProfileCardView"

export default class AssociatesView extends Component {
  render() {
    if (this.props.associates) {
      return (
        <div className = "a-p-container">
          {this.props.associates.map(associate => {
            return <AssociateProfileCardView associate={associate} />
          })}
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
