import React from "react"
import { graphql } from "gatsby"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CREATE_CLIENT_ACCOUNT } from "../../graphql/mutations"
import loader from "../../../images/loader.gif"
import upoadAttachment from "../../../images/icons/upoadAttachment.png"
import loading from "../../../images/Rolling.svg"

export default class AssociateDetails extends React.Component {
  constructor(props) {
    super(props)

  }


  handleCVUpload = (e) => {
    var saveRef = this.props.saveImageRef
    var handleCVUpload = this.props.handleCVUpload;
    var cv_up = document.getElementById("cv_upload");
    cv_up.style.display =  "block"
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
    var file = document.getElementById("curriculum_vitae").files[0]
    let fileRef =
      "ExpertUpload/" +
      imageName +
      "_" +
      timeSubmitted +
      "_" +
      file.name

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
        saveRef("cv_ref", fileRef)
        handleCVUpload(file)

        cv_up.style.display = "none"
      }
    )
  }

  handleTranscriptUpload = (e) => {
    var saveRef = this.props.saveImageRef
    var handleUniversityTranscript = this.props.handleUniversityTranscript
     var ut_up = document.getElementById("ut_upload")
     ut_up.style.display = "block"
     
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
    var file = document.getElementById("university_transcripts").files[0]
    let fileRef =
      "ExpertUpload/" +
      imageName +
      "_" +
      timeSubmitted +
      "_" +
      file.name
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
        saveRef("uni_transcript_ref", fileRef)
        handleUniversityTranscript(file)
        ut_up.style.display = "none"
      }
    )
  }

  render() {
    const {
      values,
      handleFormInput,
      nextStep,
      prevStep,
      
    } = this.props

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
                  <p>Summary</p>
                </li>
              </ul>
            </div>
            <div className="row-full">
              <div className="row">
                <input
                  type="text"
                  placeholder="Highest Ranked University Attended"
                  onChange={handleFormInput}
                  id="highest_ranked_university_attended"
                  autoComplete="false"
                  name="highest_ranked_university_attended"
                  value={values.highest_ranked_university_attended}
                />
                <input
                  type="text"
                  placeholder="University Qualification"
                  onChange={handleFormInput}
                  id="qualification_at_university"
                  autoComplete="false"
                  autoComplete="false"
                  name="qualification_at_university"
                  value={values.qualification_at_university}
                />
              </div>

              <div className="row">
                <input
                  type="text"
                  placeholder="Employment"
                  id="employment"
                  name="employment"
                  autoComplete="false"
                  autoComplete="false"
                  onChange={handleFormInput}
                  value={values.employment}
                />

                <div className="col">
                  <input
                    type="text"
                    placeholder="Scholarships and Awards"
                    onChange={handleFormInput}
                    id="scholarships_and_awards"
                    name="scholarships_and_awards"
                    autoComplete="false"
                    value={values.scholarships_and_awards}
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Graduating Grade"
                id="graduating_grade"
                name="graduating_grade"
                autoComplete="false"
                onChange={handleFormInput}
                value={values.graduating_grade}
              />

              <input
                type="text"
                placeholder="GRE Score"
                id="gre_score"
                autoComplete="false"
                name="gre_score"
                onChange={handleFormInput}
                value={values.gre_score}
              />

              <input
                type="text"
                placeholder="GMAT score"
                id="gmat_score"
                name="gmat_score"
                autoComplete="false"
                onChange={handleFormInput}
                value={values.gmat_score}
              />
              <input
                type="text"
                placeholder="IELTs"
                id="ielts"
                autoComplete="false"
                name="ielts"
                value={values.ielts}
                onChange={handleFormInput}
              />
            </div>
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
              <img src={upoadAttachment} />

              <label htmlFor="university_transcripts">
                {values.uni_transcript === ""
                  ? "Upload University Transcript"
                  : "Change"}
              </label>
              <img src={loading} id="ut_upload" />
              <p>{values.uni_transcript}</p>
            </div>

            <div className="expert_reg_upload_label">
              <img src={upoadAttachment} />

              <label htmlFor="curriculum_vitae">
                {values.cv === "" ? "Upload CV" : "Change"}
              </label>
              <img src={loading} id="cv_upload" />
              <p>{values.cv}</p>
            </div>
            <div>
              <input
                type="button"
                className="submit-details-next"
                value="Previous"
                onClick={prevStep}
              />
              <input
                type="button"
                className="submit-details-prev"
                value="Next"
                onClick={nextStep}
                disabled={values.cv === "" && values.uni_transcript === " "}
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
