import { React, Component } from "react"
import Layout from "./components/layout"
import LoginForm from "./components/Forms/loginForm"
import Modal from "react-modal"

const customStyles = {
  content: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
}

export default class ApplicationSuccefful extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }
  render() {
    return (
      <Layout>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          className="modelStyling"
          ariaHideApp={false}
        >
          <LoginForm />
          <a className="ModalCloseBut" onClick={this.handleCloseModal}>
            x
          </a>
        </Modal>
        <div
          css={{
            background: "white",
            padding: "3em 1em",
          }}
        >
          <div className="content-suc">
            <div className="content-suc-inner">
              <h4>Acount Successfully created</h4>
              <button onClick={this.handleOpenModal}>Login</button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
