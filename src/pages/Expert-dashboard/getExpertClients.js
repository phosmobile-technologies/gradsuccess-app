import { React, Component } from "react"
import { Query } from "react-apollo"
import loader from "../../images/loader.gif"
import Modal from "react-modal"

import { GET_EXPERT_CLIENTS_COVER_LETTER_REVIEW } from "../graphql/queries"
import { GET_EXPERT_CLIENTS_RESUME_REVIEW_FORM } from "../graphql/queries"
import { GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM } from "../graphql/queries"
import { GET_EXPERT_CLIENTS_COVER_LETTER_REDRAFT } from "../graphql/queries"
import { GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM } from "../graphql/queries"

import CoverLetterRedraft from "../FormDetailsPreview/coverLetterRedraft"
import CoverLetterReviewForm from "../FormDetailsPreview/coverLetterReviewForm"
import GraduateSchoolEssayRedraftForm from "../FormDetailsPreview/graduateSchoolEssayRedraftForm"
import GraduateSchoolStatementReviewForm from "../FormDetailsPreview/graduateSchoolStatementReviewForm"
import ResumeReviewForm from "../FormDetailsPreview/resumeReviewForm"

const customStyles = {
  content: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(17, 153, 146, 0.3)",
  },
}

class ExpertClients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formID: "",
      clientList: [],
      coverLetterRedraftForm: false,
      coverLetterReviewForm: false,
      graduateSchoolEssayRedraftForm: false,
      resumeReviewForm: false,
      graduateSchoolStatementReviewForm: false,
    }

    this.updateClientList = this.updateClientList.bind(this)
    this.openApplicationDetails = this.openApplicationDetails.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  updateClientList(data) {
    data.map(value => {
      this.setState({
        clientList: [...this.state.clientList, value],
      })
    })
  }

  openApplicationDetails(formType, formID) {
    this.setState({
      formID: formID,
      [formType]: true,
    })

    this.props.closeMenu()
  }
  handleCloseModal() {
    this.setState({
      coverLetterRedraftForm: false,
      coverLetterReviewForm: false,
      graduateSchoolEssayRedraftForm: false,
      resumeReviewForm: false,
      graduateSchoolStatementReviewForm: false,
    })
  }

  render() {
    return (
      <div>
        <Query
          query={GET_EXPERT_CLIENTS_COVER_LETTER_REVIEW}
          variables={{ has_expert: this.props.expertID }}
          onCompleted={data =>
            this.updateClientList(data.getExpertClientsCoverLetterReview)
          }
        >
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>failed to load data</div>
            return <div></div>
          }}
        </Query>
        <Query
          query={GET_EXPERT_CLIENTS_RESUME_REVIEW_FORM}
          variables={{ has_expert: this.props.expertID }}
          onCompleted={data =>
            this.updateClientList(data.getExpertClientsResumeReviewForm)
          }
        >
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>failed to load data</div>
            return <div></div>
          }}
        </Query>
        <Query
          query={GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM}
          variables={{ has_expert: this.props.expertID }}
          onCompleted={data =>
            this.updateClientList(
              data.getExpertClientsGraduateSchoolStatementReviewForm
            )
          }
        >
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>failed to load data</div>
            return <div></div>
          }}
        </Query>
        <Query
          query={GET_EXPERT_CLIENTS_COVER_LETTER_REDRAFT}
          variables={{ has_expert: this.props.expertID }}
          onCompleted={data =>
            this.updateClientList(data.getExpertClientsCoverLetterRedraft)
          }
        >
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>failed to load data</div>
            return <div></div>
          }}
        </Query>
        <Query
          query={GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM}
          variables={{ has_expert: this.props.expertID }}
          onCompleted={data =>
            this.updateClientList(
              data.getExpertClientsGraduateSchoolEssayRedraftForm
            )
          }
        >
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>failed to load data</div>
            return <div></div>
          }}
        </Query>
        <div className="assigned_application_board">
          <h5>Assigned application</h5>
          {this.state.clientList.map((client, index) => {
            return (
              <div className="dropdown" key={index}>
                <button className="clientItem">
                  <p>{client.name}</p>
                </button>
                <div className="dropdown-content">
                  <button
                    onClick={() =>
                      this.openApplicationDetails(
                        client.package,
                        client.form_id
                      )
                    }
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      this.props.handleDisplayMessagingComponent(
                        client.form_id,
                        client.name
                      )
                    }
                    name={"Conversations with " + client.name}
                    id="LeaveAMessageComponent"
                  >
                    Message
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <Modal
          isOpen={this.state.graduateSchoolStatementReviewForm}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="detail_preview_modal_container">
            <div className="detail_preview_modal_container_inner">
              <GraduateSchoolStatementReviewForm userID={this.state.formID} />
            </div>
          </div>
          <a className="ModalCloseBut" onClick={this.handleCloseModal}>
            x
          </a>
        </Modal>

        <Modal
          isOpen={this.state.coverLetterRedraftForm}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="detail_preview_modal_container">
            <div className="detail_preview_modal_container_inner">
              <CoverLetterRedraft userID={this.state.formID} />
            </div>
          </div>
          <a className="ModalCloseBut" onClick={this.handleCloseModal}>
            x
          </a>
        </Modal>

        <Modal
          isOpen={this.state.coverLetterReviewForm}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="detail_preview_modal_container">
            <div className="detail_preview_modal_container_inner">
              <CoverLetterReviewForm userID={this.state.formID} />
            </div>
          </div>
          <a className="ModalCloseBut" onClick={this.handleCloseModal}>
            x
          </a>
        </Modal>

        <Modal
          isOpen={this.state.graduateSchoolEssayRedraftForm}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="detail_preview_modal_container">
            <div className="detail_preview_modal_container_inner">
              <GraduateSchoolEssayRedraftForm userID={this.state.formID} />
            </div>
          </div>
          <a className="ModalCloseBut" onClick={this.handleCloseModal}>
            x
          </a>
        </Modal>

        <Modal
          isOpen={this.state.resumeReviewForm}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="detail_preview_modal_container">
            <div className="detail_preview_modal_container_inner">
              <ResumeReviewForm userID={this.state.formID} />
            </div>
          </div>
          <a className="ModalCloseBut" onClick={this.handleCloseModal}>
            x
          </a>
        </Modal>
      </div>
    )
  }
}
export default ExpertClients
