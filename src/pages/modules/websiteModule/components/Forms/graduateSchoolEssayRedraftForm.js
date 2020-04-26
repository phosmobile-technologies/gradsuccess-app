import React from "react"
import { navigate } from "gatsby"
import { Mutation } from "react-apollo"
import {
  CREATE_GRADUATE_SCHOOL_ESSAY_REDRAFT,
  CREATE_PACKAGE,
} from "../../../../graphql/mutations"
import {
  Checkbox,
  RadioGroup,
  Radio,
  Callout,
  Spinner,
  Button,
  Icon,
  ButtonGroup,
  Alert,
} from "@blueprintjs/core"
import SimpleReactValidator from "simple-react-validator"
import { swal } from 'sweetalert';
const initialState = {
  data: {
    name: null,
    phone: null,
    employment_most_relevant_to_you_masters_application: null,
    typical_achievements: null,
    scholarships_and_award: null,
    undergraduate_level_courses_master: null,
    project_dissertation_name_master: null,
    most_recent_undergraduate: null,
    undergraduate_level_grade: null,
    result_ranking: null,
    undergraduate_level_courses_phd: null,
    project_dissertation_name_phd: null,
    leadership_experience: null,
    interpersonal_skills: false,
    presentation_skills: false,
    programming: false,
    microsoft_excel: false,
    java: false,
    other_skills: null,
    extracurricular_activities: null,
    professional_workshops: null,
    academic_conferences_attended: null,
    certificate: null,
    english: false,
    french: false,
    german: false,
    spanish: false,
    nigeria_languages: false,
    other_languages: null,
    masters_intended_area_of_research: null,
    university_of_choice_and_course: null,
    modules_interested: null,
    teaching_personnel_contacted: null,
    summary_of_interest: null,
    post_study_goal: null,
    referee: null,
    attached_file: "empty",
    package: null,
    assigned_associate_id: null,
    user_id: null,
    package_id: null,
    status: "New",
    uploadProgress: 0,
    showUploadProgress: false,
    uploadedFile: false,
    alterUpload: "",
  },
  loading: false,
}

