import React from "react"
import LoginForm from "./components/Forms/loginForm"
import Modal from "react-awesome-modal"
import Layout from "./components/layout"
import { connect } from "react-redux"
import LoggedIn from "./components/loggedIn"
import { Button } from "@blueprintjs/core"

class FormCompletePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null,
      showModal: false,
    }
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({
        password: this.props.password.password,
      })
    }
  }
  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  componentWillUnmount() {
    this.props.deleteAssignedAssociate("null")
    this.props.removePassword()
  }
  render() {
    return (
      <Layout>
        <div className="t-spaceout">
          <div className="thank-you">
            <div className="thank-you-inner-left">
              <h1>
                Thank You <i>!</i>
              </h1>
              <div>
                <p>Your Application was successfully Submitted, 

An Expert on our team will contact you via details provided in the form. 

The code provided below is your login password to dashboard, if there is any additional information or correction to the information provided previously leave a message on your page 
                </p>
              </div>
            </div>

            {this.props.user ? (
              <div className="dashboard-bg">
                {" "}
                <LoggedIn />
              </div>
            ) : (
              <div>
                <div className="passwordCard">
                  <p>This is your login password: </p>
                  <h1>{this.state.password}</h1>
                </div>
                <div className="">
                  <Button
                    onClick={this.handleOpenModal}
                    className="bp3-intent-success bp3-large"
                  >
                    Login
                  </Button>
                </div>
              </div>
            )}
          </div>
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
function mapStateToProps(state) {
  return {
    user: state.user,
    password: state.assignedAssociate,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deleteAssignedAssociate: id => {
      dispatch({
        type: "DELETE_ASSIGNED_ASSOCIATE",
        id,
      })
    },
    removePassword: password => {
      dispatch({
        type: "REMOVE_PASWORD",
        password,
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCompletePage)
