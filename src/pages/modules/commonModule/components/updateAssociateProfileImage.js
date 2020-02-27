import React, { Component } from "react"
import UpdateAssociateProfileImageView from "../views/updateAssociateProfileImageView"
import { Button, Dialog, Spinner, Callout } from "@blueprintjs/core"
import FileUploadPreview from "./../views/FileUploadPreview"
import { IconNames } from "@blueprintjs/icons"
import { Mutation } from "react-apollo"
import { UPDATE_ASSOCIATE_PROFILE_IMAGE } from "../../../graphql/mutations"

export default class UpdateAssociateProfileImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageRef: null,
      openDialog: false,
      file: null,
      image: null,
      showUploadProgress: false,
      fileUrl: null,
      fileType: "None",
    }
  }

  componentDidMount() {
    this.setState({
      imageRef: this.props.associateDetail.profile_image_ref,
    })
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
    let fileRef = "/" + timeSubmitted + "_" + this.state.file.name

    var storageRef = firebase.storage().ref(fileRef)
    var task = storageRef.put(this.state.file)

    task.on(
      "state_changed",
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

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
          this.fileUploaded(downloadURL)
        })
      }
    )
  }

  fileUploaded=(url)=> {
    this.setState(
      {
        fileUrl: url,
      },
      () => {
        this.profilImageForm.dispatchEvent(new Event("submit"))
      }
    )
  }

  uploadError(error) {
    console.log(error)
  }

  render() {
    return (
      <div className="u-p-image">
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
            <button className="send-btn" onClick={this.uploadFile}>
              {this.state.showUploadProgress ? (
                <Spinner size={Spinner.SIZE_SMALL} />
              ) : (
                "Save Image"
              )}
            </button>
          </div>
        </Dialog>

        <input
          type="file"
          accept=".png,.jpg,.jpeg,.JPEG,.svg"
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
        <Button className="bp3-intent-primary bp3-small">
          <label htmlFor="file">Update Profile Image</label>
        </Button>

        <UpdateAssociateProfileImageView imageRef={this.state.imageRef} />
        <Mutation
          mutation={UPDATE_ASSOCIATE_PROFILE_IMAGE}
          onCompleted={data => {
            this.setState(
              {
                showUploadProgress:false,
                imageRef: data.UpdateAssociateDetail.profile_image_ref,
              },
              () => {
                this.closeImageDialog()
              }
            )
          }}
          onError={error => {
            this.uploadError(error)
          }}
        >
          {(updateAssociateProfile, { error }) => (
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
                  this.setState({ assigned: true })
                  updateAssociateProfile({
                    variables: {
                      id: this.props.associateDetail.id,
                      profile_image_ref: this.state.fileUrl,
                    },
                  })
                }}
                ref={profilImageForm =>
                  (this.profilImageForm = profilImageForm)
                }
                className="checkout-form-container"
              ></form>
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}
