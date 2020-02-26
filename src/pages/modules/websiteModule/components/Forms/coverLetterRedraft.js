import React from "react"
import { Mutation } from "react-apollo"
import {
  CREATE_COVER_LETTER_REDRAFT,
  CREATE_PACKAGE,
} from "../../../../graphql/mutations"
import {
  Callout,
  Spinner,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Icon,
  ButtonGroup,
  Alert,
} from "@blueprintjs/core"
import SimpleReactValidator from "simple-react-validator"

const initialState = {
  data: {
    name: "",
    address: "",
    phone: null,
    workplace_1: null,
    workplace_1_roles: null,
    workplace_1_recognized_job: null,
    workplace_2: null,
    workplace_2_roles: null,
    workplace_2_recognized_job: null,
    supervised_before: null,
    supervised_workplace: null,
    recent_tertiary_institute: null,
    number_of_employee_supervised_workplace_1: null,
    number_of_employee_supervised_workplace_2: null,
    recent_tertiary_institute_name: null,
    scholarship_and_awards: null,
    final_grade_school_1: null,
    result_rank_school_1: null,
    top_courses_school_1: null,
    project_dissertation_name_school_1: null,
    next_most_recent_tertiary_education: null,
    final_grade_school_2: null,
    result_rank_school_2: null,
    top_courses_school_2: null,
    leadership_experience: null,
    interpersonal_skills: false,
    presentation_skills: false,
    programming: false,
    microsoft_excel: false,
    java: false,
    other_skills: null,
    extracurricular_activities: null,
    professional_workshops: null,
    certification_dates: null,
    organization_contacted_before_hand: null,
    summary_of_interest: null,
    attached_file: "empty",
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

export default class CoverLetterRedraft extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.validator = new SimpleReactValidator({ autoForceUpdate: this })
    this.handleFormInput = this.handleFormInput.bind(this)
    this.onChange = this.onChange.bind(this)
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

  PrevTertiary = e => {
    let value = e.target.value
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        recent_tertiary_institute: value,
      },
    }))
  }

  resultRankSchool1 = e => {
    let value = e.target.value
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        result_rank_school_1: value,
      },
    }))
  }

  resultRankSchool2 = e => {
    let value = e.target.value
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        result_rank_school_2: value,
      },
    }))
  }

  supervisedBefore = e => {
    let value = e.target.value
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        supervised_before: value,
      },
    }))
  }

  firmSupervised = e => {
    let value = e.target.value
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        supervised_workplace: value,
      },
    }))
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
        console.log("Upload is " + progress + "% done")
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
                initialState,
              })
              this.props.updatePackageList()
            }}
          >
            <span className = "completed-alert">
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
                mutation={CREATE_COVER_LETTER_REDRAFT}
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
                {(createCoverLetterRedraftData, { error }) => (
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
                        if (this.validator.allValid()) {
                          createCoverLetterRedraftData({
                            variables: this.state.data,
                          })
                        } else {
                          this.validator.showMessages()
                          this.setState({
                            loading: false,
                          })
                          this.forceUpdate()
                        }
                      }}
                      ref={form => (this.form = form)}
                      className="checkout-form-container"
                    >
                      <h3 className="form-header header-message">
                        Please the form below for ({" "}
                        {this.props.packageDetail.title} )
                      </h3>
                      <div className="row-full">
                        <input
                          type="text"
                          placeholder="Name (Surname First)"
                          id="name"
                          name="name"
                          onBlur={() => this.validator.showMessageFor("name")}
                          onChange={this.handleFormInput}
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
                          placeholder="Address"
                          id="address"
                          name="address"
                          onBlur={() =>
                            this.validator.showMessageFor("address")
                          }
                          onChange={this.handleFormInput}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "address",
                              this.state.data.address,
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
                          placeholder="Workplace 1"
                          id="workplace_1"
                          name="workplace_1"
                          onBlur={() =>
                            this.validator.showMessageFor("workplace_1")
                          }
                          onChange={this.handleFormInput}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "workplace_1",
                              this.state.data.workplace_1,
                              "required"
                            )}
                          </i>
                        </p>
                        <br />
                        <textarea
                          type="text"
                          placeholder="What was your role and your typical responsibilities?"
                          id="workplace_1_roles"
                          name="workplace_1_roles"
                          rows="4"
                          onBlur={() =>
                            this.validator.showMessageFor("workplace_1_roles")
                          }
                          onChange={this.handleFormInput}
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "workplace_1_roles",
                              this.state.data.workplace_1_roles,
                              "required"
                            )}
                          </i>
                        </p>
                        <textarea
                          type="text"
                          placeholder="Have you been recognized in this job? *"
                          id="workplace_1_recognized_job"
                          name="workplace_1_recognized_job"
                          rows="4"
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "workplace_1_recognized_job"
                            )
                          }
                          onChange={this.handleFormInput}
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "workplace_1_recognized_job",
                              this.state.data.workplace_1_recognized_job,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          placeholder="Workplace 2"
                          id="workplace_2"
                          name="workplace_2"
                          onBlur={() =>
                            this.validator.showMessageFor("workplace_2")
                          }
                          onChange={this.handleFormInput}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "workplace_2",
                              this.state.data.workplace_2,
                              "required"
                            )}
                          </i>
                        </p>
                        <br />
                        <textarea
                          type="text"
                          placeholder="What was your role and your typical responsibilities?"
                          id="workplace_2_roles"
                          name="workplace_2_roles"
                          rows="4"
                          onBlur={() =>
                            this.validator.showMessageFor("workplace_2_roles")
                          }
                          onChange={this.handleFormInput}
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "workplace_2_roles",
                              this.state.data.workplace_2_roles,
                              "required"
                            )}
                          </i>
                        </p>
                        <textarea
                          type="text"
                          placeholder="Have you been recognized in this job? *"
                          id="workplace_2_recognized_job"
                          name="workplace_2_recognized_job"
                          rows="4"
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "workplace_2_recognized_job"
                            )
                          }
                          onChange={this.handleFormInput}
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "workplace_2_recognized_job",
                              this.state.data.workplace_2_recognized_job,
                              "required"
                            )}
                          </i>
                        </p>
                        <RadioGroup
                          label="Have you supervised before?"
                          onChange={this.supervisedBefore}
                          alignIndicator="right"
                          selectedValue={this.state.data.supervised_before}
                          inline={false}
                          onBlur={() =>
                            this.validator.showMessageFor("supervised_before")
                          }
                        >
                          <Radio label="Yes" value="Yes" />
                          <Radio label="No" value="No" />
                        </RadioGroup>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "supervised_before",
                              this.state.data.supervised_before,
                              "required"
                            )}
                          </i>
                        </p>
                        <RadioGroup
                          label="If yes, in which firm(s) did you supervise?"
                          onChange={this.firmSupervised}
                          selectedValue={this.state.data.supervised_workplace}
                          inline={false}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "supervised_workplace"
                            )
                          }
                        >
                          <Radio label="Workplace 1" value="Workplace 1" />
                          <Radio label="Workplace 2" value="Workplace 2" />
                        </RadioGroup>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "supervised_workplace",
                              this.state.data.supervised_workplace,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="number"
                          name="number_of_employee_supervised_workplace_1"
                          id="number_of_employee_supervised_workplace_1"
                          placeholder="How many employees did you supervise in Workplace 1? *"
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "number_of_employee_supervised_workplace_1"
                            )
                          }
                          onChange={this.handleFormInput}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "number_of_employee_supervised_workplace_1",
                              this.state.data
                                .number_of_employee_supervised_workplace_1,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="number"
                          name="number_of_employee_supervised_workplace_2"
                          id="number_of_employee_supervised_workplace_2"
                          placeholder="How many employees did you supervise in Workplace 2?"
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "number_of_employee_supervised_workplace_2"
                            )
                          }
                          onChange={this.handleFormInput}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "number_of_employee_supervised_workplace_2",
                              this.state.data
                                .number_of_employee_supervised_workplace_2,
                              "required"
                            )}
                          </i>
                        </p>
                        <RadioGroup
                          label="Most recent tertiary education"
                          onChange={this.PrevTertiary}
                          selectedValue={
                            this.state.data.recent_tertiary_institute
                          }
                          inline={false}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "recent_tertiary_institute"
                            )
                          }
                        >
                          <Radio label="Phd" value="Phd" />
                          <Radio label="MSc." value="MSc." />
                          <Radio label="Bachelors/HND" value="Bachelors/HND" />
                          <Radio label="O' Level" value="O' Level" />
                        </RadioGroup>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "recent_tertiary_institute",
                              this.state.data.recent_tertiary_institute,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          name="recent_tertiary_institute_name"
                          id="recent_tertiary_institute_name"
                          placeholder="Name of most recent tertiary education?"
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "recent_tertiary_institute_name"
                            )
                          }
                          onChange={this.handleFormInput}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "recent_tertiary_institute_name",
                              this.state.data.recent_tertiary_institute_name,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          name="scholarship_and_awards"
                          id="scholarship_and_awards"
                          placeholder=" Scholarships and Awards (Awarding Body, Dates)"
                          onChange={this.handleFormInput}
                          onBlur={() => this.validator.showMessageFor("name")}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "scholarship_and_awards",
                              this.state.data.scholarship_and_awards,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="number"
                          name="final_grade_school_1"
                          id="final_grade_school_1"
                          placeholder=" Final grade at School 1"
                          onBlur={() => this.validator.showMessageFor("name")}
                          onChange={this.handleFormInput}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "final_grade_school_1",
                              this.state.data.final_grade_school_1,
                              "required"
                            )}
                          </i>
                        </p>
                        <RadioGroup
                          label="How do you rank your result in your overall graduating
                          class at School 1?"
                          onChange={this.resultRankSchool1}
                          selectedValue={this.state.data.result_rank_school_1}
                          inline={false}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "result_rank_school_1"
                            )
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
                              "result_rank_school_1",
                              this.state.data.result_rank_school_1,
                              "required"
                            )}
                          </i>
                        </p>
                        <textarea
                          type="text"
                          id="top_courses_school_1"
                          name="top_courses_school_1"
                          placeholder="Top 5 courses at School 1"
                          onChange={this.handleFormInput}
                          onBlur={() => this.validator.showMessageFor("name")}
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "top_courses_school_1",
                              this.state.data.top_courses_school_1,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          id="project_dissertation_name_school_1"
                          name="project_dissertation_name_school_1"
                          placeholder="Your project/dissertation name at School 1"
                          onChange={this.handleFormInput}
                          onBlur={() => this.validator.showMessageFor("name")}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "project_dissertation_name_school_1",
                              this.state.data
                                .project_dissertation_name_school_1,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          id="next_most_recent_tertiary_education"
                          name="next_most_recent_tertiary_education"
                          placeholder="Name of your next most recent tertiary education"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "next_most_recent_tertiary_education"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "next_most_recent_tertiary_education",
                              this.state.data
                                .next_most_recent_tertiary_education,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="number"
                          id="final_grade_school_2"
                          name="final_grade_school_2"
                          placeholder="Your final grade at School 2?"
                          onChange={this.handleFormInput}
                          onBlur={() => this.validator.showMessageFor("name")}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "final_grade_school_2",
                              this.state.data.final_grade_school_2,
                              "required"
                            )}
                          </i>
                        </p>
                        <br />
                        <RadioGroup
                          label="How do you rank your result in your overall graduating
                          class at School 2?"
                          onChange={this.resultRankSchool2}
                          selectedValue={this.state.data.result_rank_school_2}
                          inline={false}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "result_rank_school_2"
                            )
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
                              "result_rank_school_2",
                              this.state.data.result_rank_school_2,
                              "required"
                            )}
                          </i>
                        </p>
                        <textarea
                          type="text"
                          id="top_courses_school_2"
                          name="top_courses_school_2"
                          placeholder="Your top 5 courses at School 2"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "top_courses_school_2"
                            )
                          }
                        ></textarea>
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "top_courses_school_2",
                              this.state.data.top_courses_school_2,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          placeholder="Leadership Experiences"
                          id="leadership_experience"
                          name="leadership_experience"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "leadership_experience"
                            )
                          }
                        />
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
                          <label>Your Skills? *</label>
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
                          onChange={this.handleFormInput}
                        />
                        <input
                          type="text"
                          id="extracurricular_activities"
                          name="extracurricular_activities"
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
                          id="professional_workshops"
                          name="professional_workshops"
                          placeholder="Professional Workshops"
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
                          id="certification_dates"
                          name="certification_dates"
                          placeholder="Certifications and Dates"
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor("certification_dates")
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "certification_dates",
                              this.state.data.certification_dates,
                              "required"
                            )}
                          </i>
                        </p>
                        <input
                          type="text"
                          id="organization_contacted_before_hand"
                          name="organization_contacted_before_hand"
                          placeholder="Employees at Organization Contacted Before Hand"
                          onChange={this.handleFormInput}
                          onBlur={() => this.validator.showMessageFor("name")}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "organization_contacted_before_hand",
                              this.state.data
                                .organization_contacted_before_hand,
                              "required"
                            )}
                          </i>
                        </p>
                        <textarea
                          type="text"
                          id="summary_of_interest"
                          name="summary_of_interest"
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
                              form_type: "COVER_LETTER_REDRAFT",
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
                a basis for your resume and cover letter. For experienced
                personnel with over 5 years professional experience, just upload
                your CV. the form is not required.
              </p>
              <span className="required">* Required</span>
              <ul>
                <li>
                  <span>Name (Surname First)</span>
                  <p>
                    Provide your full name, address, phone and correctly answer
                    the fields after
                    <i>Your Surname should come first</i>
                  </p>
                </li>
                <li>
                  <span>
                    Which is your most recent Employment Relating to Job Applied
                    for? (Workplace 1) *
                  </span>
                  <p>
                    Please provide the name of your most recent employer here
                  </p>
                </li>
                <li>
                  <span>
                    What was your role and your typical responsibilities?
                    (Ignore if CV attached) *
                  </span>
                  <p>Please list the top 5</p>
                </li>
                <li>
                  <span>Have you been recognized in this job? *</span>
                  <p>
                    Please list top 3 achievements. For example, 'Achieved 45%
                    increase in revenues by creating new social media platform
                    to connect with new customer segments'
                  </p>
                </li>
                <li>
                  <span>
                    Which is your second most recent employer? (Workplace 2)
                  </span>
                  <p>Please provide the name</p>
                </li>
                <li>
                  <span>
                    What was your role and your typical responsibilities?(Ignore
                    if CV attached)
                  </span>
                  <p>Please list the top 5</p>
                </li>
                <li>
                  <span>Have you been recognized in this job?</span>
                  <p>
                    Please list top 3 achievements. For example, 'Achieved 45%
                    increase in revenues by creating new social media platform
                    to connect with new customer segments'
                  </p>
                </li>
                <li>
                  <span>
                    How many employees did you supervise in Workplace 1? *
                  </span>
                  <p>
                    If you don't have specifics, feel free to provide a range.
                    e.g 15 - 20
                  </p>
                </li>
                <li>
                  <span>
                    How many employees did you supervise in Workplace 2?
                  </span>
                  <p>Feel free to provide a range</p>
                </li>
                <li>
                  <span>
                    What is the name of your most recent tertiary education?
                    (Ignore if contained in CV attached) *
                  </span>
                  <p>Feel free to provide a range</p>
                </li>
                <li>
                  <span>Scholarships and Awards (Awarding Body, Dates)</span>
                  <p>e.g. Chevron Undergraduate Scholarships, July 2015</p>
                </li>
                <li>
                  <span>
                    What was your final grade at School 1? (Ignore if contained
                    in CV attached)
                  </span>
                </li>
                <li>
                  <span>
                    What are your top 5 courses at School 1 relating to your job
                    of interest?
                  </span>
                </li>
                <li>
                  <span>
                    What was your project/dissertation name at School 1 and
                    Grade achieved in percentage? *
                  </span>
                </li>
                <li>
                  <span>
                    What is the name of your next most recent tertiary
                    education? (Ignore if contained in CV attached) *
                  </span>
                </li>
                <li>
                  <span>
                    What was your final grade at School 2? (List final grade as
                    provided on your final transcript or result) *
                  </span>
                </li>
                <li>
                  <span>
                    What are your top 5 courses at School 2 relating to your job
                    of interest?
                  </span>
                </li>
                <li>
                  <span>
                    Extracurricular Activities and Memberships (List all sports,
                    clubs and society memberships)
                  </span>
                </li>
                <li>
                  <span>
                    Professional Workshops and Trainings (Organizer and Dates)
                  </span>
                  <p>
                    e.g. Conflict Management and Communication Improvement,
                    Toastmasters USA, July 12th -13th, 2015
                  </p>
                </li>

                <li>
                  <span>Certifications and Dates</span>
                  <p>e.g. CFA Level 1 (July 2012)</p>
                </li>

                <li>
                  <span>Employees at Organization Contacted Before Hand</span>
                </li>
                <li>
                  <span>Summary of your interest</span>
                  <p>
                    Try to describe in few words, what you want to do and
                    experiences that sparked the interest. e.g. I am interested
                    in the concept of poverty alleviation through
                    entrepreneurship. My experience working at 'workplace 1',
                    allowed me to see the full picture of the consequences of
                    unequal wealth distributions in most parts of emerging
                    economies, and by studying the PhD/Masters at 'University' I
                    believe I will be equipped with he right tools to tackle
                    this challenges
                  </p>
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