export default class GraduateSchoolEssayRedraft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
    }
    this.validator = new SimpleReactValidator({ autoForceUpdate: this })
    this.handleFormInput = this.handleFormInput.bind(this)
    this.onChange = this.onChange.bind(this)
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

  handleClassLevel = e => {
    let value = e.target.value
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        result_ranking: value,
      },
    }))
  }
  componentDidMount() {
     if (this.props.assignedAssociate) {
       this.setState(prevState => ({
         data: {
           ...prevState.data,
           assigned_associate_id: this.props.assignedAssociate,
           status: "Assigned",
         },
       }))
     }
  }

  onChange(e) {
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
    let CVName = this.state.data.name.replace(/\s+/g, "_")
    let timeSubmitted = new Date().getTime()
    var file = document.getElementById("file").files[0]
    let fileRef =
      "uploaded_file/" + CVName + "_" + timeSubmitted + "_" + file.name

    var storageRef = firebase.storage().ref(fileRef)
    var task = storageRef.put(file)

    task.on(
      "state_changed",
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const uploader = document.getElementById("uploader")
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploader.value = progress

        if (this.state.alterUpload === "Pause") {
          task.pause()
        }
        if (this.state.alterUpload === "Stop") {
          task.stop()
        }
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused")
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running")
            break
          default:
            break
        }
      },
      error => {
        alert("false to upload file please try again")
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.setState(prevState => ({
            data: {
              ...prevState.data,
              attached_file: downloadURL,
            },
            uploadedFile: true,
            showUploadProgress: false,
          }))
        })
      }
    )
  }

  render() {

    if (this.props.packageDetail) {
      return (
        <div>
          <Alert
            isOpen={this.state.completed}
            confirmButtonText="Continue"
            onClose={() => {
              this.setState({
                completed: false,
              })

              this.props.updatePackageList()
            }}
          >
            <span className="completed-alert">
              form Details submitted sucessfully, pls filled the next form if
              your sellected multiple package
            </span>
          </Alert>
          <div className="detail-form">
            {this.state.loading && (
              <div className="spinner-loader-bg">
                <Spinner className="bp3-intent-success" />
              </div>
            )}
            <div>
              <Callout className="bp3-intent-primary forms-indicator">
                {this.props.currentFormNumber} of {this.props.numberOfPackages}
              </Callout>
              <Mutation
                mutation={CREATE_GRADUATE_SCHOOL_ESSAY_REDRAFT}
                onError={() => {
                  this.setState({
                    loading: false,
                  })
                }}
                onCompleted={data => {
                  this.setState(
                    {
                      loading: false,
                    },
                    () => {
                      this.setState({
                        completed: true,
                      })
                    }
                  )
                }}
              >
                {(createGraduateSchoolEssayRedraft, { error }) => (
                  <div className="loader-wrapper">
                    {error && (
                      <Callout className="bp3-intent-danger" icon="error">
                        {error.graphQLErrors.map(({ message }, i) => (
                          <span color="danger" key={i}>
                            {message}
                          </span>
                        ))}
                      </Callout>
                    )}
                    <form
                      onSubmit={e => {
                        e.preventDefault()
                        createGraduateSchoolEssayRedraft({
                          variables: this.state.data,
                        })
                      }}
                      ref={form => (this.form = form)}
                      className="checkout-form-container"
                    >
                      <h3 className="form-header header-message">
                        Please fill the form below for ({" "}
                        {this.props.packageDetail.title} )
                      </h3>
                      <div className="row-full">
                        <input
                          type="text"
                          placeholder="Name (Surname First)"
                          name="name"
                          value={this.state.data.name}
                          onBlur={() => this.validator.showMessageFor("name")}
                          onChange={this.handleFormInput}
                          id="name"
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "name",
                              this.state.data.name,
                              "required"
                            )}
                          </i>
                        </p>
                        <br />

                        <input
                          type="text"
                          placeholder="Phone"
                          id="phone"
                          name="phone"
                          value={this.state.data.phone}
                          required
                          onBlur={() => this.validator.showMessageFor("phone")}
                          onChange={this.handleFormInput}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "phone",
                              this.state.data.phone,
                              "required"
                            )}
                          </i>
                        </p>
                        <br />
                        <input
                          type="text"
                          placeholder="Which Employment is most relevant to your Masters Application"
                          id="employment_most_relevant_to_you_masters_application"
                          name="employment_most_relevant_to_you_masters_application"
                          value={
                            this.state.data
                              .employment_most_relevant_to_you_masters_application
                          }
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "employment_most_relevant_to_you_masters_application"
                            )
                          }
                          onChange={this.handleFormInput}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "employment_most_relevant_to_you_masters_application",
                              this.state.data
                                .employment_most_relevant_to_you_masters_application,
                              "required"
                            )}
                          </i>
                        </p>
                        <br />
                        <input
                          type="text"
                          placeholder="What were your typical achievements"
                          id="typical_achievements"
                          name="typical_achievements"
                          value={this.state.data.typical_achievements}
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "typical_achievements"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "typical_achievements",
                              this.state.data.typical_achievements,
                              "required"
                            )}
                          </i>
                        </p>
                        <br />
                        <input
                          type="text"
                          className=""
                          placeholder="Scholarships and Awards (Awarding Body, Dates)"
                          id="scholarships_and_award"
                          name="scholarships_and_award"
                          value={this.state.data.scholarships_and_award}
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "scholarships_and_award"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "scholarships_and_award",
                              this.state.data.scholarships_and_award,
                              "required"
                            )}
                          </i>
                        </p>
                        <br />
                        <textarea
                          type="text"
                          placeholder="What are your top 5 courses at your Undegraduate level relating to your Masters of interest?"
                          id="undergraduate_level_courses_master"
                          name="undergraduate_level_courses_master"
                          rows="4"
                          value={
                            this.state.data.undergraduate_level_courses_master
                          }
                          onChange={this.handleFormInput}
                          onBlur={() => this.validator.showMessageFor("name")}
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "undergraduate_level_courses_master",
                              this.state.data
                                .undergraduate_level_courses_master,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          id="project_dissertation_name_master"
                          name="project_dissertation_name_master"
                          placeholder="What was your project/dissertation name *"
                          onChange={this.handleFormInput}
                          value={
                            this.state.data.project_dissertation_name_master
                          }
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "project_dissertation_name_master"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "project_dissertation_name_master",
                              this.state.data.project_dissertation_name_master,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          id="most_recent_undergraduate"
                          name="most_recent_undergraduate"
                          placeholder="What is the name of your most recent Undergraduate Education * "
                          onChange={this.handleFormInput}
                          value={this.state.data.most_recent_undergraduate}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "most_recent_undergraduate"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "most_recent_undergraduate",
                              this.state.data.most_recent_undergraduate,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          id="undergraduate_level_grade"
                          name="undergraduate_level_grade"
                          placeholder="What was your final grade at Undergraduate level?  *"
                          onChange={this.handleFormInput}
                          value={this.state.data.undergraduate_level_grade}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "undergraduate_level_grade"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "undergraduate_level_grade",
                              this.state.data.undergraduate_level_grade,
                              "required"
                            )}
                          </i>
                        </p>
                        <RadioGroup
                          label="How do you rank your result in your overall graduating
                        class at Undergraduate level?"
                          onChange={this.handleClassLevel}
                          selectedValue={this.state.data.result_ranking}
                          inline={false}
                          onBlur={() =>
                            this.validator.showMessageFor("result_ranking")
                          }
                        >
                          <Radio label="Top 5%" value="Top 5%" />
                          <Radio label="Top 10%" value="Top 10%" />

                          <Radio label="Top 20%" value="Top 20%" />
                          <Radio label="Top 50%" value="Top 50%" />
                        </RadioGroup>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "result_ranking",
                              this.state.data.result_ranking,
                              "required"
                            )}
                          </i>
                        </p>
                        <textarea
                          type="text"
                          placeholder="What are your top 5 courses at Undergraduate relating to your PhD of interest?"
                          id="undergraduate_level_courses_phd"
                          name="undergraduate_level_courses_phd"
                          value={
                            this.state.data.undergraduate_level_courses_phd
                          }
                          onChange={this.handleFormInput}
                          rows="4"
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "undergraduate_level_courses_phd"
                            )
                          }
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "undergraduate_level_courses_phd",
                              this.state.data.undergraduate_level_courses_phd,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          id="project_dissertation_name_phd"
                          name="project_dissertation_name_phd"
                          placeholder="What was your project/dissertation name at Undergraduate level"
                          onChange={this.handleFormInput}
                          value={this.state.data.project_dissertation_name_phd}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "project_dissertation_name_phd"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "project_dissertation_name_phd",
                              this.state.data.project_dissertation_name_phd,
                              "required"
                            )}
                          </i>
                        </p>
                        <textarea
                          type="text"
                          placeholder="Leadership Experiences (Include Dates)"
                          id="leadership_experience"
                          name="leadership_experience"
                          value={this.state.data.leadership_experience}
                          rows="4"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "leadership_experience"
                            )
                          }
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "leadership_experience",
                              this.state.data.leadership_experience,
                              "required"
                            )}
                          </i>
                        </p>

                        <div className="selectibleList">
                          <label>Your Skills?</label>
                          <Checkbox
                            id="interpersonal_skills"
                            name="interpersonal_skills"
                            checked={this.state.interpersonal_skills}
                            label="Interpersonal Skills"
                            onChange={this.handleFormInput}
                            alignIndicator="right"
                          />

                          <Checkbox
                            id="presentation_skills"
                            name="presentation_skills"
                            checked={this.state.interpersonal_skills}
                            onChange={this.handleFormInput}
                            label="Presentation Skills"
                            alignIndicator="right"
                          />

                          <Checkbox
                            id="programming"
                            name="programming"
                            checked={this.state.programming}
                            onChange={this.handleFormInput}
                            label="Programming (provide details in comment box below)"
                            alignIndicator="right"
                          />

                          <Checkbox
                            id="microsoft_excel"
                            name="microsoft_excel"
                            checked={this.state.microsoft_excel}
                            onChange={this.handleFormInput}
                            label="Microsoft Excel"
                            alignIndicator="right"
                          />

                          <Checkbox
                            id="java"
                            name="java"
                            checked={this.state.java}
                            onChange={this.handleFormInput}
                            label="JAVA"
                            alignIndicator="right"
                          />
                        </div>
                        <input
                          type="text"
                          id="other_skills"
                          name="other_skills"
                          placeholder="Other Skills"
                          value={this.state.data.other_skills}
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor("other_skills")
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "other_skills",
                              this.state.data.other_skills,
                              "required"
                            )}
                          </i>
                        </p>

                        <input
                          type="text"
                          name="extracurricular_activities"
                          id="extracurricular_activities"
                          value={this.state.data.extracurricular_activities}
                          placeholder="Extracurricular Activities"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "extracurricular_activities"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "extracurricular_activities",
                              this.state.data.extracurricular_activities,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          name="professional_workshops"
                          id="professional_workshops"
                          placeholder="Professional Workshops"
                          value={this.state.data.professional_workshops}
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "professional_workshops"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "professional_workshops",
                              this.state.data.professional_workshops,
                              "required"
                            )}
                          </i>
                        </p>

                        <input
                          type="text"
                          placeholder="Certifications and Dates"
                          id="academic_conferences_attended"
                          name="academic_conferences_attended"
                          value={this.state.data.academic_conferences_attended}
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "academic_conferences_attended"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "academic_conferences_attended",
                              this.state.data.academic_conferences_attended,
                              "required"
                            )}
                          </i>
                        </p>

                        <input
                          type="text"
                          placeholder="Certifications and Dates"
                          id="certificate"
                          name="certificate"
                          value={this.state.data.certificate}
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor("certificate")
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "certificate",
                              this.state.data.certificate,
                              "required"
                            )}
                          </i>
                        </p>

                        <div className="selectibleList">
                          <label>
                            Language at atleast Intermediate level (Good
                            Writing/Good Understanding/Average Speaking) *
                          </label>

                          <Checkbox
                            name="english"
                            id="english"
                            checked={this.state.data.english}
                            onChange={this.handleFormInput}
                            label="English"
                            alignIndicator="right"
                          />

                          <Checkbox
                            name="french"
                            id="french"
                            checked={this.state.data.french}
                            onChange={this.handleFormInput}
                            label="French"
                            alignIndicator="right"
                          />

                          <Checkbox
                            name="german"
                            id="german"
                            checked={this.state.data.german}
                            onChange={this.handleFormInput}
                            label="German"
                            alignIndicator="right"
                          />
                          <Checkbox
                            name="spanish"
                            id="spanish"
                            checked={this.state.data.spanish}
                            onChange={this.handleFormInput}
                            label="Spanish"
                            alignIndicator="right"
                          />
                        </div>
                        <section>
                          <label className="other_languages">
                            Nigerian Language other than Native (Please describe
                            in 'other' below)
                          </label>
                          <input
                            type="text"
                            id="other_languages"
                            name="other_languages"
                            value={this.state.data.other_languages}
                            placeholder="Other Languages"
                            onChange={this.handleFormInput}
                            className="other_languages_input"
                            onBlur={() => this.validator.showMessageFor("name")}
                          />
                          <p className="error_message">
                            <i>
                              {this.validator.message(
                                "name",
                                this.state.data.name,
                                "required"
                              )}
                            </i>
                          </p>
                        </section>

                        <input
                          type="text"
                          id="masters_intended_area_of_research"
                          name="masters_intended_area_of_research"
                          value={
                            this.state.data.masters_intended_area_of_research
                          }
                          placeholder="Masters Intended Area of Research"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "masters_intended_area_of_research"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "masters_intended_area_of_research",
                              this.state.data.masters_intended_area_of_research,
                              "required"
                            )}
                          </i>
                        </p>

                        <input
                          type="text"
                          id="university_of_choice_and_course"
                          name="university_of_choice_and_course"
                          value={
                            this.state.data.university_of_choice_and_course
                          }
                          placeholder="University of Choice and Course"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "university_of_choice_and_course"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "university_of_choice_and_course",
                              this.state.data.university_of_choice_and_course,
                              "required"
                            )}
                          </i>
                        </p>

                        <input
                          type="text"
                          id="modules_interested"
                          name="modules_interested"
                          value={this.state.data.modules_interested}
                          placeholder="Possible modules interested in at first choice university course?"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor("modules_interested")
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "modules_interested",
                              this.state.data.modules_interested,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          id="teaching_personnel_contacted"
                          name="teaching_personnel_contacted"
                          value={this.state.data.teaching_personnel_contacted}
                          placeholder="Teaching personnel/ Faculties Contacted at Institutions"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "teaching_personnel_contacted"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "teaching_personnel_contacted",
                              this.state.data.teaching_personnel_contacted,
                              "required"
                            )}
                          </i>
                        </p>

                        <textarea
                          type="text"
                          id="summary_of_interest"
                          name="summary_of_interest"
                          value={this.state.data.summary_of_interest}
                          placeholder="Summary of your interest"
                          rows="4"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor("summary_of_interest")
                          }
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "summary_of_interest",
                              this.state.data.summary_of_interest,
                              "required"
                            )}
                          </i>
                        </p>
                        <textarea
                          type="text"
                          id="post_study_goal"
                          name="post_study_goal"
                          placeholder="Post Study Goals (Career Ambitions)"
                          rows="4"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor("post_study_goal")
                          }
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "post_study_goal",
                              this.state.data.post_study_goal,
                              "required"
                            )}
                          </i>
                        </p>
                        <textarea
                          type="text"
                          id="referee"
                          name="referee"
                          placeholder="Referees (List Names, Addresses, Phone Numbers and Emails)"
                          rows="4"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor("referee")
                          }
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "referee",
                              this.state.data.referee,
                              "required"
                            )}
                          </i>
                        </p>
                      </div>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        className="file_upload"
                        onChange={this.onChange}
                      />
                      {this.state.showUploadProgress && (
                        <div className="p-bar">
                          <progress value="0" max="100" id="uploader">
                            0%
                          </progress>
                        </div>
                      )}
                      {this.state.uploadedFile ? (
                        <div className="attach_file_success">
                          <label>
                            <Icon icon="tick" iconSize={20} color="green" />{" "}
                            File Uploaded Successfully
                          </label>
                        </div>
                      ) : (
                        <div className="attach_file">
                          <label htmlFor="file">
                            <Icon
                              icon="cloud-upload"
                              iconSize={15}
                              color="black"
                            />{" "}
                            Attach a file
                          </label>
                        </div>
                      )}
                      {this.state.showUploadProgress && (
                        <div className="btn-group">
                          <ButtonGroup minimal={true}>
                            <Button
                              icon="pause"
                              className="bp3-small"
                              onClick={() => {
                                this.setState({
                                  alterUpload: "Pause",
                                })
                              }}
                            >
                              Pause
                            </Button>
                            <Button
                              icon="error"
                              className="bp3-small"
                              onClick={() => {
                                this.setState({
                                  alterUpload: "Stop",
                                })
                              }}
                            >
                              Cancel
                            </Button>
                          </ButtonGroup>
                        </div>
                      )}
                      <br />
                    </form>
                  </div>
                )}
              </Mutation>
              <Mutation
                mutation={CREATE_PACKAGE}
                onError={() => {
                  this.setState({
                    loading: false,
                  })
                }}
                onCompleted={data => {
                  this.setState(
                    prevState => ({
                      data: {
                        ...prevState.data,
                        user_id: this.props.user_id,
                        package_id: data.CreatePackage.id,
                      },
                    }),
                    () => {
                      this.form.dispatchEvent(new Event("submit"))
                    }
                  )
                }}
              >
                {(createPackage, { error }) => (
                  <div className="loader-wrapper">
                    <form
                      onSubmit={e => {
                        e.preventDefault()
                        if (this.validator.allValid()) {
                          this.setState({
                            loading: true,
                          })
                          createPackage({
                            variables: {
                              package_name: this.props.packageDetail.title,
                              turn_around_time: this.props.packageDetail
                                .turnAroundTime,
                              amount: this.props.packageDetail.price,
                              form_type: "GRADUATE_SCHOOL_ESSAY_REDRAFT",
                            },
                          })
                        } else {
                          this.validator.showMessages()
                          this.setState({
                            loading: false,
                          })
                          this.forceUpdate()
                        }
                      }}
                      className="checkout-form-container"
                    >
                      <div>
                        <input
                          type="submit"
                          className="submit-details"
                          value="Submit"
                          id="submitBtn"
                        />
                      </div>
                    </form>

                    {error && (
                      <Callout className="bp3-intent-danger" icon="error">
                        {error.graphQLErrors.map(({ message }, i) => (
                          <span color="danger" key={i}>
                            {message}
                          </span>
                        ))}
                      </Callout>
                    )}
                  </div>
                )}
              </Mutation>
            </div>
            <div className="explainInput">
              <h3>{this.props.packageDetail.title}</h3>
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
      return <div></div>
    }
    
  }
}
