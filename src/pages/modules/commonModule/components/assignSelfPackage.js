import React, { Component } from "react"
import { connect } from "react-redux"
import AssignSelfPackageView from "../views/assignSelfPackageView"
import { Query, Mutation } from "react-apollo"
import { GET_USER } from "../../../graphql/queries"
import { Spinner, Callout } from "@blueprintjs/core"
import {
  ASSIGN_SELF_COVER_LETTER_REVIEW,
  ASSIGN_SELF_GRADUATE_SCHOOL_STATEMENT_REVIEW,
  ASSIGN_SELF_GRADUATE_SCHOOL_ESSAY_REDRAFT,
  ASSIGN_SELF_RESUME_REVIEW,
  ASSIGN_SELF_COVER_LETTER_REDRAFT,
} from "./../../../graphql/mutations"
class AssignSelfPackage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assigned: false,
    }
  }

  assignSelfPackage = () => {
    switch (this.props.packageItem.package.form_type) {
      case "COVER_LETTER_REDRAFT":
        this.assignCoverLetterRedraft.dispatchEvent(new Event("submit"))
        break
      case "COVER_LETTER_REVIEW":
        this.assignCoverLetterReview.dispatchEvent(new Event("submit"))
        break
      case "GRADUATE_SCHOOL_STATEMENT_REVIEW":
        this.assigngraduateShoolStatementReview.dispatchEvent(
          new Event("submit")
        )
        break
      case "GRADUATE_SCHOOL_ESSAY_REDRAFT":
        this.assignGraduateSchoolRedraft.dispatchEvent(new Event("submit"))
        break
      case "RESUME_REVIEW":
        this.assignResumeReview.dispatchEvent(new Event("submit"))
        break
      default:
        break
    }
  }

  assignError = () => {
    this.setState({
      assigned: false,
    })
  }

  processCompleted() {
    window.location.reload()
  }

  render() {
    if (this.props.user) {
      return (
        <>
          {this.state.assigned && (
            <div className="assigned-loader-wrapper">
              <Spinner />
            </div>
          )}
          <Query
            query={GET_USER}
            variables={{
              id: this.props.packageItem.user_id,
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
              return (
                <AssignSelfPackageView
                  packageItem={this.props.packageItem}
                  user={this.props.user}
                  packageUser={data.user}
                  assignSelfPackage={this.assignSelfPackage}
                />
              )
            }}
          </Query>
          <Mutation
            mutation={ASSIGN_SELF_COVER_LETTER_REVIEW}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.props.setOpenAssignSelfDrawer(false)
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(assignSelfCoverLetterReview, { error }) => (
              <div className="loader-wrapper">
                {error && (
                  <Callout
                    className="bp3-intent-danger cart-resize"
                    icon="error"
                  >
                    {error.graphQLErrors.map(({ message }, i) => (
                      <span key={i}>{message}</span>
                    ))}
                  </Callout>
                )}
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    this.setState({ assigned: true })

                    assignSelfCoverLetterReview({
                      variables: {
                        id: this.props.packageItem.id,
                        associate_id: this.props.user.id,
                        status: "Pending",
                      },
                    })
                  }}
                  ref={assignCoverLetterReview =>
                    (this.assignCoverLetterReview = assignCoverLetterReview)
                  }
                  className="checkout-form-container"
                ></form>
              </div>
            )}
          </Mutation>

          <Mutation
            mutation={ASSIGN_SELF_COVER_LETTER_REDRAFT}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.props.setOpenAssignSelfDrawer(false)
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(createCoverLetterRedraftData, { error }) => (
              <div className="loader-wrapper">
                {error && (
                  <Callout
                    className="bp3-intent-danger cart-resize"
                    icon="error"
                  >
                    {error.graphQLErrors.map(({ message }, i) => (
                      <span key={i}>{message}</span>
                    ))}
                  </Callout>
                )}
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    this.setState({ assigned: true })
                    createCoverLetterRedraftData({
                      variables: {
                        id: this.props.packageItem.id,
                        associate_id: this.props.user.id,
                        status: "Pending",
                      },
                    })
                  }}
                  ref={assignCoverLetterRedraft =>
                    (this.assignCoverLetterRedraft = assignCoverLetterRedraft)
                  }
                  className="checkout-form-container"
                ></form>
              </div>
            )}
          </Mutation>

          <Mutation
            mutation={ASSIGN_SELF_GRADUATE_SCHOOL_STATEMENT_REVIEW}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.props.setOpenAssignSelfDrawer(false)
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(createGraduateSchoolStatementData, { error }) => (
              <div className="loader-wrapper">
                {error && (
                  <Callout
                    className="bp3-intent-danger cart-resize"
                    icon="error"
                  >
                    {error.graphQLErrors.map(({ message }, i) => (
                      <span key={i}>{message}</span>
                    ))}
                  </Callout>
                )}
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    this.setState({ assigned: true })
                    createGraduateSchoolStatementData({
                      variables: {
                        id: this.props.packageItem.id,
                        associate_id: this.props.user.id,
                        status: "Pending",
                      },
                    })
                  }}
                  ref={assigngraduateShoolStatementReview =>
                    (this.assigngraduateShoolStatementReview = assigngraduateShoolStatementReview)
                  }
                  className="checkout-form-container"
                ></form>
              </div>
            )}
          </Mutation>

          <Mutation
            mutation={ASSIGN_SELF_GRADUATE_SCHOOL_ESSAY_REDRAFT}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.props.setOpenAssignSelfDrawer(false)
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(createGraduateSchoolRedraftData, { error }) => (
              <div className="loader-wrapper">
                {error && (
                  <Callout
                    className="bp3-intent-danger cart-resize"
                    icon="error"
                  >
                    {error.graphQLErrors.map(({ message }, i) => (
                      <span key={i}>{message}</span>
                    ))}
                  </Callout>
                )}
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    this.setState({ assigned: true })
                    createGraduateSchoolRedraftData({
                      variables: {
                        id: this.props.packageItem.id,
                        associate_id: this.props.user.id,
                        status: "Pending",
                      },
                    })
                  }}
                  ref={assignGraduateSchoolRedraft =>
                    (this.assignGraduateSchoolRedraft = assignGraduateSchoolRedraft)
                  }
                  className="checkout-form-container"
                ></form>
              </div>
            )}
          </Mutation>

          <Mutation
            mutation={ASSIGN_SELF_RESUME_REVIEW}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.props.setOpenAssignSelfDrawer(false)
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(createResumeReview, { error, loading }) => (
              <div className="loader-wrapper">
                {error && (
                  <Callout
                    className="bp3-intent-danger cart-resize"
                    icon="error"
                  >
                    {error.graphQLErrors.map(({ message }, i) => (
                      <span key={i}>{message}</span>
                    ))}
                  </Callout>
                )}
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    this.setState({ assigned: true })
                    createResumeReview({
                      variables: {
                        id: this.props.packageItem.id,
                        associate_id: this.props.user.id,
                        status: "Pending",
                      },
                    })
                  }}
                  ref={assignResumeReview =>
                    (this.assignResumeReview = assignResumeReview)
                  }
                  className="checkout-form-container"
                ></form>
              </div>
            )}
          </Mutation>
        </>
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
)(AssignSelfPackage)
