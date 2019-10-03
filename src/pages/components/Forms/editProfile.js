import React from "react"
import { Mutation } from "react-apollo"
import { UPDATE_CLIENT_ACCOUNT } from "../../graphql/mutations"
import loader from "../../../images/loader.gif"
import { Query } from "react-apollo";
import { GET_EXPERT_DETAIL } from "../../graphql/queries"
import { UPDATE_EXPERT_DETAILS } from "../../../api/sendMailEndpoint"

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data:{
           id:this.props.id,
           first_name:this.props.first_name,
           last_name:this.props.last_name,
           email:this.props.email,
           phone:this.props.phone,
      },
      password_verified: true,
      account_created: false,
      moredetails:"",
      educational_details: {
        expert_id: "",
        highest_ranked_university_attended: "",
        qualification_at_university: "",
        employment: "",
        scholarships_and_awards: "",
        graduating_grade: "",
        gre_score: "",
        gmat_score: "",
        ielts: "",
        university_transcripts: "",
        curriculum_vitae: ""
      },
      admin:false
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.updateExpertsDetails = this.updateExpertsDetails.bind(this)
    this.handleFormAssociateEducationalInfo = this.handleFormAssociateEducationalInfo.bind(this)
  }

  handleFormInput(event) {
    const { name, value } = event.target
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }))

  }

  updateExpertsDetails(id) {
    let url = UPDATE_EXPERT_DETAILS
    let data = {
      expert_id: id,
      highest_ranked_university_attended: this.state
        .educational_details
        .highest_ranked_university_attended,
      qualification_at_university: this.state
        .educational_details.qualification_at_university,
      employment: this.state.educational_details.employment,
      scholarships_and_awards: this.state.educational_details
        .scholarships_and_awards,
      graduating_grade: this.state.educational_details
        .graduating_grade,
      gre_score: this.state.educational_details.gre_score,
      gmat_score: this.state.educational_details.gmat_score,
      ielts: this.state.educational_details.ielts,
      university_transcripts: this.state.educational_details.university_transcripts,
      curriculum_vitae: this.state.educational_details.curriculum_vitae,
      bio_bait: this.state.educational_details.bio_bait,
      where_client_from: this.state.educational_details.where_client_from,
      what_jobs_client: this.state.educational_details.what_jobs_client,
      client_reach_you_for: this.state.educational_details.client_reach_you_for
    }
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "post",
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.text()
      })
      .then(text => {
        window.location.reload();
      })
      .catch(function (error) {
        alert("Networks Error please try again, Later!")
      })

  }

   handleFormAssociateEducationalInfo(event) {
    const { name, value } = event.target
    this.setState(prevState => ({
      educational_details: {
        ...prevState.educational_details,
        [name]: value,
      },
    }))

  }

  formSubmitted(data) {
    this.setState({
         account_created:true
    })

    if(this.state.admin){

    }else{
      this.updateExpertsDetails(this.state.data.id)
    }
    
    setTimeout(function() {
      window.location.reload()
    }, 2000)
  }




  render() {
    if (this.state.account_created) {
      return (
        <div>
          <div className="account-updated">
            <div >
              <h1>
                Account Updated <i>!</i>
              </h1>
              <div>
                <p>Your Account was successfully updated </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )
    } else {
      
      return (
        <div>
          <Query
            query={GET_EXPERT_DETAIL}
            variables={{ expert_id: this.props.id }}
            onCompleted={data => {
              if (data.getExpertDetail !== null) {
                this.setState({
                  educational_details: {
                    expert_id: data.getExpertDetail.expert_id,
                    highest_ranked_university_attended:
                      data.getExpertDetail.highest_ranked_university_attended,
                    qualification_at_university:
                      data.getExpertDetail.qualification_at_university,
                    employment: data.getExpertDetail.employment,
                    scholarships_and_awards:
                      data.getExpertDetail.scholarships_and_awards,
                    graduating_grade: data.getExpertDetail.graduating_grade,
                    gre_score: data.getExpertDetail.gre_score,
                    gmat_score: data.getExpertDetail.gmat_score,
                    ielts: data.getExpertDetail.ielts,
                    university_transcripts:
                      data.getExpertDetail.university_transcripts,
                    curriculum_vitae: data.getExpertDetail.curriculum_vitae,
                    bio_bait: data.getExpertDetail.bio_bait,
                    where_client_from: data.getExpertDetail.where_client_from,
                    what_jobs_client: data.getExpertDetail.what_jobs_client,
                    client_reach_you_for:
                      data.getExpertDetail.client_reach_you_for,
                  },
                })
              } else {
                this.setState({
                    admin:true
                })
              }
            }}
          >
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <div className="loader">
                    <div className="loader_main_content">
                      <img src={loader} alt="gradsuccess" />
                      <h1>just a moment...</h1>
                    </div>
                  </div>
                )
              if (error) return <div>failed to load data</div>
              return <div></div>
            }}
          </Query>

          <div className="expert-form expert-form-extend">
            <Mutation
              mutation={UPDATE_CLIENT_ACCOUNT}
              onError={this.error}
              onCompleted={data => {
                this.formSubmitted(data)
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
                        variables: this.state.data,
                      })
                    }}
                    className="checkout-form-container"
                  >
                    <h3 className="form-header">Update Profile</h3>
                    <div className="row-full">
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="First name"
                            onChange={this.handleFormInput}
                            value={this.state.data.first_name}
                            id="first_name"
                            autoComplete="false"
                            name="first_name"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="Last name"
                            onChange={this.handleFormInput}
                            value={this.state.data.last_name}
                            id="last_name"
                            autoComplete="false"
                            name="last_name"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <input
                          type="email"
                          placeholder="Email Address"
                          id="email"
                          name="email"
                          value={this.state.data.email}
                          required
                          autoComplete="false"
                          onChange={this.handleFormInput}
                        />

                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="Phone"
                            value={this.state.data.phone}
                            onChange={this.handleFormInput}
                            id="phone"
                            name="phone"
                          />
                        </div>
                        </div>
                        {this.state.admin ? <div></div>:
                        <div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="Highest Ranked University Attended"
                            value={
                              this.state.educational_details
                                .highest_ranked_university_attended
                            }
                            onChange={this.handleFormAssociateEducationalInfo}
                            id="highest_ranked_university_attended"
                            name="highest_ranked_university_attended"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="University Qualification"
                            value={
                              this.state.educational_details
                                .qualification_at_university
                            }
                            onChange={this.handleFormAssociateEducationalInfo}
                            id="qualification_at_university"
                            name="qualification_at_university"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="Employment"
                            value={this.state.educational_details.employment}
                            onChange={this.handleFormAssociateEducationalInfo}
                            id="employment"
                            name="employment"
                          />
                        </div>

                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="Scholarships and Awards"
                            value={
                              this.state.educational_details
                                .scholarships_and_awards
                            }
                            onChange={this.handleFormAssociateEducationalInfo}
                            id="scholarships_and_awards"
                            name="scholarships_and_awards"
                          />
                        </div>

                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="Graduating Grade"
                            value={
                              this.state.educational_details.graduating_grade
                            }
                            onChange={this.handleFormAssociateEducationalInfo}
                            id="graduating_grade"
                            name="graduating_grade"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="GRE Score"
                            value={this.state.educational_details.gre_score}
                            onChange={this.handleFormAssociateEducationalInfo}
                            id="gre_score"
                            name="gre_score"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="GMAT score"
                            value={this.state.educational_details.gmat_score}
                            onChange={this.handleFormAssociateEducationalInfo}
                            id="gmat_score"
                            name="gmat_score"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="IELTs"
                            value={this.state.educational_details.ielts}
                            onChange={this.handleFormAssociateEducationalInfo}
                            id="ielts"
                            name="ielts"
                          />
                        </div>
                      <br />
                      <div className="row-full">
                        <label>
                          <b>Bio Bait :</b>
                        </label>
                        <textarea
                          type="text"
                          id="bio_bait"
                          name="bio_bait"
                          rows="4"
                          onChange={this.handleFormAssociateEducationalInfo}
                          value={this.state.educational_details.bio_bait}
                          required
                        ></textarea>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          required
                          value={
                            this.state.educational_details.where_client_from
                          }
                          onChange={this.handleFormAssociateEducationalInfo}
                          id="where_client_from"
                          name="where_client_from"
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          required
                          value={
                            this.state.educational_details.what_jobs_client
                          }
                          onChange={this.handleFormAssociateEducationalInfo}
                          id="what_jobs_client"
                          name="what_jobs_client"
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          required
                          value={
                            this.state.educational_details.client_reach_you_for
                          }
                          onChange={this.handleFormAssociateEducationalInfo}
                          id="client_reach_you_for"
                          name="client_reach_you_for"
                        />
                      </div>
                      </div> }
                    </div>

                    <br />
                    <input
                      type="submit"
                      className="submit-details"
                      value="Update"
                    />
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
}
