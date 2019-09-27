import React from "react"
import { Mutation } from "react-apollo"
import { CREATE_CLIENT_ACCOUNT } from "../../graphql/mutations"
import loader from "../../../images/loader.gif"

export default class ExpertBasicInfo extends React.Component {
  render() {
    const {
      profileImage,
      basicDetail,
      educationalDetail,
      prevStep,
      formSubmitted,
    } = this.props
    return (
      <div>
        <h3 className="form-header expert-form-header">Apply As Expert</h3>
        <div className="expert-form">
          <Mutation
            mutation={CREATE_CLIENT_ACCOUNT}
            onError={this.error}
            onCompleted={data => {
              formSubmitted(data)
            }}
          >
            {(createExpertAccount, { data, loading, error }) => (
              <div className="loader-wrapper">
                <div id="submittedSucces" className="SuccessTagForm">
                  Success! Account Create Successfully...
                </div>
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    createExpertAccount({
                      variables: {
                        first_name: this.props.first_name,
                        last_name: this.props.last_name,
                        phone: this.props.phone,
                        form_id: this.props.form_id,
                        package: this.props.app_package,
                        email: this.props.email,
                        password: this.props.password,
                        account_type: this.props.account_type,
                      },
                    })
                  }}
                  className="checkout-form-container"
                  className="checkout-form-container expert-summary"
                >
                  <div className="multi-step-wrapper">
                    <ul>
                      <li className="first-step-filled">
                        <h3>1</h3>
                        <p>Associate Detail</p>
                      </li>

                      <li className="first-step-filled">
                        <h3>2</h3>
                        <p>Educational Background</p>
                      </li>
                      <li className="first-step-filled">
                        <h3>3</h3>
                        <p>Profile Image</p>
                      </li>
                      <li className="first-step-filled">
                        <h3>4</h3>
                        <p>Bio Format</p>
                      </li>
                      <li className="second-step">
                        <h3>5</h3>
                        <p>Summary</p>
                      </li>
                    </ul>
                  </div>
                  <h1>Basic Details</h1>
                  <div className="row-full">
                    <div className="col">
                      <div className="summary-profile-image">
                        <img src={this.props.file} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div>
                        <label>First Name</label>
                        <p>{this.props.first_name}</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label>Last Name</label>
                        <p>{this.props.last_name}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <label>Phone</label>
                        <p>{this.props.phone}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <label>Email</label>
                        <p>{this.props.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="row-full">
                    <h1>Educational Information</h1>
                    <div className="row">
                      <div className="col">
                        <div>
                          <label>Highest Ranked University Attended</label>
                          <p>{this.props.highest_ranked_university_attended}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div>
                          <div>
                            <label>University Qualification</label>
                            <p>{this.props.qualification_at_university}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div>
                        <div>
                          <label>Bait ( Short description of bio):</label>
                          <p>{this.props.bio_bait}</p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <label>Where clients have come from:</label>
                          <p>{this.props.where_client_from}</p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <label>
                            What jobs or opportunities have clients secured:
                          </label>
                          <p>{this.props.what_jobs_client}</p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <label>What should clients reach you for?</label>
                          <p>{this.props.client_reach_you_for}</p>
                        </div>
                      </div>

                      <div>
                        <div>
                          <label>Employment</label>
                          <p>{this.props.employment}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div>
                          <label>Scholarships and Awards</label>
                          <p>{this.props.scholarships_and_awards}</p>
                        </div>
                      </div>

                      <div>
                        <div>
                          <label>Graduating Grade</label>
                          <p>{this.props.graduating_grade}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div>
                          <label>GRE Score</label>
                          <p>{this.props.gre_score}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div>
                          <label>GMAT score</label>
                          <p>{this.props.gmat_score}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div>
                          <label>IELTs</label>
                          <p>{this.props.ielts}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div>
                          <label>University Transcript</label>
                          <p>{this.props.uni_transcript}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div>
                          <label>Curicullum Vitae</label>
                          <p>{this.props.cv}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                  <div>
                    <input
                      type="button"
                      className="submit-details-next"
                      value="Previous"
                      onClick={prevStep}
                    />
                    <input
                      type="submit"
                      className="submit-details-prev"
                      value="Submit"
                    />
                  </div>
                </form>
                {loading && <div></div>}
                {error && (
                  <div className="FailedTagForm"> Email already Exists</div>
                )}
              </div>
            )}
          </Mutation>
        </div>
      </div>
    )
  }
}
