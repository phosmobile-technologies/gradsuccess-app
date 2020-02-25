import React, { Component } from "react"
import PackageDetailsView from "./../views/packageDetailsView"
import { GET_ASSIGN_ASSOCIATE } from "./../../../graphql/queries"
import { Query } from "react-apollo"
import { Spinner } from "@blueprintjs/core"

export default class PackageDetails extends Component {
  constructor(props) {
    super()
    this.state = {
      statusColor: "fff",
      id:null
    }
  }
  componentDidMount() {

    this.setState({
      id: this.props.packageItem.assigned_associate_id,
    })
    const pItem = this.props.packageItem
    let statusIndicator = "#FFD89E"
    if (pItem) {
      switch (pItem.status) {
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
      console.log(pItem);

      this.setState({
        packageIconCharacter: pItem.package.package_name.charAt(0),
        statusColor: statusIndicator,
      })
    }
  }

  render() {
    return (
      <Query
        query={GET_ASSIGN_ASSOCIATE}
        onCompleted={data => {}}
        variables={{
          id: this.state.id || 0,
        }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="loading-logged-user-landing">
                <Spinner
                  className="bp3-intent-success"
                  number={Spinner.SIZE_LARGE}
                />
              </div>
            )
          if (error) return <div>Failed to load data</div>
          return (
             <PackageDetailsView
                  data={this.props.packageItem}
                  packageIconCharacter={this.state.packageIconCharacter}
                  statusColor={this.state.statusColor}
                  assignedAssociate={data.getAsignAssociate}
                />
          )
        }}
      </Query>
    )
  }
}
