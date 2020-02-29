import React, { Component } from "react"
import ChangePasswordView from "./../views/changePasswordView"
import { connect } from "react-redux"

class ChangePassword extends Component {
  render() {
    return (
      <ChangePasswordView
        user={this.props.user}
        redirectLink={this.props.redirectLink}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}
export default connect(
  mapStateToProps,
  null
)(ChangePassword)
