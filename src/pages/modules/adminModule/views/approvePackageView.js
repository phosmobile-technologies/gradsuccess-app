import React, { Component } from "react"
import { Button, Card, Elevation, Divider, Callout } from "@blueprintjs/core"
import { truncateString } from "./../../commonModule/stringModifiers"
import AssociateCard from "./../../commonModule/components/associateCard"

class ApprovePackageView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      associate: null,
      associateNotSelected: false,
      packageItem: null,
      packageDetail: null,
    }
  }

  handleAssociate = e => {
    this.setState({
      associate: e.target.value,
    })
  }

  componentDidMount() {
    this.setState({
      packageItem: this.props.packageItem,
      packageDetail: this.props.packageItem.package,
      associate: this.props.associate,
    })
  }

  render() {
    if (this.state.packageDetail || this.state.packageItem) {
      return (
        <div className="assign-self-container">
          <Card interactive={true} elevation={Elevation.ONE}>
            {this.state.associateNotSelected && (
              <Callout className="bp3-intent-danger cart-resize">
                <span>No Associate Selected</span>
              </Callout>
            )}
            <span>Package type:</span>
            <p>{this.state.packageDetail.package_name}</p>
            <Divider />
            <span>Package turn around time: </span>
            <p>{this.state.packageDetail.turn_around_time}</p>
            <Divider />
            <span>Package summary of interest:</span>
            <p>
              {truncateString(this.state.packageItem.summary_of_interest, 300)}
            </p>

            <Divider />
            <AssociateCard associate={this.state.associate} />
            <br />
            <div className="a-s-btns">
              <Button
                className="bp3-small bp3-intent-success"
                onClick={() => this.props.approvePackage()}
              >
                Approve Request
              </Button>
              <Button
                className="bp3-small bp3-intent-primary"
                onClick={() => {
                  this.props.setOpenApproveDrawer(false)
                }}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )
    } else {
      return <div></div>
    }

  }
}

export default ApprovePackageView
