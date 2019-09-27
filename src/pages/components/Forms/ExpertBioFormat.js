import React from "react"
import { graphql, Link } from "gatsby"
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

  handleCVUpload = e => {
    var saveRef = this.props.saveImageRef
    var handleCVUpload = this.props.handleCVUpload
    var cv_up = document.getElementById("cv_upload")
    cv_up.style.display = "block"
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
      "ExpertUpload/" + imageName + "_" + timeSubmitted + "_" + file.name

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

  handleTranscriptUpload = e => {
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
      "ExpertUpload/" + imageName + "_" + timeSubmitted + "_" + file.name
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
    const { handleFormInput, nextStep, prevStep } = this.props

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
                  <p>Bio Format</p>
                </li>
                <li>
                  <h3>5</h3>
                  <p>Summary</p>
                </li>
              </ul>
            </div>

            <div className="row-full">
              <div className="row-full">
                <label>
                  <b>Bait ( Short description of bio):</b>
                </label>
                <small>
                  <i>
                    for example“Chevening scholarship, MAM at Yale, MPH at the
                    Harvard, Teach forNigeria fellowship– find out how Daniel’s
                    clients secured suchdiverse and rewarding opportunities and
                    offers)”
                  </i>
                </small>
                <textarea
                  type="text"
                  id="bio_bait"
                  name="bio_bait"
                  rows="4"
                  onChange={this.props.handleFormInput}
                  value={this.props.bio_bait}
                  required
                ></textarea>
              </div>
              <br />
              <br />
              <br />

              <div className="row-full">
                <label>
                  <b>Where clients have come from:</b>
                </label>
                <small>
                  <i>(backgrounds, engineering or lawor medical students?) </i>
                </small>
                <input
                  placeholder="Where clients have come from"
                  type="text"
                  id="where_client_from"
                  name="where_client_from"
                  autoComplete="false"
                  autoComplete="false"
                  onChange={this.props.handleFormInput}
                  value={this.props.where_client_from}
                />
              </div>
              <br />
              <br />
              <br />
              <div className="row-full">
                <label>
                  <b>What jobs or opportunities have clients secured:</b>
                </label>
                <small>
                  <i>(e.g. admitted to Stanford, job at Google) </i>
                </small>
                <input
                  placeholder="What   jobs   or   opportunities   have   clients   secured:"
                  type="text"
                  id="what_jobs_client"
                  name="what_jobs_client"
                  autoComplete="false"
                  autoComplete="false"
                  onChange={this.props.handleFormInput}
                  value={this.props.what_jobs_client}
                />
              </div>
              <br />
              <br />
              <br />
              <div className="row-full">
                <label>
                  <b>What should clients reach you for? </b>
                </label>
                <small>
                  <i>CV and Admission statements? Cover letters only? All?</i>
                </small>
                <input
                  placeholder="What should clients reach you for?"
                  type="text"
                  id="client_reach_you_for"
                  name="client_reach_you_for"
                  autoComplete="false"
                  autoComplete="false"
                  onChange={this.props.handleFormInput}
                  value={this.props.client_reach_you_for}
                />
              </div>
              <br />
              <br />
              <br />
            </div>

            <label>
              See this <Link to="/">page</Link> for current live samples of
              other associate’s profiles
            </label>
            <br />
            <br />

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
              css={{
                opacity:
                  this.props.cv === "" ||
                  this.props.highest_ranked_university_attended === "" ||
                  this.props.qualification_at_university === "" ||
                  this.props.employment === "" ||
                  this.props.scholarships_and_awards === "" ||
                  this.props.graduating_grade === "" ||
                  (this.props.gre_score === "") === "" ||
                  this.props.gmat_score === "" ||
                  this.props.ielts === "" ||
                  this.props.uni_transcript === ""
                    ? "0.3"
                    : "1",
              }}
              disabled={
                this.props.cv === "" ||
                this.props.uni_transcript === "" ||
                this.props.highest_ranked_university_attended === "" ||
                this.props.qualification_at_university === "" ||
                this.props.employment === "" ||
                this.props.scholarships_and_awards === "" ||
                this.props.graduating_grade === "" ||
                (this.props.gre_score === "") === "" ||
                this.props.gmat_score === "" ||
                this.props.ielts === ""
              }
            />
          </form>
        </div>
      </div>
    )
  }
}
