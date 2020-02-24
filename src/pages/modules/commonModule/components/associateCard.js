import React, { Component } from "react"
import AssociateCardView from "./../views/associateCardView"

export default class AssociateCard extends Component {
  render() {
    return (
      <div>
        {" "}
        <AssociateCardView associate={this.props.associate} />{" "}
      </div>
    )
  }
}
