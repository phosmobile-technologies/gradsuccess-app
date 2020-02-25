import { React, Component } from "react"
import Layout from "./components/layout"
import LoginForm from "./components/Forms/loginForm"
import Modal from "react-awesome-modal"
import { Callout } from "@blueprintjs/core"

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
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  componentDidMount() {
    this.setState({
      user: this.props.location.state.user,
    })
  }
  render() {
    if (this.state.user) {
      return (
        <Layout>
          <Modal
            visible={this.state.showModal}
            effect="fadeInUp"
            className="modal"
            onClickAway={() => this.handleCloseModal()}
          >
            <LoginForm />
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
                <Callout>
                  <span>Welcome, {this.state.user.first_name}</span>
                  <p>Your account has been successfully created,</p>
                </Callout>
                <button onClick={this.handleOpenModal}>Login</button>
              </div>
            </div>
          </div>
        </Layout>
      )
    } else {
      return <div></div>
    }
  }
}
/* eslint-disable */
