import React, { Component } from "react"
import { connect } from "react-redux"
import { Query, Mutation } from "react-apollo"
import { Spinner, Callout } from "@blueprintjs/core"
import {
  MARK_COVER_LETTER_REVIEW_COMPLETED,
  MARK_GRADUATE_SCHOOL_STATEMENT_REVIEW_COMPLETED,
  MARK_GRADUATE_SCHOOL_ESSAY_REDRAFT_COMPLETED,
  MARK_RESUME_REVIEW_COMPLETED,
  MARK_COVER_LETTER_REDRAFT_COMPLETED,
} from "../../../graphql/mutations"
import MarkPackageCompletedView from "../views/markPackageCompletedView"
import { LOGGED_IN_USER } from "./../../../graphql/queries"
import { navigate } from "gatsby"

class MarkPackageCompleted extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assigned: false,
      associate_id: null,
      completed: false,
    }
  }

  markPackageCompleted = associate_id => {
    this.setState(
      {
        associate_id,
      },
      () => {
        switch (this.props.data.package.form_type) {
          case "COVER_LETTER_REDRAFT":
            this.markCoverLetterRedraftCompleted.dispatchEvent(
              new Event("submit")
            )
            break
          case "COVER_LETTER_REVIEW":
            this.markCoverLetterReviewCompleted.dispatchEvent(
              new Event("submit")
            )
            break
          case "GRADUATE_SCHOOL_STATEMENT_REVIEW":
            this.markGraduateShoolStatementReviewCompleted.dispatchEvent(
              new Event("submit")
            )
            break
          case "GRADUATE_SCHOOL_ESSAY_REDRAFT":
            this.markGraduateSchoolRedraftCompleted.dispatchEvent(
              new Event("submit")
            )
            break
          case "RESUME_REVIEW":
            this.markResumeReviewCompleted.dispatchEvent(new Event("submit"))
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

  processCompleted = () => {
    this.setState({
      completed: true,
    })
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
          <MarkPackageCompletedView
            user={this.props.user}
            data={this.props.data}
            markPackageCompleted={this.markPackageCompleted}
          />
          <Mutation
            mutation={MARK_COVER_LETTER_REVIEW_COMPLETED}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(assignSelfCoverLetterReview, { error }) => (
              <div>
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
                        id: this.props.data.id,
                        associate_id: this.props.data.assigned_associate_id,
                        status: "Completed",
                      },
                    })
                  }}
                  ref={markCoverLetterReviewCompleted =>
                    (this.markCoverLetterReviewCompleted = markCoverLetterReviewCompleted)
                  }
                  className="i-form"
                ></form>
              </div>
            )}
          </Mutation>

          <Mutation
            mutation={MARK_COVER_LETTER_REDRAFT_COMPLETED}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(createCoverLetterRedraftData, { error }) => (
              <div>
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
                        id: this.props.data.id,
                        associate_id: this.props.data.assigned_associate_id,
                        status: "Completed",
                      },
                    })
                  }}
                  ref={markCoverLetterRedraftCompleted =>
                    (this.markCoverLetterRedraftCompleted = markCoverLetterRedraftCompleted)
                  }
                  className="i-form"
                ></form>
              </div>
            )}
          </Mutation>

          <Mutation
            mutation={MARK_GRADUATE_SCHOOL_STATEMENT_REVIEW_COMPLETED}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(createGraduateSchoolStatementData, { error }) => (
              <div>
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
                        id: this.props.data.id,
                        associate_id: this.props.data.assigned_associate_id,
                        status: "Completed",
                      },
                    })
                  }}
                  ref={markGraduateShoolStatementReviewCompleted =>
                    (this.markGraduateShoolStatementReviewCompleted = markGraduateShoolStatementReviewCompleted)
                  }
                  className="i-form"
                ></form>
              </div>
            )}
          </Mutation>

          <Mutation
            mutation={MARK_GRADUATE_SCHOOL_ESSAY_REDRAFT_COMPLETED}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(createGraduateSchoolRedraftData, { error }) => (
              <div>
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
                        id: this.props.data.id,
                        associate_id: this.props.data.assigned_associate_id,
                        status: "Completed",
                      },
                    })
                  }}
                  ref={markGraduateSchoolRedraftCompleted =>
                    (this.markGraduateSchoolRedraftCompleted = markGraduateSchoolRedraftCompleted)
                  }
                  className="i-form"
                ></form>
              </div>
            )}
          </Mutation>

          <Mutation
            mutation={MARK_RESUME_REVIEW_COMPLETED}
            onCompleted={data => {
              this.setState({ assigned: false })
              this.processCompleted()
            }}
            onError={() => {
              this.assignError()
            }}
          >
            {(createResumeReview, { error, loading }) => (
              <div>
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
                        id: this.props.data.id,
                        associate_id: this.props.data.assigned_associate_id,
                        status: "Completed",
                      },
                    })
                  }}
                  ref={markResumeReviewCompleted =>
                    (this.markResumeReviewCompleted = markResumeReviewCompleted)
                  }
                  className="i-form"
                ></form>
              </div>
            )}
          </Mutation>
          {this.state.completed && (
            <RefetchUserData
              saveUpdatedUserDetail={this.props.saveUpdatedUserDetail}
            />
          )}
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

function mapDispatchToProps(dispatch) {
  return {
    saveUpdatedUserDetail: data => {
      dispatch({
        type: "SAVE_USER_DETAILS",
        data,
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkPackageCompleted)

const RefetchUserData = ({ saveUpdatedUserDetail }) => (
  <Query
    query={LOGGED_IN_USER}
    fetchPolicy="no-cache"
    onCompleted={data => {
      saveUpdatedUserDetail(data.me)
      setTimeout(() => {
        navigate("/user/account/dashboard")
      }, 1000)
    }}
  >
    {({ data, loading, error }) => {
      if (loading) return <div></div>
      if (error) return "Failed to load"
      return (
        <Callout className="bp3-intent-success">
          <span>Package Completed</span>
        </Callout>
      )
    }}
  </Query>
)
