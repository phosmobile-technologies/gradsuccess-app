import React, { Component } from "react"
import Table from './../../commonModule/components/Table';

export default class AssociateAssignApplicationView extends Component {
  render() {
    if (this.props.data) {
      return <Table data={this.props.data} />
    } else {
      return <div></div>
    }
  }
}
