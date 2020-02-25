import React from "react"

import Layout from "./modules/websiteModule/components/layout"
import SEO from "./modules/websiteModule/components/seo"
import Modal from "react-awesome-modal"
import LoginForm from "./modules/websiteModule/components/Forms/loginForm"

const customStyles = {
  content: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
}

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }
  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <Layout>
        <SEO title="401: Unauthorized access" />
        <div className="unauthorized">
          <h1>401!</h1>
          <h2>UNAUTHORIZED ACCESS</h2>
          <p>... please logged with appropriate logged details.</p>
          <button onClick={this.handleOpenModal} className="l-btn">
            Login
          </button>
          <div>
            <Modal
              visible={this.state.showModal}
              effect="fadeInUp"
              className="modal"
              onClickAway={() => this.handleCloseModal()}
            >
              <LoginForm />
            </Modal>
          </div>
        </div>
      </Layout>
    )
  }
}
export default NotFoundPage
