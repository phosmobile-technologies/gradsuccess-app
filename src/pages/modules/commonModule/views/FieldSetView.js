import React, { Component } from "react"

export default class FieldSetView extends Component {
  render() {
    return (
      <div className="field-set">
        <h3>{this.props.title}</h3>
        <p>{this.props.value}</p>
      </div>
    )
  }
}
