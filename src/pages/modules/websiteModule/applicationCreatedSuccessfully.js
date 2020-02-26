import React from "react"
import LoginForm from "./components/Forms/loginForm"
import Modal from "react-awesome-modal"
import { CLIENT_PASSWORD } from "../../../api/sendMailEndpoint"
import { SEND_ASSOCIATE_EMAIL } from "../../../api/sendMailEndpoint"
import Layout from "./components/layout"
import { connect } from 'react-redux';
import LoggedIn from "./components/loggedIn"
import { Button } from '@blueprintjs/core';

class FormCompletePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null,
      showModal: false,
    }
  }

  componentDidMount() {
     this.props.deleteAssignedAssociate("null")
    let url = CLIENT_PASSWORD
    let a_url = SEND_ASSOCIATE_EMAIL

    let a_data = {
      form_id: this.props.form_id,
    }

    this.setState(
      {
        password: this.props.location.state.password,
      },
      () => {
        let data = {
          form_id: this.props.form_id,
          password: this.state.password,
        }
        fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "post",
          body: JSON.stringify(data),
        })
          .then(function(response) {
            return response.text()
          })
          .then(text => {
            fetch(a_url, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              method: "post",
              body: JSON.stringify(a_data),
            })
              .then(function(response) {
                return response.text()
              })
              .then(text => {
                console.log(text)
              })
              .catch(function(error) {
                alert("Networks Error please try again, Later!")
              })
          })
          .catch(function(error) {
            alert("Networks Error please try again, Later!")
          })
      }
    )
  }
  handleOpenModal =()=> {
    this.setState({ showModal: true })
  }

  handleCloseModal=()=> {
    this.setState({ showModal: false })
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
                <p>Your Application was successfully Submitted, </p>
                <p>
                  Our team of expert will contact via any means of communication
                  provided in form.
                </p>
                <br />
                <p>
                  the code provided below is your login password to dashboard,
                  if there is any additional infomation or correction to the
                  information provided previously leave a message on your page{" "}
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
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCompletePage)