import React from "react"
import { Mutation } from "react-apollo"
import {
  CREATE_RESUME_REVIEW,
  CREATE_PACKAGE,
} from "../../../../graphql/mutations"
import {
  Callout,
  Spinner,
  Button,
  Icon,
  ButtonGroup,
  Alert,
} from "@blueprintjs/core"
import SimpleReactValidator from "simple-react-validator"

const initialState = {
  data: {
    name: "empty",
    industry_applied_for: "empty",
    summary_of_interest: "empty",
    attached_file: "empty",
    assigned_associate_id: null,
    user_id: null,
    package_id: "empty",
    status: "New",
    uploadProgress: 0,
    showUploadProgress: false,
    uploadedFile: false,
    alterUpload: "",
  },
  loading: false,
}

export default class ResumeReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
    })
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
          <div className="detail-form reviewModal">
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
                mutation={CREATE_RESUME_REVIEW}
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
                {(createResumeReviewData, { error }) => (
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
                        createResumeReviewData({
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
                          id="name"
                          value={this.state.data.name}
                          name="name"
                          onChange={this.handleFormInput}
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
                        <br />
                        <input
                          type="text"
                          className=""
                          placeholder="Industry and Role Title Applied for?"
                          id="industry_applied_for"
                          name="industry_applied_for"
                          value={this.state.data.industry_applied_for}
                          onChange={this.handleFormInput}
                          onBlur={() =>
                            this.validator.showMessageFor(
                              "industry_applied_for"
                            )
                          }
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "industry_applied_for",
                              this.state.data.industry_applied_for,
                              "required"
                            )}
                          </i>
                        </p>
                        <br />
                        <textarea
                          type="text"
                          placeholder="Summary of Interest in Role"
                          id="summary_of_interest"
                          name="summary_of_interest"
                          value={this.state.data.summary_of_interest}
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
                              form_type: "RESUME_REVIEW",
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
              <ul>
                <li>
                  <h6>Name (Surname First) *</h6>
                  <p>
                    Provide your full name.{" "}
                    <i>Your Surname should come first</i>
                  </p>
                </li>
                <li>
                  <h6>Industry and Role Title CV is Required for?  *</h6>
                  <p>
                    State the function you are applying for and the industry
                    type. e.g Financial Analyst in a Manufacturing firm
                  </p>
                </li>
                <li>
                  <h6>Summary of Interest in Role *</h6>
                  <p>
                    In short words, why are you applying to this company/role?
                    e.g. I have recently discovered the company's energy
                    management division and previous client services provided. I
                    particularly feel inspired by their ability of reducing
                    energy consumption in client a by 20% annually as reported
                    in their case study section on their website. I want to be
                    part of a team like this actively changing the world in
                    energy!
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
