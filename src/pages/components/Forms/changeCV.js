import React from "react"

export default class changeCV extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <form className="checkout-form-container">
          <h3 className="form-header">Update Your CV </h3>
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
            <label htmlFor="file">Upload Curriculum Vitae</label>
          </div>
          <br />
          <input
            type="submit"
            className="submit-details"
            value="Submit"
            id="submitBtn"
          />
        </form>
      </div>
    )
  }
}
