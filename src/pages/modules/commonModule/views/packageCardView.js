import React, { Component } from "react"
import { Card, Button, Elevation, Divider } from "@blueprintjs/core"
import { Link } from "gatsby"
import { truncateString } from "./../stringModifiers"
import { connect } from "react-redux"

class PackageCardView extends Component {
  render() {
    let _date
    if (this.props.data) {
      _date = new Date(this.props.data.created_at).toDateString()
    }

    if (this.props.data) {
      return (
        <Card interactive={true} elevation={Elevation.TWO}>
          <div
            className="package-icon"
            style={{ backgroundColor: this.props.statusColor }}
          >
            {this.props.packageIconCharacter}
          </div>
          <h5 className="package-title">
            {this.props.data.package.package_name}
          </h5>
          <div className="status-container">
            Status:{" "}
            <span style={{ color: this.props.statusColor }}>
              {this.props.data.status}
            </span>
          </div>
          <Divider />
          <p className="card-body">
            {truncateString(this.props.data.summary_of_interest, 150)}
          </p>
          <p className="date-sec">{_date}</p>
          <Link
            to="/user/account/dashboard/package/details"
            state={{ packageItem: this.props.data }}
          >
            <Button className="bp3-small view-btn" onClick = {()=>{
              this.props.viewPackage(this.props.data)
            }}>View</Button>
          </Link>
        </Card>
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
)(PackageCardView)