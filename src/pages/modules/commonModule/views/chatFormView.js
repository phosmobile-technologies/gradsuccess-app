import React, { Component } from "react"
import { IconNames } from "@blueprintjs/icons"
import { Icon, Spinner, FileInput, Dialog } from "@blueprintjs/core"
import { Callout } from "@blueprintjs/core"
import { Mutation } from "react-apollo"
import { SAVE_MESSAGE } from "./../../../graphql/mutations"
import SimpleReactValidator from "simple-react-validator"
import { connect } from "react-redux"
import FileUploadPreview from "./FileUploadPreview"
import { CHAT_HISTORY } from "./../../../graphql/queries"


class ChatFormView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
      openDialog: false,
      file: null,
      image: null,
      showUploadProgress: false,
      fileUrl: null,
      fileType: "None",
    }
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
    })
  }

  handleFormInput = event => {
    const { name, value } = event.target
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  sendingError() {
    alert()
  }
  openImageDialog = () => {
    this.setState({
      openDialog: true,
    })
  }

  closeImageDialog = () => {
    this.setState({
      openDialog: false,
    })
  }

  fileUploaded(url, message) {
    this.setState({
      fileType: this.getFileType(this.state.file),
    })

    this.setState(
      {
        showUploadProgress: false,
        fileUrl: url,
        message,
      },
      () => {
        this.form.dispatchEvent(new Event("submit"))
      }
    )
  }

  getFileType(file) {
    var fileType
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif"
    ) {
      fileType = "Image"
    } else {
      fileType = "File"
    }

    return fileType
  }

  uploadFile = e => {
    this.setState({
      showUploadProgress: true,
    })
    var fileType = this.getFileType(this.state.file)

    var newMessage = this.state.message

    const Sentmessage = {
      sender_id: this.props.user.id,
      recipient_id: this.props.recipient_id,
      message: newMessage,
      attached_file: this.state.image,
      attached_file_type: fileType || null,
      attached_file_name: this.state.image,
      sending: true,
    }

    this.setState(
      {
        message: "",
      },
      () => {
        this.props.updatemessage(Sentmessage)
      }
    )

    this.closeImageDialog()

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
    let timeSubmitted = new Date().getTime()
    let fileRef = "uploaded_file/" + timeSubmitted + "_" + this.state.file.name

    var storageRef = firebase.storage().ref(fileRef)
    var task = storageRef.put(this.state.file)

    task.on(
      "state_changed",
      snapshot => {},
      error => {
        alert("false to upload file please try again")
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.fileUploaded(downloadURL, newMessage)
        })
      }
    )
  }

  render() {
    return (
      <Mutation
        mutation={SAVE_MESSAGE}
        onCompleted={data => {
          this.setState(
            {
              message: "",
            },
            () => {
              this.props.popMessage(data.CreateMessage)
              this.props.updatemessage(data.CreateMessage)
            }
          )
        }}
        onError={() => {
          this.sendingError()
        }}
        awaitRefetchQueries={true}
        refetchQueries={() => {
          return [
            {
              query: CHAT_HISTORY,
              variables: {
                sender_id: this.props.user.id,
                recipient_id: this.props.recipient_id,
              },
            },
          ]
        }}
      >
        {(sendMessage, { error, loading }) => (
          <div className="loader-wrapper">
            {error && (
              <Callout className="bp3-intent-danger cart-resize" icon="error">
                {error.graphQLErrors.map(({ message }, i) => (
                  <span key={i}>{message}</span>
                ))}
              </Callout>
            )}
            <form
              onSubmit={e => {
                e.preventDefault()
                let fileName

                if (this.state.file) {
                  fileName = this.state.file.name
                } else {
                  fileName = null
                }
                if (this.validator.allValid() || this.state.fileUrl !== null) {
                  const Sentmessage = {
                    sender_id: this.props.user.id,
                    recipient_id: this.props.recipient_id,
                    message: this.state.message,
                    attached_file: this.state.fileUrl,
                    attached_file_type: this.state.fileType || null,
                    attached_file_name: fileName,
                    sending: true,
                  }

                  this.setState(
                    {
                      message: "",
                      openDialog: false,
                      file: null,
                      image: null,
                      showUploadProgress: false,
                      fileUrl: null,
                      fileType: "None",
                    },
                    () => {
                      this.props.updatemessage(Sentmessage)
                    }
                  )
                  sendMessage({
                    variables: {
                      sender_id: this.props.user.id,
                      recipient_id: this.props.recipient_id,
                      message: this.state.message,
                      attached_file: this.state.fileUrl,
                      attached_file_type: this.state.fileType || null,
                      attached_file_name: fileName,
                    },
                  })
                } else {
                }
              }}
              className="c-form"
              ref={form => (this.form = form)}
            >
              <input
                type="file"
                className="file-input"
                name="file"
                id="file"
                onChange={e => {
                  let file = e.target.files[0]
                  this.setState(
                    {
                      image: URL.createObjectURL(file),
                      file,
                      fileType: file.type,
                      fileName: file.name,
                    },
                    () => {
                      this.openImageDialog()
                    }
                  )
                }}
              />
              <Dialog
                isOpen={this.state.openDialog}
                canOutsideClickClose={false}
                title="Preview"
                icon={IconNames.PAPERCLIP}
                onClose={this.closeImageDialog}
              >
                <FileUploadPreview
                  src={this.state.image}
                  fileType={this.state.fileType}
                  fileName={this.state.fileName}
                />
                <div className="c-input">
                  <input
                    placeholder="Add caption"
                    type="text"
                    id="message"
                    name="message"
                    onChange={this.handleFormInput}
                  />
                  <button className="send-btn" onClick={this.uploadFile}>
                    Send
                  </button>
                </div>
              </Dialog>
              <div className="input">
                <label htmlFor="file">
                  <Icon
                    icon={IconNames.PAPERCLIP}
                    iconSize={20}
                    color="black"
                    className="attach-icon"
                  ></Icon>
                </label>

                <input
                  placeholder="Type your message here!"
                  type="text"
                  id="message"
                  name="message"
                  value={this.state.message}
                  onChange={this.handleFormInput}
                />
                {this.validator.message(
                  "message",
                  this.state.message,
                  "required"
                )}
                <button className="send-btn">Send</button>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.loggedInUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatemessage: message => {
      dispatch({
        type: "ADD_NEW_MESSAGE",
        message,
      })
    },
    popMessage: message => {
      dispatch({
        type: "POP_MESSAGE",
        message,
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatFormView)
