import React, { Component } from "react"
import PackageCardView from "./../views/packageCardView"

class PackageCard extends Component {
  constructor(props) {
    super()
    this.state = {
      packageIconCharacter: null,
      statusColor: "fff",
    }
  }
  componentDidMount() {
    let statusIndicator = "#FFD89E"
    if (this.props.packageItem) {
      switch (this.props.packageItem.status) {
        case "Assigned":
          statusIndicator = "#C97900"
          break
        case "Pending":
          statusIndicator = "#00D3FF"
          break
        case "Completed":
          statusIndicator = "#56AC00"
          break
        default:
          statusIndicator = "#FFD89E"
          break
      }

      this.setState({
        packageIconCharacter: this.props.packageItem.package.package_name.charAt(
          0
        ),
        statusColor: statusIndicator,
      })
    }
  }

  render() {
    return (
      <PackageCardView
        data={this.props.packageItem}
        packageIconCharacter={this.state.packageIconCharacter}
        statusColor={this.state.statusColor}
      />
    )
  }
}

export default PackageCard
