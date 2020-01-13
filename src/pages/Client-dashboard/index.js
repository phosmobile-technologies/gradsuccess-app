import { React, Component } from "react"
import Modal from "react-modal"
import Footer from "../components/Footer"
import { Query } from "react-apollo"
import { Mutation } from "react-apollo"
import { LOGGED_IN_USER } from "../graphql/queries"
import loader from "../../images/loader.gif"
import MainLayout from "../components/ClientAccountComponents/mainLayout"
import AccountInfo from "./account"
import LoginForm from "../components/Forms/loginForm"
import ChangePassword from "../components/Forms/changePassword"
import LogoutForm from "../components/Forms/logoutForm"
import EditProfile from "../components/Forms/editProfile"
import UpdateProfileImage from "../components/Forms/updateProfileImage"

import NotFoundPage from "../401"

import LeaveAMessageForm from "../components/Forms/leaveAMessageForm"

import discouted from "../../images/logo.png"

const customStyles = {
  content: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
}

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: "",
      leaveAMessage: false,
      changePassword: false,
      accountInfo: true,
      updateProfileImage: false,
      editProfile: false,
      showModal: false,
      currentMenu: "accountInfo",
      toggle: true,
      data: {
        email: "",
        new_password: "",
      },
    }
    this.handleDisplayComponent = this.handleDisplayComponent.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleFormInput = this.handleFormInput.bind(this)
    this.showEditComponent = this.showEditComponent.bind(this)
  }
  componentDidMount() {
    this.setState({
      loggedIn: localStorage.getItem("auth-token") || "",
    })

    if (this.state.loggedIn === "") {
      this.setState({ showModal: true })
    }
    const currentc = localStorage.getItem("currentC")
    if (localStorage.hasOwnProperty("currentC")) {
      this.setState({
        leaveAMessage: false,
        changePassword: false,
        accountInfo: false,
        updateProfileImage: false,
        editProfile: false,
        currentMenu: currentc,
        [currentc]: true,
      })

      switch (currentc) {
        case "leaveAMessage": {
          this.setState({
            currentComponent: "Messages",
          })
          break
        }
        case "changePassword": {
          this.setState({
            currentComponent: "Change Password",
          })
          break
        }
        case "accountInfo": {
          this.setState({
            currentComponent: "Account Details",
          })
          break
        }
        default: {
          this.setState({
            currentComponent: "Account Details",
          })
        }
      }
    } else {
      this.setState({
        accountInfo: true,
      })
    }
  }
  handleCloseModal() {
    this.setState({
      showModal: false,
      changePassword: false,
      accountInfo: true,
    })
  }

  handleDisplayComponent(event) {
    let Component = event.target.id
    localStorage.setItem("currentC", Component)
    this.setState({
      leaveAMessage: false,
      editProfile: false,
      updateProfileImage: false,
      accountInfo: false,
      changePassword: false,
    })

    this.setState({
      [Component]: true,
      currentMenu: Component,
      toggle: true,
    })
  }

  toggleMenu() {
    this.setState({
      toggle: !this.state.toggle,
    })
  }

  handleFormInput(event) {
    const { name, value } = event.target
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }))
  }

  showEditComponent(func) {
    localStorage.setItem("currentC", func)
    this.setState({
      leaveAMessage: false,
      changePassword: false,
      accountInfo: false,
      updateProfileImage: false,
      editProfile: false,
      [func]: true,
    })
  }

  render() {
    if (this.state.loggedIn != "") {
      return (
        <Query query={LOGGED_IN_USER}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div className="loader">
                  <div className="loader_client_account">
                    <img src={loader} alt="gradsuccess" />
                    <h1>Just a moment...</h1>
                  </div>
                </div>
              )
            if (error) return `Error! ${error.message}`
            return (
              <div>
                {data.me.account_type === "Expert" ? (
                  <NotFoundPage />
                ) : (
                  <div className="main-content-wrapper">
                    <div className="main-content">
                      <div className="client_main_area">
                        <div className="fixedHeader">
                          <div
                            className="client_main_area_menu"
                            id={this.state.toggle ? "toggle_menu" : ""}
                          >
                            <div className="logo-image">
                              <img src={discouted} alt="Logo" />
                            </div>
                            <button
                              className={
                                this.state.currentMenu === "accountInfo"
                                  ? "currentMenu"
                                  : ""
                              }
                              id="accountInfo"
                              onClick={this.handleDisplayComponent}
                            >
                              Dashboard
                            </button>
                            <button
                              className={
                                this.state.currentMenu === "leaveAMessage"
                                  ? "currentMenu"
                                  : ""
                              }
                              id="leaveAMessage"
                              onClick={this.handleDisplayComponent}
                            >
                              Chat with Expert
                            </button>
                            <button
                              className={
                                this.state.currentMenu === "changePassword"
                                  ? "currentMenu"
                                  : ""
                              }
                              id="changePassword"
                              onClick={this.handleDisplayComponent}
                            >
                              Change Password
                            </button>

                            <LogoutForm />
                          </div>
                        </div>

                        <div>
                          <MainLayout
                            currentComponent={this.state.currentMenu}
                            toggleMenu={this.toggleMenu}
                            id={data.me.id}
                            accountName={
                              data.me.first_name + " " + data.me.last_name
                            }
                            email={data.me.email}
                            showEditComponent={this.showEditComponent}
                          />
                          <div className="client_main_area_content_area">
                            {this.state.accountInfo && (
                              <AccountInfo
                                table={data.me.package}
                                userID={data.me.form_id}
                                account_type={data.me.account_type}
                              />
                            )}
                            {this.state.leaveAMessage && (
                              <LeaveAMessageForm
                                logged_in_user_id={data.me.form_id}
                                sender={
                                  data.me.first_name + " " + data.me.last_name
                                }
                                sender_id={data.me.form_id}
                              />
                            )}
                            {this.state.changePassword && (
                              <ChangePassword
                                id={data.me.id}
                                email={data.me.email}
                                closeModal={this.handleCloseModal}
                              />
                            )}

                            {this.state.editProfile && (
                              <EditProfile
                                first_name={data.me.first_name}
                                last_name={data.me.last_name}
                                email={data.me.email}
                                phone={data.me.phone}
                                id={data.me.id}
                              />
                            )}
                            {this.state.updateProfileImage && (
                              <UpdateProfileImage id={data.me.id} />
                            )}
                          </div>
                          <div className="footer-hide">
                            <Footer />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          }}
        </Query>
      )
    } else {
      return (
        <div>
          <Modal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            style={customStyles}
            ariaHideApp={false}
          >
            <LoginForm />
            <a className="ModalCloseBut" onClick={this.handleCloseModal}>
              x
            </a>
          </Modal>
        </div>
      )
    }
  }
}
export default IndexPage
