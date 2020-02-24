import React from "react"
import { Mutation } from "react-apollo"
import { LOGOUT } from "../../../../graphql/mutations"
import { AUTH_TOKEN } from "../../../../../apollo/constants"
import { Button } from "@blueprintjs/core"
import { navigate } from "gatsby"
import { connect } from "react-redux"

class Logout extends React.Component {
  render() {
    return (
      <div>
        <Mutation
          mutation={LOGOUT}
          onError={this.error}
          onCompleted={data => {
            localStorage.removeItem(AUTH_TOKEN)
            this.props.logoutUser(null)
            if (!this.props.handleCloseModal) {
              navigate("/")
            } else {
              window.location.reload()
            }
          }}
        >
          {(logoutForm, { data }) => (
            <form
              onSubmit={e => {
                e.preventDefault()
                this.props.setLoadingsState()
                logoutForm()
              }}
            >
              <Button
                type="submit"
                className="bp3-button bp3-intent-success"
                minimal={true}
                large={true}
              >
                {this.props.text}
              </Button>
            </form>
          )}
        </Mutation>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: data => {
      dispatch({
        type: "RESET_USER",
        data,
      })
    },
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Logout)
