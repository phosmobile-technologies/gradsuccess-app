import React, { Component } from "react"
import File from "../../../../images/file.svg"
export default class FileUploadPreview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: null,
    }
  }

  componentDidMount() {
    if (
      this.props.fileType === "image/png" ||
      this.props.fileType === "image/jpeg" ||
      this.props.fileType === "image/gif"
    ) {
      this.setState({
        file: "Image",
      })
    } else {
      this.setState({
        file: "File",
      })
    }
  }
  render() {
    return (
      <div className="upload-container">
        {this.state.file === "Image" && (
          <img src={this.props.src} alt="uploaded file" className="u-image" />
        )}
        {this.state.file === "File" && (
          <div>
            <img src={File} alt="uploaded file" className="d-image" />
            <h3>{this.props.fileName}</h3>
          </div>
        )}

        
      </div>
    )
  }
}
