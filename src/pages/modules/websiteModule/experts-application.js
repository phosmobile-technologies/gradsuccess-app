import { React, Component } from "react"
import Layout from "./components/layout"
import loader from "../../../images/loader.gif"
import ExpertRegistrationForm from "./components/Forms/expertRegistrationForm"
import AssociateDetail from "./components/Forms/AssociateDetail"
import ProfileImageUpload from "./components/Forms/profileImageUpload"
import BioFormat from "./components/Forms/ExpertBioFormat"
import RegistrationSummary from "./components/Forms/registrationSummary"
import { SAVE_PROFILE_IMAGE } from "../../../api/sendMailEndpoint"
import { SAVE_EXPERT_DETAILS } from "../../../api/sendMailEndpoint"

 /* eslint-disable */ 
 
export default class ApplicationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expert_id: "",
      data: {
        first_name: "",
        last_name: "",
        phone: "",
        bank_account_number: "null",
        bank_name: "null",
        form_id: "null",
        app_package: "null",
        email: "",
        password: "",
        account_type: "Expert",
      },
      educational_details: {
        highest_ranked_university_attended: "",
        qualification_at_university: "",
        employment: "",
        scholarships_and_awards: "",
        graduating_grade: "",
        gre_score: "",
        gmat_score: "",
        ielts: "",
        university_transcripts: "",
        curriculum_vitae: "",
        bio_bait: "",
        where_client_from: "",
        what_jobs_client: "",
        client_reach_you_for: "",
      },
      password_verified: true,
      account_created: false,
      imageUrl: "",
      file: "",
      profileImageRef: "",
      step: 1,
      fileImg: "",
      uni_transcript: "",
      cv: "",
      uni_transcript_file: "",
      cv_file: "",
      uni_transcript_ref: "",
      cv_ref: "",
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleEducationalBgInput = this.handleEducationalBgInput.bind(this)
    this.storePassword = this.storePassword.bind(this)
    this.verifyPassword = this.verifyPassword.bind(this)
    this._onChange = this._onChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.formSubmitted = this.formSubmitted.bind(this)
    this.saveExpertsDetails = this.saveExpertsDetails.bind(this)
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

  formSubmitted(data) {
    this.onChange(this.state.fileImg, data.createClientAcccount.id)
  }

  saveExpertsDetails(id) {
    document.getElementById("expert_loader").style.display = "none"
    let url = SAVE_EXPERT_DETAILS
    let data = {
      expert_id: id,
      highest_ranked_university_attended: this.state.educational_details
        .highest_ranked_university_attended,
      qualification_at_university: this.state.educational_details
        .qualification_at_university,
      employment: this.state.educational_details.employment,
      scholarships_and_awards: this.state.educational_details
        .scholarships_and_awards,
      graduating_grade: this.state.educational_details.graduating_grade,
      gre_score: this.state.educational_details.gre_score,
      gmat_score: this.state.educational_details.gmat_score,
      ielts: this.state.educational_details.ielts,
      university_transcripts: this.state.uni_transcript_ref,
      curriculum_vitae: this.state.cv_ref,
      bio_bait: this.state.educational_details.bio_bait,
      where_client_from: this.state.educational_details.where_client_from,
      what_jobs_client: this.state.educational_details.what_jobs_client,
      client_reach_you_for: this.state.educational_details.client_reach_you_for,
      profile_image_ref: this.state.profileImageRef,
      user_name: this.state.data.last_name + " " + this.state.data.first_name,
      bank_account_number: this.state.data.bank_account_number,
      bank_name: this.state.data.bank_name,
    }
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "post",
      body: JSON.stringify(data),
    })
      .then(function(response) {
        return response.text()
      })
      .then(text => {
        window.location = "/application-successful"
      })
      .catch(function(error) {
        alert("Networks Error please try again, Later!")
      })
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

  verifyPassword(event) {
    const { name, value } = event.target
    const password_info = document.getElementById("password_info")
    // When the user starts to type something inside the password field
    // Validate length
    if (value.length >= 8) {
      password_info.style.display = "none"
    } else {
      password_info.style.display = "block"
      this.setState({
        password_verified: true,
      })
    }
  }

  onChange(file, id) {
    document.getElementById("expert_loader").style.display = "flex"
    let saveExpert = this.saveExpertsDetails
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
    let imageName = "Expert_upload"
    let timeSubmitted = new Date().getTime()
    let fileRef =
      "ExpertUpload/" + imageName + "_" + timeSubmitted + "_" + file.name
    this.setState(prevState => ({
      profileImageRef: fileRef,
    }))
    var storageRef = firebase.storage().ref(fileRef)
    var task = storageRef.put(file)
    task.on(
      "state_changed",
      function progress(snapshot) {
        //
      },
      function error(err) {
        alert("failed to update profile...pls try again")
      },
      function complete() {
        let url = SAVE_PROFILE_IMAGE
        let data = {
          profileID: id,
          imageRef: fileRef,
        }
        fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "post",
          body: JSON.stringify(data),
        })
          .then(function(response) {
            return response.text()
          })
          .then(text => {
            saveExpert(id)
          })
          .catch(function(error) {})
      }
    )
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
      password_info_c.style.display = "block"
    } else {
      password_info_c.style.display = "none"
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
                  verifyPassword={this.verifyPassword}
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
                  client_reach_you_for={client_reach_you_for}
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
                    client_reach_you_for={client_reach_you_for}
                    saveApplication={this.onChange}
                    prevStep={this.prevStep}
                    nextStep={this.nextStep}
                    formSubmitted={this.formSubmitted}
                  />
                </div>
              </div>
            </Layout>
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
