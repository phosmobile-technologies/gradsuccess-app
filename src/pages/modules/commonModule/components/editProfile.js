import React, { Component } from 'react';
import EditProfileView from './../views/editProfileView';
import { connect } from 'react-redux';


class EditProfile extends Component {
  
  render() {
    return (
      <EditProfileView
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
)(EditProfile)

