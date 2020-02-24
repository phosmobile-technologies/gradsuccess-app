import React, { Component } from "react"
import { COMBINED_PACKAGE_QUERY_BY_STATUS } from "../../../graphql/queries"
import { Spinner } from "@blueprintjs/core"
import { Query } from "react-apollo"
import { admin_nav_routes } from "../admin_nav_routes.js"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"
import AdminAssignApplicationView from "./../views/assignApplicationView"

class AdminCompletedApplication extends Component {
  constructor(props) {
    super()
    this.state = {
      newPackages: [],
    }
  }

  render() {
    return (
      <Query
        query={COMBINED_PACKAGE_QUERY_BY_STATUS}
        fetchPolicy="no-cache"
        onCompleted={data => {
          let newPackages = this.state.newPackages
            .concat(
              data.getCoverLetterReviewByStatus,
              data.getGraduateSchoolStatementReviewByStatus,
              data.getCoverLetterRedraftByStatus,
              data.getGraduateSchoolEssayRedraftByStatus,
              data.getResumeReviewByStatus
            )
            .sort(function(a, b) {
              var created_at_a = a.created_at,
                created_at_b = b.created_at
              if (created_at_a < created_at_b)
                //sort string ascending
                return 1
              if (created_at_a > created_at_b) return 1 * -1
              return 0 //default return value (no sorting)
            })
          this.setState({
            newPackages: newPackages,
          })
        }}
        variables={{
          status: "Completed",
        }}
      >
        {({ loading, error }) => {
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
                title="Completed Applications"
              />
            )
          if (error) return <div>Failed to load data</div>
          return (
            <DashboardLayout
              body={
                <AdminAssignApplicationView data={this.state.newPackages} />
              }
              routes={admin_nav_routes}
              title="Completed Applications"
            />
          )
        }}
      </Query>
    )
  }
}

export default AdminCompletedApplication
