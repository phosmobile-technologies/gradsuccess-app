import { React, Component } from "react"
import Layout from "./components/layout"
import loader from "../../../images/loader.gif"
import ExpertRegistrationForm from "./components/Forms/expertRegistrationForm"
import AssociateDetail from "./components/Forms/AssociateDetail"
import ProfileImageUpload from "./components/Forms/profileImageUpload"
import BioFormat from "./components/Forms/AssociateBioFormat"
import RegistrationSummary from "./components/Forms/registrationSummary"
import { Mutation } from "react-apollo"
import { CREATE_ASSOCIATE_PROFILE } from "../../graphql/mutations"
import { Callout } from "@blueprintjs/core"
import { navigate } from 'gatsby';

/* eslint-disable */

export default class ApplicationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expert_id: null,
      data: {
        first_name: null,
        last_name: null,
        phone: null,
        bank_account_number: null,
        bank_name: null,
        email: null,
        password: null,
        account_type: "Associate",
      },
      educational_details: {
        highest_ranked_university_attended: null,
        qualification_at_university: null,
        employment: null,
        scholarships_and_awards: null,
        graduating_grade: null,
        gre_score: null,
        gmat_score: null,
        ielts: null,
        university_transcripts: null,
        curriculum_vitae: null,
        bio_bait: null,
        where_client_from: null,
        what_jobs_client: null,
        client_reach_you_for: null,
      },
      password_verified: true,
      account_created: false,
      imageUrl: null,
      file: null,
      profileImageRef: null,
      step: 1,
      fileImg: null,
      uni_transcript: null,
      cv: null,
      uni_transcript_file: null,
      cv_file: null,
      uni_transcript_ref: null,
      cv_ref: null,
      submitingForm: false,
      user:null
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleEducationalBgInput = this.handleEducationalBgInput.bind(this)
    this.storePassword = this.storePassword.bind(this)
    this._onChange = this._onChange.bind(this)
    this.verifyConfirmPassword = this.verifyConfirmPassword.bind(this)
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

  handleEducationalBgInput(event) {
    const { name, value } = event.target
    this.setState(prevState => ({
      educational_details: {
        ...prevState.educational_details,
        [name]: value,
      },
    }))
  }

  formSubmitted = data => {
    this.setState(
      {
        user_id: data.CreateUser.id,
        user:data.CreateUser
      },
      () => {
        this.handleProfileImageUpload(this.state.fileImg)
      }
    )
  }

  handleProfileImageUpload = file => {
    if (file) {
      this.setState({
        submitingForm: true,
      })
      const firebase = require("firebase")
      const config = {
        apiKey: "AIzaSyC26CrW2BGh2lXXDK0Gkcl4gCIPccHvW6s",
        authDomain: "gradsuccess.firebaseapp.com",
        databaseURL: "https://gradsuccess.firebaseio.com",
        projectId: "gradsuccess",
        storageBucket: "gradsuccess.appspot.com",
        messagingSenderId: "1038128602103",
        appId: "1:1038128602103:web:55d1ab3ffe5b02bf222cf2",
      }
      if (!firebase.apps.length) {
        firebase.initializeApp(config)
      }

      let name = "associate-cv"
      let timeSubmitted = new Date().getTime()
      let fileRef =
        "uploaded_file/" + name + "_" + timeSubmitted + "_" + file.name

      var storageRef = firebase.storage().ref(fileRef)
      var task = storageRef.put(file)

      task.on(
        "state_changed",
        snapshot => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => {
          console.log(error)
          alert("Failed Uploading transcript")
          this.setState({
            submitingForm: false,
          })
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.setState(
              {
                submitingForm: false,
                profileImageRef: downloadURL,
              },
              () => {
                this.form.dispatchEvent(new Event("submit"))
              }
            )
          })
        }
      )
    } else {
      this.form.dispatchEvent(new Event("submit"))
    }
  }

  storePassword(event) {
    const { name, value } = event.target
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }))
  }

  _onChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileImg: event.target.files[0],
    })
  }

  verifyConfirmPassword(event) {
    const { value } = event.target
    const password_info_c = document.getElementById("password_info_c")
    // When the user starts to type something inside the password field
    // Validate length
    if (value !== this.state.data.password) {
      this.setState({
        password_verified: true,
      })
    } else {
      this.setState({
        password_verified: false,
      })
    }
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1,
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1,
    })
  }

  saveImageRef = (refType, ref) => {
    this.setState({
      [refType]: ref,
    })
  }

  handleUniversityTranscript = ut => {
    this.setState({
      uni_transcript: ut.name,
    })
  }

  handleCVUpload = cv => {
    this.setState({
      cv: cv.name,
    })
  }

  render() {
    const { step } = this.state
    const {
      first_name,
      last_name,
      phone,
      bank_account_number,
      bank_name,
      form_id,
      app_package,
      email,
      password,
      account_type,
    } = this.state.data

    const {
      password_verified,
      imageUrl,
      file,
      profileImageRef,
      uni_transcript,
      cv,
    } = this.state
    const {
      highest_ranked_university_attended,
      qualification_at_university,
      employment,
      scholarships_and_awards,
      graduating_grade,
      gre_score,
      gmat_score,
      ielts,
      university_transcripts,
      curriculum_vitae,
      bio_bait,
      where_client_from,
      what_jobs_client,
      client_reach_you_for,
    } = this.state.educational_details

    const profileIMageUpload = {
      imageUrl,
      file,
      profileImageRef,
    }

    const basicDetails = {
      first_name,
      last_name,
      phone,
      form_id,
      app_package,
      email,
      password,
      account_type,
      password_verified,
    }

    const educationalDetails = {
      highest_ranked_university_attended,
      qualification_at_university,
      employment,
      scholarships_and_awards,
      graduating_grade,
      gre_score,
      gmat_score,
      ielts,
      university_transcripts,
      curriculum_vitae,
      uni_transcript,
      cv,
    }

    switch (step) {
      case 1:
        return (
          <Layout>
            <div>
              <div
                css={{
                  padding: "3em 1em",
                }}
              >
                <ExpertRegistrationForm
                  nextStep={this.nextStep}
                  handleFormInput={this.handleFormInput}
                  storePassword={this.storePassword}
                  verifyConfirmPassword={this.verifyConfirmPassword}
                  first_name={first_name}
                  last_name={last_name}
                  phone={phone}
                  bank_account_number={bank_account_number}
                  bank_name={bank_name}
                  form_id={form_id}
                  app_package={app_package}
                  email={email}
                  password={password}
                  account_type={account_type}
                  password_verified={password_verified}
                  saveImageRef={this.saveImageRef}
                />
              </div>
            </div>
          </Layout>
        )
      case 2:
        return (
          <Layout>
            <div>
              <div
                css={{
                  background: "white",
                  padding: "3em 1em",
                }}
              >
                <AssociateDetail
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  handleFormInput={this.handleEducationalBgInput}
                  handleUniversityTranscript={this.handleUniversityTranscript}
                  handleCVUpload={this.handleCVUpload}
                  highest_ranked_university_attended={
                    highest_ranked_university_attended
                  }
                  qualification_at_university={qualification_at_university}
                  employment={employment}
                  scholarships_and_awards={scholarships_and_awards}
                  graduating_grade={graduating_grade}
                  gre_score={gre_score}
                  gmat_score={gmat_score}
                  ielts={ielts}
                  university_transcripts={university_transcripts}
                  curriculum_vitae={curriculum_vitae}
                  uni_transcript={uni_transcript}
                  cv={cv}
                  saveImageRef={this.saveImageRef}
                />
              </div>
            </div>
          </Layout>
        )
      case 3:
        return (
          <Layout>
            <div>
              <div
                css={{
                  background: "white",
                  padding: "3em 1em",
                }}
              >
                <ProfileImageUpload
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  handleProfileFileUpload={this._onChange}
                  imageUrl={imageUrl}
                  file={file}
                  profileImageRef={profileImageRef}
                  saveImageRef={this.saveImageRef}
                />
              </div>
            </div>
          </Layout>
        )

      case 4:
        return (
          <Layout>
            <div>
              <div
                css={{
                  background: "white",
                  padding: "3em 1em",
                }}
              >
                <BioFormat
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  handleFormInput={this.handleEducationalBgInput}
                  bio_bait={bio_bait}
                  where_client_from={where_client_from}
                  what_jobs_client={what_jobs_client}
                  client_reach_you_htmlFor={client_reach_you_for}
                />
              </div>
            </div>
          </Layout>
        )
      case 5:
        return (
          <div>
            <Layout>
              <div>
                <div className="expert_loader" id="expert_loader">
                  <p>Just a moment</p>
                  <img src={loader} />
                </div>
                <div
                  css={{
                    background: "white",
                    padding: "3em 1em",
                  }}
                >
                  <RegistrationSummary
                    highest_ranked_university_attended={
                      highest_ranked_university_attended
                    }
                    qualification_at_university={qualification_at_university}
                    employment={employment}
                    scholarships_and_awards={scholarships_and_awards}
                    graduating_grade={graduating_grade}
                    gre_score={gre_score}
                    gmat_score={gmat_score}
                    ielts={ielts}
                    university_transcripts={university_transcripts}
                    curriculum_vitae={curriculum_vitae}
                    uni_transcript={uni_transcript}
                    cv={cv}
                    first_name={first_name}
                    last_name={last_name}
                    phone={phone}
                    form_id={form_id}
                    app_package={app_package}
                    email={email}
                    password={password}
                    account_type={account_type}
                    password_verified={password_verified}
                    imageUrl={imageUrl}
                    file={file}
                    profileImageRef={profileImageRef}
                    bio_bait={bio_bait}
                    where_client_from={where_client_from}
                    what_jobs_client={what_jobs_client}
                    client_reach_you_htmlFor={client_reach_you_for}
                    saveApplication={this.onChange}
                    prevStep={this.prevStep}
                    nextStep={this.nextStep}
                    formSubmitted={this.formSubmitted}
                    submitingForm={this.state.submitingForm}
                  />
                </div>
              </div>
            </Layout>
            <Mutation
              mutation={CREATE_ASSOCIATE_PROFILE}
              onCompleted={data => {
                navigate("/registration-successful", {
                  replace: true,
                  state: {
                    user: this.state.user,
                  },
                })
              }}
              onError={error => {
                alert(error)
              }}
            >
              {(createAssociateProfile, { error }) => (
                <div className="loader-wrapper">
                  {error && (
                    <Callout
                      className="bp3-intent-danger cart-resize"
                      icon="error"
                    >
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
                          highest_ranked_university_attended: this.state
                            .educational_details
                            .highest_ranked_university_attended,
                          qualification_at_university: this.state
                            .educational_details.qualification_at_university,
                          employment: this.state.educational_details.employment,
                          scholarships_and_awards: this.state
                            .educational_details.scholarships_and_awards,
                          graduating_grade: this.state.educational_details
                            .graduating_grade,
                          gre_score: this.state.educational_details.gre_score,
                          gmat_score: this.state.educational_details.gmat_score,
                          ielts: this.state.educational_details.ielts,
                          university_transcripts: this.state.uni_transcript_ref,
                          attached_file: this.state.cv_ref,
                          bio_bait: this.state.educational_details.bio_bait,
                          where_client_from: this.state.educational_details
                            .where_client_from,
                          what_jobs_client: this.state.educational_details
                            .what_jobs_client,
                          client_reach_you_for: this.state.educational_details
                            .client_reach_you_for,
                          profile_image_ref: this.state.profileImageRef,
                          user_name:
                            this.state.data.last_name +
                            " " +
                            this.state.data.first_name,
                          bank_account_number: this.state.data
                            .bank_account_number,
                          bank_name: this.state.data.bank_name,
                          user_id: this.state.user_id,
                        },
                      })
                    }}
                    ref={form => (this.form = form)}
                    className="checkout-form-container"
                  ></form>
                </div>
              )}
            </Mutation>
          </div>
        )
      default:
        return (
          <Layout>
            <div>
              <h3>Errors</h3>
            </div>
          </Layout>
        )
    }
  }
}
