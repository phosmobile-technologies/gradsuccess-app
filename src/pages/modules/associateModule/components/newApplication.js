import React, { Component } from "react"
import AssociateNewApplicationView from "../views/newApplicationView"
import { COMBINED_PACKAGE_QUERY_BY_STATUS } from "../../../graphql/queries"
import { Spinner } from "@blueprintjs/core"
import { Query } from "react-apollo"

export default class AssociateNewApplication extends Component {
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
          status: "New",
        }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Spinner
                className="bp3-intent-success"
                number={Spinner.SIZE_LARGE}
              />
            )
          if (error) return <div>Failed to load data</div>
          return <AssociateNewApplicationView data={this.state.newPackages} />
        }}
      </Query>
    )
  }
}
