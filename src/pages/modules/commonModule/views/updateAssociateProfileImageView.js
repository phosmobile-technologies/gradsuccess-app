import React, { Component } from "react"
import defaultImage from "../../../../images/default_profile_img.png"

export default class UpdateAssociateProfileImageView extends Component {
  render() {
    return (
      <div className="profile-img">
        {this.props.imageRef ? (
          <img src={this.props.imageRef} alt="associate profile" />
        ) : (
          <img src={defaultImage} alt="associate profile" />
        )}
      </div>
    )
  }
}
