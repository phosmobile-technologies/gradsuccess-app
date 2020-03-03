import React, { Component } from "react"
import { Button, Card, Elevation, Divider } from "@blueprintjs/core"
import { navigate } from "gatsby"
import { truncateString } from "./../stringModifiers"
import { connect } from "react-redux"

class AssignSelfPackageView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      packageItem: null,
      packageDetail: null,
      packageUser: null,
    }
  }

  componentDidMount() {
    this.setState({
      packageItem: this.props.packageItem,
      packageDetail: this.props.packageItem.package,
      packageUser: this.props.packageUser,
    })
  }
  render() {
    if (
      this.state.packageItem ||
      this.state.packageDetail ||
      this.state.packageUser
    ) {
      return (
        <div className="assign-self-container">
          <Card interactive={true} elevation={Elevation.ONE}>
            <span>Package type:</span>
            <p>{this.state.packageDetail.package_name}</p>
            <Divider />

            <span>Package creator:</span>
            <p>
              {this.state.packageUser.first_name +
                " " +
                this.state.packageUser.last_name}
            </p>
            <Divider />

            <span>Package turn around time: </span>
            <p>{this.state.packageDetail.turn_around_time}</p>
            <Divider />

            <span>Package summary of interest:</span>
            <p>{truncateString(this.state.packageItem.summary_of_interest, 300)}</p>
            <Divider />
            <br />
            <div className="a-s-btns">
              <Button
                className="bp3-small bp3-intent-success"
                onClick={() => this.props.assignSelfPackage()}
              >
                Assign Self
              </Button>
              <Button
                className="bp3-small bp3-intent-primary"
                onClick={() => {
                  this.props.viewPackage(this.state.packageItem)
                  navigate("/admin/account/dashboard/package/details", {
                    state: {
                      packageItem: this.state.packageItem,
                    },
                  })
                }}
              >
                More details
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

function mapDispatchToProps(dispatch) {
  return {
    viewPackage: packageItem => {
      dispatch({
        type: "VIEW_PACKAGE",
        packageItem,
      })
    },
  }
}
export default connect(
  null,
  mapDispatchToProps
)(AssignSelfPackageView)
