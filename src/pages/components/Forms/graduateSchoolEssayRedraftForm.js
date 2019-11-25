import React from "react"
import { graphql } from "gatsby"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CREATE_GRADUATE_SCHOOL_ESSAY_REDRAFT } from "../../graphql/mutations"
import download from "../../../images/download.png"
import loader from "../../../images/loader.gif"
import Dropzone from "react-dropzone"
import ThankYou from "../formCompletePage"

export default class resumeReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: "empty",
        phone: "empty",
        employment_most_relevant_to_you_masters_application: "empty",
        typical_achievements: "empty",
        scholarships_and_award: "empty",
        undegraduate_level_courses_master: "empty",
        project_dissertation_name_master: "empty",
        most_recent_undergraduate: "empty",
        undergraduate_level_grade: "empty",
        result_ranking: "empty",
        undegraduate_level_courses_phd: "empty",
        project_dissertation_name_phd: "empty",
        leadership_experience: "empty",
        interpersonal_skills: false,
        presentation_skills: false,
        programming: false,
        microsoft_excel: false,
        java: false,
        other_skills: "none",
        extracurricular_activities: "empty",
        professional_workshops: "empty",
        academic_conferences_attended: "empty",
        certificate: "empty",
        english: false,
        french: false,
        german: false,
        spanish: false,
        nigeria_languages: false,
        other_languages: "none",
        masters_intended_area_of_research: "empty",
        university_of_choice_and_course: "empty",
        modules_interested: "empty",
        teaching_personel_contacted: "empty",
        summary_of_interest: "empty",
        post_study_goal: "empty",
        referee: "empty",
        curriculum_vitae: "CV.pdf",
        package: this.props.package,
        has_expert: "empty",
        form_id: "empty",
        status: "Vacant",
        completed: false,
      },
      form_submit_success: false,
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.onChange = this.onChange.bind(this)
    this.formSubmitted = this.formSubmitted.bind(this)
  }
  handleFormInput(event) {
    const { name, value, type, checked } = event.target
    if (type === "checkbox") {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [name]: checked,
        },
      }))
    } else {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [name]: value,
        },
      }))
    }
  }
  componentDidMount() {
    if (localStorage.hasOwnProperty("targeted")) {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          has_expert: localStorage.getItem("targeted"),
          status: "Assigned",
        },
      }))
    }
    localStorage.getItem("payment_successful")
    if (localStorage.hasOwnProperty("payment_successful")) {
      this.setState({
        form_submit_success: true,
      })
    }
    document.getElementById("submitBtn").disabled = true
    document.getElementById("submitBtn").style.opacity = "0.5"
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        form_id: localStorage.getItem("form_id"),
      },
    }))
    localStorage.setItem("package", this.props.package)
  }
  formSubmitted() {
    document.getElementById("submittedSucces").style.display = "block"
    localStorage.setItem("payment_successful", true)

    setTimeout(function() {
      if (document.getElementById("submittedSucces") != null) {
        document.getElementById("submittedSucces").style.display = "none"
      }
    }, 5000)
    this.setState({
      form_submit_success: true,
    })
  }
  onChange(e) {
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

    const uploader = document.getElementById("uploader")
    const uploadingText = document.getElementById("uploading")
    const completeText = document.getElementById("complete")
    const errorText = document.getElementById("error")
    let CVName = this.state.data.name.replace(/\s+/g, "_")
    let timeSubmitted = new Date().getTime()
    var file = document.getElementById("file").files[0]
    let fileRef =
      "CurriculumVitae/" + CVName + "_" + timeSubmitted + "_" + file.name
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        curriculum_vitae: fileRef,
      },
    }))
    var storageRef = firebase.storage().ref(fileRef)
    var task = storageRef.put(file)
    task.on(
      "state_changed",
      function progress(snapshot) {
        uploadingText.style.display = "block"
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploader.value = percentage
      },
      function error(err) {
        uploadingText.style.display = "none"
        errorText.style.display = "block"
      },
      function complete() {
        uploadingText.style.display = "none"
        errorText.style.display = "none"
        completeText.style.display = "block"
        document.getElementById("submitBtn").disabled = false
        document.getElementById("submitBtn").style.opacity = "1"
      }
    )
  }
  componentWillUnmount() {
    if (this.state.form_submit_success) {
      localStorage.removeItem("yshKSMCis129_#&NISis")
      localStorage.removeItem("targeted")
    } else {
    }
  }

  render() {
    if (!this.state.form_submit_success) {
      return (
        <div>
          <div className="detail-form">
            <Mutation
              mutation={CREATE_GRADUATE_SCHOOL_ESSAY_REDRAFT}
              onError={this.error}
              onCompleted={data => {
                this.formSubmitted()
              }}
            >
              {(createGraduateSchoolEssayRedraft, { data, loading, error }) => (
                <div className="loader-wrapper">
                  <div id="submittedSucces" className="SuccessTagForm">
                    Success! Your Details was submitted...
                  </div>
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      createGraduateSchoolEssayRedraft({
                        variables: this.state.data,
                      })
                    }}
                    className="checkout-form-container"
                  >
                    <h3 className="form-header">
                      Please Fill with correct details{" "}
                    </h3>
                    <div className="row-full">
                      <input
                        type="text"
                        placeholder="Name (Surname First)"
                        name="name"
                        required
                        onChange={this.handleFormInput}
                        id="name"
                      />
                      <br />

                      <input
                        type="text"
                        placeholder="Phone"
                        id="phone"
                        name="phone"
                        required
                        onChange={this.handleFormInput}
                      />
                      <br />
                      <input
                        type="text"
                        placeholder="Which Employment is most relevant to your Masters Application"
                        id="employment_most_relevant_to_you_masters_application"
                        name="employment_most_relevant_to_you_masters_application"
                        required
                        onChange={this.handleFormInput}
                      />
                      <br />
                      <input
                        type="text"
                        placeholder="What were your typical achievements"
                        id="typical_achievements"
                        name="typical_achievements"
                        onChange={this.handleFormInput}
                      />
                      <br />
                      <input
                        type="text"
                        className=""
                        placeholder="Scholarships and Awards (Awarding Body, Dates)"
                        id="scholarships_and_award"
                        name="scholarships_and_award"
                        onChange={this.handleFormInput}
                      />
                      <br />
                      <textarea
                        type="text"
                        placeholder="What are your top 5 courses at your Undegraduate level relating to your Masters of interest?"
                        id="undegraduate_level_courses_master"
                        name="undegraduate_level_courses_master"
                        rows="4"
                        onChange={this.handleFormInput}
                      ></textarea>
                      <input
                        type="text"
                        id="project_dissertation_name_master"
                        name="project_dissertation_name_master"
                        placeholder="What was your project/dissertation name *"
                        onChange={this.handleFormInput}
                      />
                      <input
                        type="text"
                        id="most_recent_undergraduate"
                        name="most_recent_undergraduate"
                        placeholder="What is the name of your most recent Undergraduate Education * "
                        onChange={this.handleFormInput}
                      />
                      <input
                        type="text"
                        id="undergraduate_level_grade"
                        name="undergraduate_level_grade"
                        placeholder="What was your final grade at Undergraduate level?  *"
                        onChange={this.handleFormInput}
                      />
                      <div className="selectibleList">
                        <label>
                          How do you rank your result in your overall graduating
                          class at Undergraduate level?
                        </label>
                        <div>
                          <input
                            type="radio"
                            id="result_ranking"
                            name="result_ranking"
                            checked={
                              this.state.data.result_ranking === "Top 5%"
                            }
                            onChange={this.handleFormInput}
                            value="Top 5%"
                          />
                          <label>Top 5%</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="result_ranking"
                            name="result_ranking"
                            checked={
                              this.state.data.result_ranking === "Top 10%"
                            }
                            onChange={this.handleFormInput}
                            value="Top 10%"
                          />
                          <label>Top 10%</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="result_ranking"
                            checked={
                              this.state.data.result_ranking === "Top 20%"
                            }
                            onChange={this.handleFormInput}
                            name="result_ranking"
                            value="Top 20%"
                          />
                          <label>Top 20%</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="result_ranking"
                            name="result_ranking"
                            checked={
                              this.state.data.result_ranking === "Top 50%"
                            }
                            onChange={this.handleFormInput}
                            value="Top 50%"
                          />
                          <label>Top 50%</label>
                        </div>
                      </div>
                      <textarea
                        type="text"
                        placeholder="What are your top 5 courses at Undergraduate relating to your PhD of interest?"
                        id="undegraduate_level_courses_phd"
                        name="undegraduate_level_courses_phd"
                        onChange={this.handleFormInput}
                        rows="4"
                      ></textarea>
                      <input
                        type="text"
                        id="project_dissertation_name_phd"
                        name="project_dissertation_name_phd"
                        placeholder="What was your project/dissertation name at Undergraduate level"
                        onChange={this.handleFormInput}
                      />
                      <textarea
                        type="text"
                        placeholder="Leadership Experiences (Include Dates)"
                        id="leadership_experience"
                        name="leadership_experience"
                        rows="4"
                        onChange={this.handleFormInput}
                      ></textarea>

                      <div className="selectibleList">
                        <label>Your Skills? *</label>
                        <div>
                          <input
                            type="checkbox"
                            id="interpersonal_skills"
                            name="interpersonal_skills"
                            checked={this.state.interpersonal_skills}
                            onChange={this.handleFormInput}
                          />
                          <label>Interpersonal Skills</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="presentation_skills"
                            name="presentation_skills"
                            checked={this.state.presentation_skills}
                            onChange={this.handleFormInput}
                          />
                          <label>Presentation Skills</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="programming"
                            name="programming"
                            checked={this.state.programming}
                            onChange={this.handleFormInput}
                          />
                          <label>
                            Programming (provide details in comment box below)
                          </label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="microsoft_excel"
                            name="microsoft_excel"
                            checked={this.state.microsoft_excel}
                            onChange={this.handleFormInput}
                          />
                          <label>Microsoft Excel</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="java"
                            name="java"
                            checked={this.state.java}
                            onChange={this.handleFormInput}
                          />
                          <label>JAVA</label>
                        </div>
                        <div className="other_skills">
                          <input
                            type="checkbox"
                            checked={this.state.data.other_skills != "empty"}
                            onChange={this.handleFormInput}
                          />
                          <input
                            type="text"
                            id="other_skills"
                            name="other_skills"
                            placeholder="Other Skills"
                            onChange={this.handleFormInput}
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        name="extracurricular_activities"
                        id="extracurricular_activities"
                        placeholder="Extracurricular Activities"
                        onChange={this.handleFormInput}
                      />
                      <input
                        type="text"
                        name="professional_workshops"
                        id="professional_workshops"
                        placeholder="Professional Workshops"
                        onChange={this.handleFormInput}
                      />
                      <input
                        type="text"
                        id="academic_conferences_attended"
                        name="academic_conferences_attended"
                        placeholder="Academic Conferences Attended (Organising body and Dates)"
                      />

                      <input
                        type="text"
                        placeholder="Certifications and Dates"
                        id="certificate"
                        name="certificate"
                        onChange={this.handleFormInput}
                      />

                      <div className="selectibleList">
                        <label>
                          Language at atleast Intermediate level (Good
                          Writing/Good Understanding/Average Speaking) *
                        </label>
                        <div>
                          <input
                            type="checkbox"
                            name="english"
                            id="english"
                            checked={this.state.data.english}
                            onChange={this.handleFormInput}
                            value="English"
                          />
                          <label>English</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="french"
                            id="french"
                            checked={this.state.data.french}
                            onChange={this.handleFormInput}
                            value="French"
                          />
                          <label>French</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="german"
                            id="german"
                            checked={this.state.data.german}
                            onChange={this.handleFormInput}
                            value="German"
                          />
                          <label>German</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="spanish"
                            id="spanish"
                            checked={this.state.data.spanish}
                            onChange={this.handleFormInput}
                            value="Spanish"
                          />
                          <label>Spanish</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            name="nigeria_languages"
                            id="nigeria_languages"
                            checked={this.state.data.nigeria_languages}
                            onChange={this.handleFormInput}
                            value="Nigerian Language"
                          />
                          <label>
                            Nigerian Language other than Native (Please describe
                            in 'other' below)
                          </label>
                        </div>
                        <div className="other_skills">
                          <input
                            type="checkbox"
                            checked={this.state.data.other_languages != "empty"}
                            onChange={this.handleFormInput}
                          />
                          <input
                            type="text"
                            id="other_languages"
                            name="other_languages"
                            placeholder="Other Languages"
                            onChange={this.handleFormInput}
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        id="masters_intended_area_of_research"
                        name="masters_intended_area_of_research"
                        placeholder="Masters Intended Area of Research"
                        onChange={this.handleFormInput}
                      />

                      <input
                        type="text"
                        id="university_of_choice_and_course"
                        name="university_of_choice_and_course"
                        placeholder="University of Choice and Course"
                        onChange={this.handleFormInput}
                      />

                      <input
                        type="text"
                        id="modules_interested"
                        name="modules_interested"
                        placeholder="Possible modules interested in at first choice university course?"
                        onChange={this.handleFormInput}
                      />
                      <input
                        type="text"
                        id="teaching_personel_contacted"
                        name="teaching_personel_contacted"
                        placeholder="Teaching personnel/ Faculties Contacted at Institutions"
                        onChange={this.handleFormInput}
                      />

                      <textarea
                        type="text"
                        id="summary_of_interest"
                        name="summary_of_interest"
                        placeholder="Summary of your interest"
                        rows="4"
                        onChange={this.handleFormInput}
                      ></textarea>
                      <textarea
                        type="text"
                        id="post_study_goal"
                        name="post_study_goal"
                        placeholder="Post Study Goals (Career Ambitions)"
                        rows="4"
                        onChange={this.handleFormInput}
                      ></textarea>
                      <textarea
                        type="text"
                        id="referee"
                        name="referee"
                        placeholder="Referees (List Names, Addresses, Phone Numbers and Emails)"
                        rows="4"
                        onChange={this.handleFormInput}
                      ></textarea>
                    </div>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="file_upload"
                      onChange={this.onChange}
                    />
                    <div className="progressBar">
                      <label className="uploading" id="uploading">
                        Uploading...
                      </label>
                      <label className="complete" id="complete">
                        Complete!
                      </label>
                      <label className="error" id="error">
                        Error!
                      </label>
                      <progress value="0" max="100" id="uploader">
                        0%
                      </progress>
                    </div>
                    <div className="file_upload_label">
                      <label htmlFor="file">Upload Document</label>
                    </div>
                    <br />
                    <input
                      type="submit"
                      className="submit-details"
                      value="Submit"
                      id="submitBtn"
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
                    <div className="FailedTagForm">
                      {" "}
                      Failed! Something is not right...
                    </div>
                  )}
                </div>
              )}
            </Mutation>
            <div className="explainInput">
              <h3>Resume Redraft Form</h3>
              <p>
                The information to be collected from this form would be used as
                a basis for your Statement of Purpose.
              </p>
              <span className="required">* Required</span>
              <ul>
                <li>
                  <h6>Name (Surname First)*</h6>
                  <p>
                    Provide your full name, address, phone and correctly answer
                    the fields after<i>Your Surname should come first</i>
                  </p>
                </li>
                <li>
                  <h6>
                    Which Employment is most relevant to you Masters
                    Application?(Include Dates *
                  </h6>
                  <p>
                    Please provide the name of the Organization and your Role
                    there. e.g. Laboratory Analyst at Unilever
                  </p>
                </li>
                <li>
                  <h6>
                    What were your typical achievements which relates to your
                    Proposed Masters application ?
                  </h6>
                  <p>Please list the top 3</p>
                </li>
                <li>
                  <h6>Scholarships and Awards (Awarding Body, Dates)</h6>
                  <p>e.g. Chevron Undergraduate Scholarships, July 2015</p>
                </li>
                <li>
                  <h6>
                    What are your top 5 courses at your Undegraduate level
                    relating to your Masters of interest?
                  </h6>
                </li>
                <li>
                  <h6>
                    What was your project/dissertation name at Undergraduate
                    level and Grade achieved in percentage? *
                  </h6>
                </li>
                <li>
                  <h6>
                    What is the name of your most recent Undergraduate
                    education? (Include Dates) *
                  </h6>
                </li>
                <li>
                  <h6>
                    What was your final grade at Undergraduate level? (List
                    final grade as provided on your final transcript or result)
                    *
                  </h6>
                </li>
                <li>
                  <h6>
                    What are your top 5 courses at Undergraduate relating to
                    your PhD of interest?
                  </h6>
                </li>
                <li>
                  <h6>
                    What was your project/dissertation name at Undergraduate
                    level and Grade achieved in percentage?
                  </h6>
                </li>
                <li>
                  <h6>Leadership Experiences (Include Dates)</h6>
                  <p>
                    List top 3 roles or leadership experiences relevant to your
                    proposed Masters, including achievements and contexts. e.g
                    Science Club President, University of Villanova (2013) -
                    Organised first Industry-university symbiosis lecture on
                    novel algae forms for gastrointestinal remediation
                  </p>
                </li>
                <li>
                  <h6>
                    Extracurricular Activities and Memberships (Include Dates)
                  </h6>
                  <p>List all sports, clubs and society memberships</p>
                </li>
                <li>
                  <h6>
                    Professional Workshops and Trainings (Organizer and Dates)
                  </h6>
                  <p>
                    e.g. Conflict Management and Communication Improvement,
                    Toastmasters USA, July 12th -13th, 2015
                  </p>
                </li>
                <li>
                  <h6>
                    Academic Conferences Attended (Organising body and Dates)
                  </h6>
                </li>
                <li>
                  <h6>Certifications and Dates</h6>
                  <p>e.g. CFA Level 1 (July 2012)</p>
                </li>
                <li>
                  <h6>Masters Intended Area of Research</h6>
                </li>
                <li>
                  <h6>University of Choice and Course</h6>
                </li>
                <li>
                  <h6>
                    Possible modules interested in at first choice university
                    course?
                  </h6>
                  <p>
                    e.g. University College London; Engineering Mechanics; Low
                    Carbon Energy Management; Advanced Physics
                  </p>
                </li>
                <li>
                  <h6>
                    Teaching personnel/ Faculties Contacted at Institutions
                  </h6>
                </li>

                <li>
                  <h6>Summary of your interest</h6>
                  <p>
                    Try to describe in few words, what you want to do and
                    experiences that sparked the interest. e.g. I am interested
                    in the concept of poverty alleviation through
                    entrepreneurship. My experience working at 'workplace 1',
                    allowed me to see the full picture of the consequences of
                    unequal wealth distributions in most parts of emerging
                    economies, and by studying the Masters at 'University' I
                    believe I will be equipped with he right tools to tackle
                    this challenges
                  </p>
                </li>
                <li>
                  <h6>Post Study Goals (Career Ambitions)</h6>
                  <p>
                    What do you possibly want to do afterwards ? and what
                    industries? Be as clear as possible. For example ''In the
                    short-term Strategic Consultant in Waste and Water
                    management at top consulting firm (insert Mckinsey. BCG, AT
                    Kearney), or general environmental issues. Longer term,
                    seeking to open a consultancy targeted at helping small
                    scale industries in manufacturing, production, become
                    profitable through efficient transformations of their waste
                    processes.''
                  </p>
                </li>
                <li>
                  <h6>
                    Referees (List Names, Addresses, Phone Numbers and Emails)
                  </h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return <ThankYou form_id={this.state.data.form_id} />
    }
  }
}
