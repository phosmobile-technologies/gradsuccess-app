import React, { Component } from "react"
import { Card, Button, Elevation, Divider } from "@blueprintjs/core"
import { truncateString } from "../../commonModule/stringModifiers"
import { Link } from "gatsby"
import defaultImage from "../../../../images/default_profile_img.png"

export default class AssociateProfileCardView extends Component {
  render() {
    if (this.props.associate) {
      return (
        <Card interactive={true} elevation={Elevation.TWO} className="a-p-card">
          {this.props.associate.details &&
            <>
              {this.props.associate.details.profile_image_ref ? (
                <div className="a-p-img-wrapper">
                  <img src={this.props.associate.details.profile_image_ref} />
                </div>
              ) : (
                <div className="a-p-img-wrapper">
                  <img src={defaultImage} />
                </div>
              )}
            </>
          }
          <p className="name">
            {this.props.associate.first_name +
              " " +
              this.props.associate.last_name}
          </p>
          {this.props.associate.details ? (
            <span className="bio_bait">
              {truncateString(this.props.associate.details.bio_bait, 50)}
            </span>
          ) : (
            <div></div>
          )}
          <Link
            to="/admin/account/dashboard/profile"
            state={{ id: this.props.associate.id }}
          >
            <Button className="bp3-small view-btn">View Profile</Button>
          </Link>
        </Card>
      )
    } else {
      return <div></div>
    }
  }
}
