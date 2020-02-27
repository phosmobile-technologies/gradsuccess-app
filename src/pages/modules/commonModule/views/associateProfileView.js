import React, { Component } from "react"
import FieldSetView from "./FieldSetView"
import pImage from "../../../../images/default_profile_img.png"
export default class AssociateProfileView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
     associate_bio: null,
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.associate,
      associate_bio: this.props.associate.details,
    })
  }

  render() {
    if(this.state.data){
      return (
      <div>
        <div>
          <section className="details-container">
            <div className="details-main">
              {this.state.data.first_name && (
                <FieldSetView
                  title="Name"
                  value={this.state.data.first_name + " " + this.state.data.last_name}
                />
              )}
              {this.state.data.email && <FieldSetView title="Email" value={this.state.data.email} />}
              {this.state.data.phone && <FieldSetView title="Phone" value={this.state.data.phone} />}
              {this.state.associate_bio && (
                <div>
                  {this.state.associate_bio.user_name && (
                    <FieldSetView
                      title="User Name"
                      value={this.state.associate_bio.user_name}
                    />
                  )}
                  {this.state.associate_bio.highest_ranked_university_attended && (
                    <FieldSetView
                      title="Highest Ranked University Attended"
                      value={this.state.associate_bio.highest_ranked_university_attended}
                    />
                  )}
                  {this.state.associate_bio.qualification_at_university && (
                    <FieldSetView
                      title="University Qualifications"
                      value={this.state.associate_bio.qualification_at_university}
                    />
                  )}
                  {this.state.associate_bio.employment && (
                    <FieldSetView
                      title="Employment"
                      value={this.state.associate_bio.employment}
                    />
                  )}
                  {this.state.associate_bio.scholarships_and_awards && (
                    <FieldSetView
                      title="Scholarships And Awards"
                      value={this.state.associate_bio.scholarships_and_awards}
                    />
                  )}

                  {this.state.associate_bio.graduating_grade && (
                    <FieldSetView
                      title="Graduating Grade"
                      value={this.state.associate_bio.graduating_grade}
                    />
                  )}

                  {this.state.associate_bio.gre_score && (
                    <FieldSetView
                      title="GRE Score"
                      value={this.state.associate_bio.gre_score}
                    />
                  )}

                  {this.state.associate_bio.gmat_score && (
                    <FieldSetView
                      title="GMAT Score"
                      value={this.state.associate_bio.gmat_score}
                    />
                  )}

                  {this.state.associate_bio.ielts && (
                    <FieldSetView title="IELTS" value={this.state.associate_bio.ielts} />
                  )}

                  {this.state.associate_bio.university_transcripts && (
                    <FieldSetView
                      title="University Transcripts"
                      value={this.state.associate_bio.university_transcripts}
                    />
                  )}
                  {this.state.associate_bio.bio_bait && (
                    <FieldSetView
                      title="Bio Bait"
                      value={this.state.associate_bio.bio_bait}
                    />
                  )}

                  {this.state.associate_bio.where_client_from && (
                    <FieldSetView
                      title="Where client From"
                      value={this.state.associate_bio.where_client_from}
                    />
                  )}

                  {this.state.associate_bio.what_jobs_client && (
                    <FieldSetView
                      title="Preferred Jobs"
                      value={this.state.associate_bio.what_jobs_client}
                    />
                  )}

                  {this.state.associate_bio.client_reach_you_for && (
                    <FieldSetView
                      title="Client Reach"
                      value={this.state.associate_bio.client_reach_you_for}
                    />
                  )}
                  {this.state.associate_bio.bank_name && (
                    <FieldSetView
                      title="Bank Name"
                      value={this.state.associate_bio.bank_name}
                    />
                  )}
                  {this.state.associate_bio.bank_account_number && (
                    <FieldSetView
                      title="Bank Account"
                      value={this.state.associate_bio.bank_account_number}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="details-side-panel">
              {this.state.associate_bio.profile_image_ref ? (
                <div className="pro-img">
                  <img
                    src={this.state.associate_bio.profile_image_ref}
                    alt={this.state.associate_bio.user_name + " profile image"}
                  />
                </div>
              ) : (
                <div className="pro-img">
                  <img src={pImage} alt="Gradsuccess Default profile" />
                </div>
              )}
              {this.state.data.attached_file !== "empty" ? (
                <div>
                  <br />
                  <a
                    href={this.state.associate_bio.attached_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-attached-file"
                  >
                    View Attached Document
                  </a>
                  <br />
                </div>
              ) : (
                <div className="download-attached-file">
                  No File Attached to this request
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    )
    }else{
      return <div></div>
    }
  }
}
