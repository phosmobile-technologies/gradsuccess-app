import React, { Component } from "react"
import defaultImage from "../../../../images/default_profile_img.png"

export default class UpdateAssociateProfileImageView extends Component {
  render() {
    return (
      <div className = "profile-img">
        {this.props.imageRef ? (
          <img src={this.props.imageRef} />
        ) : (
          <img src={defaultImage} />
        )}
      </div>
    )


  }
}
