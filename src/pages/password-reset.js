import { React, Component } from "react"
import Layout from "./components/layout"

import PasswordReset from "./components/Forms/passwordReset"

export default class ApplicationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCoverLetterRedraft: false,
      showCoverLetterReviewForm: false,
      showGraduateSchoolEssayRedraftForm: false,
      showGraduateSchoolStatementReviewForm: false,
      showResumeReviewForm: false,
      package: null,
    }
  }

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <div
          css={{
            background: "white",
            padding: "3em 1em",
          }}
        >
          <div className="content">
            <PasswordReset />
          </div>
        </div>
      </Layout>
    )
  }
}
