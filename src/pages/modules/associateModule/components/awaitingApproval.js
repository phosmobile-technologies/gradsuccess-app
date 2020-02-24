import React, { Component } from "react"
import { COMBINED_PACKAGE_QUERY_BY_STATUS_FOR_ASSOCIATE } from "../../../graphql/queries"
import { Spinner } from "@blueprintjs/core"
import { Query } from "react-apollo"
import { connect } from "react-redux"
import AssociateAwaitingApprovalView from "./../views/awaitingApprovalView"
import { associate_nav_routes } from "../associate_nav_routes.js"
import DashboardLayout from "./../../commonModule/components/dashboardLayout"

class AssociateAwaitingApplication extends Component {
  constructor(props) {
    super()
    this.state = {
      newPackages: [],
    }
  }

  render() {
    if (this.props.user) {
      return (
        <Query
          query={COMBINED_PACKAGE_QUERY_BY_STATUS_FOR_ASSOCIATE}
          fetchPolicy="no-cache"
          onCompleted={data => {
            let newPackages = this.state.newPackages
              .concat(
                data.getAssociateCoverLetterReviewByStatus,
                data.getAssociateGraduateSchoolStatementReviewByStatus,
                data.getAssociateCoverLetterRedraftByStatus,
                data.getAssociateGraduateSchoolEssayRedraftByStatus,
                data.getAssociateResumeReviewByStatus
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
            status: "Pending",
            associate_id: this.props.user.id,
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
                  routes={associate_nav_routes}
                  title="Awaiting Approval Applications"
                />
              )
            if (error) return <div>Failed to load data</div>
            return (
              <DashboardLayout
                body={
                  <AssociateAwaitingApprovalView
                    data={this.state.newPackages}
                  />
                }
                routes={associate_nav_routes}
                title="Awaiting Approval Applications"
              />
            )
          }}
        </Query>
      )
    } else {
      return <div></div>
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.loggedInUser,
  }
}

export default connect(
  mapStateToProps,
  null
)(AssociateAwaitingApplication)
