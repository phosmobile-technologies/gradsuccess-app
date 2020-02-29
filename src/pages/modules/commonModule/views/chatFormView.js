import React, { Component } from "react"
import { IconNames } from "@blueprintjs/icons"
import { Icon, Spinner, FileInput, Dialog } from "@blueprintjs/core"
import { Callout } from "@blueprintjs/core"
import { Mutation } from "react-apollo"
import { SAVE_MESSAGE } from "./../../../graphql/mutations"
import SimpleReactValidator from "simple-react-validator"
import { connect } from "react-redux"
import FileUploadPreview from "./FileUploadPreview"
import { CHAT_HISTORY } from './../../../graphql/queries';

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

  fileUploaded(url) {
    this.closeImageDialog()
    if (
      this.state.file.type === "image/png" ||
      this.state.file.type === "image/jpeg" ||
      this.state.file.type === "image/gif"
    ) {
      this.setState({
        fileType: "Image",
      })
    } else {
      this.setState({
        fileType: "File",
      })
    }
    this.setState(
      {
        showUploadProgress: false,
        fileUrl: url,
      },
      () => {
        this.form.dispatchEvent(new Event("submit"))
      }
    )
  }

  uploadFile = e => {
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
    let timeSubmitted = new Date().getTime()
    let fileRef = "uploaded_file/" + timeSubmitted + "_" + this.state.file.name

    var storageRef = firebase.storage().ref(fileRef)
    var task = storageRef.put(this.state.file)

    task.on(
      "state_changed",
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploade
      },
      error => {
        alert("false to upload file please try again")
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.fileUploaded(downloadURL)
        })
      }
    )
  }

  render() {
    return (
      <Mutation
        mutation={SAVE_MESSAGE}
        onCompleted={data => {
          this.props.updatemessage(data.CreateMessage);
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

                if(this.state.file){
                  fileName = this.state.file.name
                }else{
                  fileName = null
                }


                if (this.validator.allValid() || this.state.fileUrl !== null) {
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
                    {this.state.showUploadProgress ? (
                      <Spinner size={Spinner.SIZE_SMALL} />
                    ) : (
                      "Send"
                    )}
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
                  onChange={this.handleFormInput}
                />
                {this.validator.message(
                  "message",
                  this.state.message,
                  "required"
                )}
                <button className="send-btn">
                  {loading ? <Spinner size={Spinner.SIZE_SMALL} /> : "Send"}
                </button>
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
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatFormView)
