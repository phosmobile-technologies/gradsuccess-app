import React from "react"
import upoadAttachment from "../../../../../images/icons/upoadAttachment.png"
import { Button, Spinner } from "@blueprintjs/core"
import SimpleReactValidator from "simple-react-validator"

export default class AssociateDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showUploadProgress: false,
    }
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
    })
  }

  handleCVUpload = e => {
    this.setState({
      showUploadProgress: true,
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
    var file = document.getElementById("curriculum_vitae").files[0]
    let fileRef =
      "uploaded_file/" + name + "_" + timeSubmitted + "_" + file.name

    var storageRef = firebase.storage().ref(fileRef)
    var task = storageRef.put(file)

    task.on(
      "state_changed",
      snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
          pro: progress,
        })
      },
      error => {
        console.log(error)
        alert("Failed Uploading Curriculum Vitae")
        this.setState({
          showUploadProgress: false,
        })
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.props.saveImageRef("cv_ref", downloadURL)
          this.props.handleCVUpload(file)
          this.setState({
            showUploadProgress: false,
          })
        })
      }
    )
  }

  handleTranscriptUpload = e => {
    this.setState({
      showUploadProgress: true,
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
    var file = document.getElementById("university_transcripts").files[0]
    let fileRef =
      "uploaded_file/" + name + "_" + timeSubmitted + "_" + file.name

    var storageRef = firebase.storage().ref(fileRef)
    var task = storageRef.put(file)

    task.on(
      "state_changed",
      error => {
        console.log(error)
        alert("Failed Uploading transcript")
        this.setState({
          showUploadProgress: false,
        })
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.props.saveImageRef("uni_transcript_ref", downloadURL)
          this.props.handleUniversityTranscript(file)
          this.setState({
            showUploadProgress: false,
          })
        })
      }
    )
  }

  verifyInputs = () => {
    if (this.validator.allValid()) {
      this.props.nextStep()
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  render() {
    const { handleFormInput, prevStep } = this.props

    return (
      <div>
        <h3 className="form-header expert-form-header">Apply As Expert</h3>
        <div className="expert-form">
          <form className="checkout-form-container">
            <div className="multi-step-wrapper">
              <ul>
                <li className="first-step-filled">
                  <h3>1</h3>
                  <p>Associate Detail</p>
                </li>

                <li className="second-step">
                  <h3>2</h3>
                  <p>Educational Background</p>
                </li>
                <li>
                  <h3>3</h3>
                  <p>Profile Image</p>
                </li>
                <li>
                  <h3>4</h3>
                  <p>Bio Format</p>
                </li>
                <li>
                  <h3>5</h3>
                  <p>Summary</p>
                </li>
              </ul>
            </div>

            <div className="align-input">
              <div className="align-input-w">
                <input
                  type="text"
                  placeholder="Highest Ranked University Attended"
                  onChange={handleFormInput}
                  id="highest_ranked_university_attended"
                  autoComplete="false"
                  name="highest_ranked_university_attended"
                  value={this.props.highest_ranked_university_attended}
                  className="bp3-input bp3-large"
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "highest_ranked_university_attended",
                      this.props.highest_ranked_university_attended,
                      "required"
                    )}
                  </i>
                </p>
              </div>
              <div className="align-input-w">
                {" "}
                <input
                  type="text"
                  placeholder="University Qualification"
                  onChange={handleFormInput}
                  id="qualification_at_university"
                  autoComplete="false"
                  name="qualification_at_university"
                  value={this.props.qualification_at_university}
                  className="bp3-input bp3-large"
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "qualification_at_university",
                      this.props.qualification_at_university,
                      "required"
                    )}
                  </i>
                </p>
              </div>
            </div>

            <div className="align-input">
              <div className="align-input-w">
                <input
                  type="text"
                  placeholder="Employment"
                  id="employment"
                  name="employment"
                  autoComplete="false"
                  onChange={handleFormInput}
                  value={this.props.employment}
                  className="bp3-input bp3-large"
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "employment",
                      this.props.employment,
                      "required"
                    )}
                  </i>
                </p>
              </div>

              <div className="align-input-w">
                <input
                  type="text"
                  placeholder="Scholarships and Awards"
                  onChange={handleFormInput}
                  id="scholarships_and_awards"
                  name="scholarships_and_awards"
                  autoComplete="false"
                  value={this.props.scholarships_and_awards}
                  className="bp3-input bp3-large"
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "scholarships_and_awards",
                      this.props.scholarships_and_awards,
                      "required"
                    )}
                  </i>
                </p>
              </div>
            </div>

            <div className="align-input">
              <div className="align-input-w">
                <input
                  type="text"
                  placeholder="Graduating Grade"
                  id="graduating_grade"
                  name="graduating_grade"
                  autoComplete="false"
                  onChange={handleFormInput}
                  value={this.props.graduating_grade}
                  className="bp3-input bp3-large"
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "gre_score",
                      this.props.graduating_grade,
                      "required"
                    )}
                  </i>
                </p>
              </div>

              <div className="align-input-w">
                <input
                  type="text"
                  placeholder="GRE Score"
                  id="gre_score"
                  autoComplete="false"
                  name="gre_score"
                  onChange={handleFormInput}
                  value={this.props.gre_score}
                  className="bp3-input bp3-large"
                />
              </div>
            </div>

            <div className="align-input">
              <div className="align-input-w">
                <input
                  type="text"
                  placeholder="GMAT score"
                  id="gmat_score"
                  name="gmat_score"
                  autoComplete="false"
                  onChange={handleFormInput}
                  value={this.props.gmat_score}
                  className="bp3-input bp3-large"
                />
              </div>

              <div className="align-input-w">
                <input
                  type="text"
                  placeholder="IELTs"
                  id="ielts"
                  autoComplete="false"
                  name="ielts"
                  value={this.props.ielts}
                  onChange={handleFormInput}
                  className="bp3-input bp3-large"
                />
              </div>
            </div>
            <br />
            <div className="row-full"></div>
            <input
              type="file"
              name="university_transcripts"
              id="university_transcripts"
              className="file_upload"
              onChange={this.handleTranscriptUpload}
            />
            <input
              type="file"
              name="curriculum_vitae"
              id="curriculum_vitae"
              className="file_upload"
              onChange={this.handleCVUpload}
            />

            <div className="expert_reg_upload_label">
              <img src={upoadAttachment} alt="associates" />

              <label htmlFor="university_transcripts">
                {this.props.uni_transcript === null
                  ? "Upload University Transcript"
                  : "Change"}
              </label>
              <p>{this.props.uni_transcript}</p>
            </div>

            <div className="expert_reg_upload_label">
              <img src={upoadAttachment} alt="associates" />

              <label htmlFor="curriculum_vitae">
                {this.props.cv === null ? "Upload CV" : "Change"}
              </label>
              <p>{this.props.cv}</p>
            </div>

            {this.state.showUploadProgress && (
              <Spinner
                size={Spinner.SIZE_SMALL}
                className="bp3-intent-success"
              />
            )}

            <br />
            <div className="layout-btn">
              <Button
                type="button"
                className="bp3-button bp3-intent-danger n-btn"
                onClick={prevStep}
                large={true}
                disabled={this.state.showUploadProgress}
              >
                Previous
              </Button>
              <Button
                type="button"
                className="bp3-button bp3-intent-success n-btn"
                onClick={this.verifyInputs}
                large={true}
                disabled={this.state.showUploadProgress}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
