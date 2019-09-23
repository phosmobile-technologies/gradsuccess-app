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
                        first_name:basicDetail.first_name,
                        last_name:basicDetail.last_name,
                        phone:basicDetail.phone,
                        form_id:basicDetail.form_id,
                        package:basicDetail.app_package,
                        email:basicDetail.email,
                        password:basicDetail.password,
                        account_type:basicDetail.account_type
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
                      <li className="second-step">
                        <h3>4</h3>
                        <p>Summary</p>
                      </li>
                    </ul>
                  </div>
                  <h1>Basic Details</h1>
                  <div className="row-full">
                    <div className="col">
                      <div className="summary-profile-image">
                        <img src={profileImage.file} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div>
                        <label>First Name</label>
                        <p>{basicDetail.first_name}</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label>Last Name</label>
                        <p>{basicDetail.last_name}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <label>Phone</label>
                        <p>{basicDetail.phone}</p>
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <label>Email</label>
                        <p>{basicDetail.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="row-full">
                    <h1>Educational Information</h1>
                    <div className="row">
                      <div className="col">
                        <div>
                          <label>Highest Ranked University Attended</label>
                          <p>
                            {
                              educationalDetail.highest_ranked_university_attended
                            }
                          </p>
                        </div>
                      </div>
                      <div className="col">
                        <div>
                          <div>
                            <label>University Qualification</label>
                            <p>
                              {educationalDetail.qualification_at_university}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div>
                        <div>
                          <label>Employment</label>
                          <p>{educationalDetail.employment}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div>
                          <label>Scholarships and Awards</label>
                          <p>{educationalDetail.scholarships_and_awards}</p>
                        </div>
                      </div>

                      <div>
                        <div>
                          <label>Graduating Grade</label>
                          <p>{educationalDetail.graduating_grade}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div>
                          <label>GRE Score</label>
                          <p>{educationalDetail.gre_score}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div>
                          <label>GMAT score</label>
                          <p>{educationalDetail.gmat_score}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div>
                          <label>IELTs</label>
                          <p>{educationalDetail.ielts}</p>
                        </div>
                      </div>

                      <div className="col">
                        <div>
                          <label>University Transcript</label>
                          <p>{educationalDetail.uni_transcript}</p>
                        </div>
                      </div>
                      <div className="col">
                        <div>
                          <label>Curicullum Vitae</label>
                          <p>{educationalDetail.cv}</p>
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
                {loading && (
                  <div className="loader">
                    <img
                      className="loader-img"
                      src={loader}
                      alt="gradsuccess"
                    />
                  </div>
                )}
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
