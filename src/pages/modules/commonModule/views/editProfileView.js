import React, { Component } from "react"
import { Callout, Button } from "@blueprintjs/core"
import SimpleReactValidator from "simple-react-validator"
import {
  UPDATE_USER,
  UPDATE_ASSOCIATE_PROFILE,
} from "./../../../graphql/mutations"
import { Mutation } from "react-apollo"
import { navigate } from "gatsby"
import { connect } from "react-redux"
class EditProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "", // customer email
      first_name: "",
      last_name: "",
      phone: "",
      details: {
        highest_ranked_university_attended: null,
        qualification_at_university: null,
        employment: null,
        scholarships_and_awards: null,
        graduating_grade: null,
        gre_score: null,
        gmat_score: null,
        ielts: null,
        bio_bait: null,
        where_client_from: null,
        what_jobs_client: null,
        client_reach_you_for: null,
        user_name: null,
        bank_account_number: null,
      },

      editSuccess: false,
    }
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
    })
  }

  handleFormInput = event => {
    const { name, value } = event.target
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  componentDidMount() {
    var user = this.props.user
    let details = this.props.user.details
    this.setState(
      {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        details,
      },
      () => {
        console.log(this.state)
      }
    )
  }

  handleDetailsInput = event => {
    const { name, value } = event.target
    this.setState(prevState => ({
      details: {
        ...prevState.details,
        [name]: value,
      },
    }))
  }
  editProfile = () => {
    if (this.validator.allValid()) {
      if (this.state.details) {
        this.detailsForm.dispatchEvent(new Event("submit"))
      } else {
        this.userForm.dispatchEvent(new Event("submit"))
        
      }
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={UPDATE_USER}
          onError={this.error}
          onCompleted={data => {
            this.setState({
              editSuccess: true,
            },()=>{
              this.props.saveUser(data.UpdateUser);
              setTimeout(() => {
                navigate(this.props.redirectLink)
              }, 1000)
            })
          }}
        >
          {(editProfile, { loading, error }) => (
            <div className="p-edit-form-container">
              <form
                className="p-edit-form"
                onSubmit={e => {
                  e.preventDefault()
                  editProfile({
                    variables: {
                      id: this.props.user.id,
                      email: this.state.email, // customer email
                      first_name: this.state.first_name,
                      last_name: this.state.last_name,
                      phone: this.state.phone,
                    },
                  })
                }}
                ref={userForm => (this.userForm = userForm)}
              >
                {this.state.editSuccess && (
                  <Callout className="bp3-intent-success" icon="tick">
                    <span>Profile Updated Successfully</span>
                  </Callout>
                )}

                <div className="c-pwd-i">
                  <div className="input-e-c">
                    <span>Email Address</span>
                    <input
                      type="text"
                      className="bp3-input bp3-large"
                      placeholder="Email Address"
                      id="email"
                      name="email"
                      onChange={this.handleFormInput}
                      value={this.state.email}
                      onBlur={() => this.validator.showMessageFor("email")}
                    />
                    <p className="error_message">
                      <i>
                        {this.validator.message(
                          "email",
                          this.state.email,
                          "required"
                        )}
                      </i>
                    </p>
                  </div>

                  <div className="input-e-c">
                    <span>First Name</span>
                    <input
                      type="text"
                      className="bp3-input bp3-large"
                      placeholder="First Name"
                      id="first_name"
                      name="first_name"
                      onChange={this.handleFormInput}
                      value={this.state.first_name}
                      onBlur={() => this.validator.showMessageFor("first_name")}
                    />
                    <p className="error_message">
                      <i>
                        {this.validator.message(
                          "first_name",
                          this.state.first_name,
                          "required"
                        )}
                      </i>
                    </p>
                  </div>

                  <div className="input-e-c">
                    <span>Last Name</span>
                    <input
                      type="text"
                      className="bp3-input bp3-large "
                      placeholder="Last Name"
                      id="last_name"
                      name="last_name"
                      onChange={this.handleFormInput}
                      value={this.state.last_name}
                      onBlur={() => this.validator.showMessageFor("last_name")}
                    />
                    <p className="error_message">
                      <i>
                        {this.validator.message(
                          "last_name",
                          this.state.last_name,
                          "required"
                        )}
                      </i>
                    </p>
                  </div>

                  <div className="input-e-c">
                    <span>Phone</span>
                    <input
                      type="test"
                      className="bp3-input bp3-large"
                      placeholder="Phone"
                      id="phone"
                      name="phone"
                      onChange={this.handleFormInput}
                      value={this.state.phone}
                      onBlur={() => this.validator.showMessageFor("phone")}
                    />
                    <p className="error_message">
                      <i>
                        {this.validator.message(
                          "phone",
                          this.state.phone,
                          "required"
                        )}
                      </i>
                    </p>
                  </div>
                  {this.state.details && (
                    <div className="e-p-detail-wrapper">
                      <div className="input-e-c">
                        <span>Username</span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="Username"
                          id="user_name"
                          name="user_name"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.user_name}
                          onBlur={() =>
                            this.validator.showMessageFor("user_name")
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "user_name",
                              this.state.details.user_name,
                              "required"
                            )}
                          </i>
                        </p>
                      </div>

                      <div className="input-e-c">
                        <span>Highest Ranked University Attended</span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="Highest Ranked University Attended"
                          id="highest_ranked_university_attended"
                          name="highest_ranked_university_attended"
                          onChange={this.handleDetailsInput}
                          value={
                            this.state.details
                              .highest_ranked_university_attended
                          }
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "highest_ranked_university_attended"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "highest_ranked_university_attended",
                              this.state.details
                                .highest_ranked_university_attended,
                              "required"
                            )}
                          </i>
                        </p>
                      </div>
                      <div className="input-e-c">
                        <span>University Qualification</span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="University Qualification"
                          id="qualification_at_university"
                          name="qualification_at_university"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.qualification_at_university}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "qualification_at_university"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "qualification_at_university",
                              this.state.details.qualification_at_university,
                              "required"
                            )}
                          </i>
                        </p>
                      </div>

                      <div className="input-e-c">
                        <span>Bio Bait </span>
                        <textarea
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="Bio Bait"
                          id="bio_bait"
                          name="bio_bait"
                          onChange={this.handleDetailsInput}
                          onBlur={() =>
                            this.validator.showMessageFor("bio_bait")
                          }
                          value={this.state.details.bio_bait}
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "bio_bait",
                              this.state.details.bio_bait,
                              "required"
                            )}
                          </i>
                        </p>
                      </div>

                      <div className="input-e-c">
                        <span>Where clients have come from </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="Where clients have come from"
                          id="where_client_from"
                          name="where_client_from"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.where_client_from}
                          onBlur={() =>
                            this.validator.showMessageFor("where_client_from")
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "where_client_from",
                              this.state.details.where_client_from,
                              "required"
                            )}
                          </i>
                        </p>
                      </div>

                      <div className="input-e-c">
                        <span>
                          What jobs or opportunities have clients secured{" "}
                        </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="What jobs or opportunities have clients secured"
                          id="what_jobs_client"
                          name="what_jobs_client"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.what_jobs_client}
                          onBlur={() =>
                            this.validator.showMessageFor("what_jobs_client")
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "what_jobs_client",
                              this.state.details.what_jobs_client,
                              "required"
                            )}
                          </i>
                        </p>
                      </div>

                      <div className="input-e-c">
                        <span>What should clients reach you for </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="What should clients reach you for"
                          id="client_reach_you_for"
                          name="client_reach_you_for"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.client_reach_you_for}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "client_reach_you_for"
                            )
                          }
                        />
                      </div>

                      <div className="input-e-c">
                        <span>Employment </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="Employment"
                          id="employment"
                          name="employment"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.employment}
                          onBlur={() =>
                            this.validator.showMessageFor("employment")
                          }
                        />
                      </div>
                      <div className="input-e-c">
                        <span>Scholarships and Awards </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="Scholarships and Awards"
                          id="scholarships_and_awards"
                          name="scholarships_and_awards"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.scholarships_and_awards}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "scholarships_and_awards"
                            )
                          }
                        />
                      </div>

                      <div className="input-e-c">
                        <span>Graduating Grade </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="Graduating Grade"
                          id="graduating_grade"
                          name="graduating_grade"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.graduating_grade}
                          onBlur={() =>
                            this.validator.showMessageFor("graduating_grade")
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "graduating_grade",
                              this.state.details.graduating_grade,
                              "required"
                            )}
                          </i>
                        </p>
                      </div>

                      <div className="input-e-c">
                        <span>GRE Score </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="GRE Score"
                          id="gre_score"
                          name="gre_score"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.gre_score}
                          onBlur={() =>
                            this.validator.showMessageFor("gre_score")
                          }
                        />
                      </div>

                      <div className="input-e-c">
                        <span>GMAT score </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="GMAT score"
                          id="gmat_score"
                          name="gmat_score"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.gmat_score}
                          onBlur={() =>
                            this.validator.showMessageFor("gmat_score")
                          }
                        />
                      </div>

                      <div className="input-e-c">
                        <span>IELTs </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="IELTs"
                          id="ielts"
                          name="ielts"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.ielts}
                          onBlur={() => this.validator.showMessageFor("ielts")}
                        />
                      </div>

                      <div className="input-e-c">
                        <span>Bank Name </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="Bank Name"
                          id="bank_name"
                          name="bank_name"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.bank_name}
                          onBlur={() =>
                            this.validator.showMessageFor("bank_name")
                          }
                        />
                      </div>

                      <div className="input-e-c">
                        <span>Bank Account Number </span>
                        <input
                          type="test"
                          className="bp3-input bp3-large"
                          placeholder="Bank Account Number"
                          id="bank_account_number"
                          name="bank_account_number"
                          onChange={this.handleDetailsInput}
                          value={this.state.details.bank_account_number}
                          onBlur={() =>
                            this.validator.showMessageFor("bank_account_number")
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="c-pwd-btn">
                  <Button
                    type="button"
                    className="bp3-intent-success bp3-large"
                    loading={loading ? true : false}
                    onClick={this.editProfile}
                  >
                    Save changes
                  </Button>
                </div>
              </form>
              {error && (
                <Callout className="bp3-intent-danger pwd-callout" icon="error">
                  {error.graphQLErrors.map(({ message }, i) => (
                    <span key={i}>{message}</span>
                  ))}
                </Callout>
              )}
            </div>
          )}
        </Mutation>

        <Mutation
          mutation={UPDATE_ASSOCIATE_PROFILE}
          onCompleted={data => {
           this.userForm.dispatchEvent(new Event("submit"))
          }}
          onError={error => {
            alert(error)
          }}
        >
          {(createAssociateProfile, { error }) => (
            <div className="loader-wrapper">
              {error && (
                <Callout className="bp3-intent-danger cart-resize" icon="error">
                  {error.graphQLErrors.map(({ message }, i) => (
                    <span key={i}>{message}</span>
                  ))}
                </Callout>
              )}
              <form
                onSubmit={e => {
                  e.preventDefault()
                  createAssociateProfile({
                    variables: {
                      id: this.state.details.id,
                      highest_ranked_university_attended: this.state.details
                        .highest_ranked_university_attended,
                      qualification_at_university: this.state.details
                        .qualification_at_university,
                      employment: this.state.details.employment,
                      scholarships_and_awards: this.state.details
                        .scholarships_and_awards,
                      graduating_grade: this.state.details.graduating_grade,
                      gre_score: this.state.details.gre_score,
                      gmat_score: this.state.details.gmat_score,
                      ielts: this.state.details.ielts,
                      bio_bait: this.state.details.bio_bait,
                      where_client_from: this.state.details.where_client_from,
                      what_jobs_client: this.state.details.what_jobs_client,
                      client_reach_you_for: this.state.details
                        .client_reach_you_for,
                      user_name: this.state.details.user_name,
                      bank_account_number: this.state.details
                        .bank_account_number,
                      bank_name: this.state.details.bank_name,
                    },
                  })
                }}
                ref={detailsForm => (this.detailsForm = detailsForm)}
                className="checkout-form-container"
              ></form>
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUser: user => {
      dispatch({
        type: "SAVE_LOGGEDIN_USER",
        user,
      })
    },
  }
}
export default connect(
  null,
  mapDispatchToProps
)(EditProfileView)
