import React, { Component } from "react"
import { ALL_ASSOCIATES } from "../../../graphql/queries"
import { Spinner } from "@blueprintjs/core"
import { Query } from "react-apollo"
import { admin_nav_routes } from "../admin_nav_routes.js"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import AssociatesView from './../views/AssociatesView';

class Associates extends Component {
  constructor(props) {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <Query
        query={ALL_ASSOCIATES}
        fetchPolicy="no-cache"
        onCompleted={data => {
          
        }}
        variables={{
          account_type: "Associate",
        }}
      >
        {({ loading, error , data}) => {
          if (loading)
            return (
              <DashboardLayout
                body={
                  <Spinner
                    className="bp3-intent-success"
                    number={Spinner.SIZE_LARGE}
                  />
                }
                routes={admin_nav_routes}
                title="Associates"
              />
            )
          if (error) return <div>Failed to load data</div>
          return (
            <DashboardLayout
              body={<AssociatesView associates={data.getAllAssociates} />}
              routes={admin_nav_routes}
              title="Associates"
            />
          )
        }}
      </Query>
    )
  }
}

export default Associates
