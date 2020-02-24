import React, { Component } from "react"
import { connect } from "react-redux"
import { Query, Mutation } from "react-apollo"
import {ALL_ASSOCIATES } from "../../../graphql/queries"
import { Spinner, Callout } from "@blueprintjs/core"
import {
  ASSIGN_ASSOCIATE_COVER_LETTER_REVIEW,
  ASSIGN_ASSOCIATE_GRADUATE_SCHOOL_STATEMENT_REVIEW,
  ASSIGN_ASSOCIATE_GRADUATE_SCHOOL_ESSAY_REDRAFT,
  ASSIGN_ASSOCIATE_RESUME_REVIEW,
  ASSIGN_ASSOCIATE_COVER_LETTER_REDRAFT,
} from "../../../graphql/mutations"
import AssignAssociatePackageView from "../views/assignAssociatePackageView"

class AssignAssociatePackage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assigned: false,
      associate_id: null,
    }
  }

  assignAssociatePackage = associate_id => {
    console.log(this.props.packageItem.package.form_type)
    this.setState(
      {
        associate_id,
      },
      () => {
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
    )
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
    return (
      <>
        {this.state.assigned && (
          <div className="assigned-loader-wrapper">
            <Spinner />
          </div>
        )}
        <Query
          query={ALL_ASSOCIATES}
          variables={{
            account_type: "Associate",
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
              <AssignAssociatePackageView
                packageItem={this.props.packageItem}
                user={this.props.user}
                associates={data.getAllAssociates}
                assignAssociatePackage={this.assignAssociatePackage}
              />
            )
          }}
        </Query>
        <Mutation
          mutation={ASSIGN_ASSOCIATE_COVER_LETTER_REVIEW}
          onCompleted={data => {
            this.setState({ assigned: false })
            this.props.setOpenAssignAssociateDrawer(false)
            this.processCompleted()
          }}

          onError={() => {
            this.assignError()
          }}
        >
          {(assignSelfCoverLetterReview, { error }) => (
            <div className="loader-wrapper">
              {error && (
                <Callout className="bp3-intent-danger cart-resize" icon="error">
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
                      associate_id: this.state.associate_id,
                      status: "Assigned",
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
          mutation={ASSIGN_ASSOCIATE_COVER_LETTER_REDRAFT}
          onCompleted={data => {
            this.setState({ assigned: false })
            this.props.setOpenAssignAssociateDrawer(false)
            this.processCompleted()
          }}

          onError={() => {
            this.assignError()
          }}
        >
          {(createCoverLetterRedraftData, { error }) => (
            <div className="loader-wrapper">
              {error && (
                <Callout className="bp3-intent-danger cart-resize" icon="error">
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
                      associate_id: this.state.associate_id,
                      status: "Assigned",
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
          mutation={ASSIGN_ASSOCIATE_GRADUATE_SCHOOL_STATEMENT_REVIEW}
          onCompleted={data => {
            this.setState({ assigned: false })
            this.props.setOpenAssignAssociateDrawer(false)
            this.processCompleted()
          }}

          onError={() => {
            this.assignError()
          }}
        >
          {(createGraduateSchoolStatementData, { error }) => (
            <div className="loader-wrapper">
              {error && (
                <Callout className="bp3-intent-danger cart-resize" icon="error">
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
                      associate_id: this.state.associate_id,
                      status: "Assigned",
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
          mutation={ASSIGN_ASSOCIATE_GRADUATE_SCHOOL_ESSAY_REDRAFT}
          onCompleted={data => {
            this.setState({ assigned: false })
            this.props.setOpenAssignAssociateDrawer(false)
            this.processCompleted()
          }}

          onError={() => {
            this.assignError()
          }}
        >
          {(createGraduateSchoolRedraftData, { error }) => (
            <div className="loader-wrapper">
              {error && (
                <Callout className="bp3-intent-danger cart-resize" icon="error">
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
                      associate_id: this.state.associate_id,
                      status: "Assigned",
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
          mutation={ASSIGN_ASSOCIATE_RESUME_REVIEW}
          onCompleted={data => {
            this.setState({ assigned: false })
            this.props.setOpenAssignAssociateDrawer(false)
            this.processCompleted()
          }}

          onError={() => {
            this.assignError()
          }}
        >
          {(createResumeReview, { error, loading }) => (
            <div className="loader-wrapper">
              {error && (
                <Callout className="bp3-intent-danger cart-resize" icon="error">
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
                      associate_id: this.state.associate_id,
                      status: "Assigned",
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
)(AssignAssociatePackage)
