import { React, Component } from "react"
import { Query } from "react-apollo"
import CoverLetterRedraft from "../FormDetailsPreview/coverLetterRedraft"
import CoverLetterReviewForm from "../FormDetailsPreview/coverLetterReviewForm"
import GraduateSchoolEssayRedraftForm from "../FormDetailsPreview/graduateSchoolEssayRedraftForm"
import GraduateSchoolStatementReviewForm from "../FormDetailsPreview/graduateSchoolStatementReviewForm"
import ResumeReviewForm from "../FormDetailsPreview/resumeReviewForm"

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  render() {
    if (this.props.table === "coverLetterRedraft") {
      return (
        <CoverLetterRedraft
          userID={this.props.userID}
          account_type={this.props.account_type}
        />
      )
    } else if (this.props.table === "coverLetterReviewForm") {
      return (
        <CoverLetterReviewForm
          userID={this.props.userID}
          account_type={this.props.account_type}
        />
      )
    } else if (this.props.table === "graduateSchoolEssayRedraftForm") {
      return (
        <GraduateSchoolEssayRedraftForm
          userID={this.props.userID}
          account_type={this.props.account_type}
        />
      )
    } else if (this.props.table === "graduateSchoolStatementReviewForm") {
      return (
        <GraduateSchoolStatementReviewForm
          userID={this.props.userID}
          account_type={this.props.account_type}
        />
      )
    } else {
      return (
        <ResumeReviewForm
          userID={this.props.userID}
          account_type={this.props.account_type}
        />
      )
    }
  }
}
export default Account
