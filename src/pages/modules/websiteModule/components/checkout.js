import React, { Component } from "react"
import { navigate } from "gatsby"
import PaystackButton from "react-paystack"
import { GET_EMAIL } from "../../../../api/sendMailEndpoint"
import { P_KEY } from "../../../../api/sendMailEndpoint"
import Layout from "./layout"
import { Callout, Spinner } from "@blueprintjs/core"
import { Button } from "@blueprintjs/core"
import { connect } from "react-redux"
import Modal from "react-awesome-modal"
import LoginForm from "./Forms/loginForm"
import { CREATE_USER } from "../../../graphql/mutations"
import { Mutation } from "react-apollo"
import Logout from "./Forms/logoutForm"
/* eslint-disable */
class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: P_KEY, ///equals NGN100,
      success: false,
      password: "",
      email: "", // customer email
      first_name: "",
      last_name: "",
      phone: "",
      account_type: "Client",
      submitForm: true,
      notVerified: true,
      emailExist: true,
      notEm: false,
      mcs: 1,
      loggedIn: false,
      loading: false,
    }

    this.handleForm = this.handleForm.bind(this)
    this.verifyFormSubmit = this.verifyFormSubmit.bind(this)
    this.verifyEmail = this.verifyEmail.bind(this)

    this.paystackPaymentSuccess = this.paystackPaymentSuccess.bind(this)
  }

  componentDidMount() {
    if (this.props.cartItems.length == 0){
      navigate("/")
    }
      if (this.props.user !== null) {
        this.updateUserDetails()
      }
    if (this.props.total <= 0) {
      navigate("/")
    }

    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ"
    var string_length = 8
    var randomstring = ""
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length)
      randomstring += chars.substring(rnum, rnum + 1)
    }
    this.setState({
      password: randomstring,
    })
  }

  verifyFormSubmit() {
    this.setState({
      submitForm: true,
    })
  }

  handleForm(e) {
    const { name, value } = e.target

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.verify()
      }
    )
  }

  verify = () => {
    if (
      this.state.first_name !== "" &&
      this.state.last_name !== "" &&
      this.state.email !== "" &&
      this.state.phone !== ""
    ) {
      this.setState({
        notVerified: false,
      })
    }
  }

  verifyEmail() {
    let url = GET_EMAIL
    let data = {
      email: this.state.email,
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
        if (text === "false") {
          this.setState({
            emailExist: false,
            notEm: false,
          })
        } else {
          this.setState({
            emailExist: true,
            notEm: true,
          })
        }
      })
      .catch(function(error) {
        alert("Networks Error please try again, Later!")
      })
  }

  paystackPaymentSuccess(response) {
    if (this.props.user === null) {
      this.form.dispatchEvent(new Event("submit"))
    } else {
      this.props.savePaidPackageList(this.props.cartItems);
      navigate("/complete-package", {
        state: {
          password: this.state.password,
        },
        replace:true
      })
    }
  }

  close = () => {
    console.log("Transaction terminated")
  }

  getReference = () => {
    //you can put any unique reference implementation code here
    let text = ""
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.="
    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  setLoadingState = () => {
    this.setState({
      loading: true,
    })
  }

  updateUserDetails = () => {
    const { first_name, last_name, phone, email } = this.props.user

    this.setState({
      first_name,
      last_name,
      phone,
      email,
      notVerified: false,
      emailExist: false,
      loggedIn: true,
    })
  }
  render() {
    return (
      <Layout>
        <div className="c">
          {this.state.loading && (
            <div className="submitting-overlay">
              <Spinner
                className="bp3-intent-primary"
                number={Spinner.SIZE_LARG}
              />
            </div>
          )}
          <div className="co-container">
            <div className="co-inner">
              <Mutation
                mutation={CREATE_USER}
                onError={this.error}
                onCompleted={data => {
                  this.props.savePaidPackageList(this.props.cartItems)
                  navigate("/complete-package", {
                    state: {
                      password: this.state.password,
                      user_id: data.CreateUser.id,
                    },
                  })
                }}
              >
                {(createuserAccount, { data, loading, error }) => (
                  <div>
                    {loading && (
                      <div className="submitting-overlay">
                        <Spinner
                          className="bp3-intent-primary"
                          number={Spinner.SIZE_LARG}
                        />
                      </div>
                    )}
                    <form
                      onSubmit={e => {
                        e.preventDefault()
                        createuserAccount({
                          variables: {
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            phone: this.state.phone,
                            email: this.state.email,
                            password: this.state.password,
                            account_type: "Client",
                          },
                        })
                      }}
                      ref={form => (this.form = form)}
                      className="checkout-form-container"
                      id="cartForm"
                    >
                      <h3>Personal Details</h3>
                      {error && (
                        <Callout className="bp3-intent-danger" icon="error">
                          {error.graphQLErrors.map(({ message }, i) => (
                            <span key={i}>{message}</span>
                          ))}
                        </Callout>
                      )}

                      <div className="c-n-fill">
                        <input
                          type="text"
                          className="bp3-input bp3-large"
                          required
                          placeholder="First name"
                          onChange={this.handleForm}
                          id="first_name"
                          name="first_name"
                          readOnly={this.state.loggedIn}
                          value={this.state.first_name}
                        />
                        <input
                          type="text"
                          required
                          className="bp3-input bp3-large"
                          placeholder="Last name"
                          onChange={this.handleForm}
                          id="last_name"
                          name="last_name"
                          readOnly={this.state.loggedIn}
                          value={this.state.last_name}
                        />
                      </div>
                      <div className="c-fill">
                        <input
                          type="email"
                          required
                          className="bp3-input bp3-fill bp3-large"
                          placeholder="Email Address"
                          onChange={this.handleForm}
                          id="email"
                          name="email"
                          onBlur={this.verifyEmail}
                          readOnly={this.state.loggedIn}
                          value={this.state.email}
                        />
                        {this.state.emailExist && this.state.notEm ? (
                          <Callout className="bp3-intent-danger" icon="error">
                            Email Already exists
                          </Callout>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <div className="c-fill">
                        <input
                          type="text"
                          required
                          className="bp3-input bp3-fill bp3-large"
                          placeholder="Phone"
                          onChange={this.handleForm}
                          id="phone"
                          name="phone"
                          readOnly={this.state.loggedIn}
                          value={this.state.phone}
                        />
                      </div>
                    </form>
                  </div>
                )}
              </Mutation>

              <div className="co-pay-btns">
                <PaystackButton
                  text="Proceed to payment"
                  className={"paystack-co-btn"}
                  callback={this.paystackPaymentSuccess}
                  close={this.close}
                  disabled={
                    this.state.notVerified &&
                    this.state.emailExist &&
                    this.state.notEm
                  } /*disable payment button*/
                  embed={
                    false
                  } /*payment embed in your app instead of a pop up*/
                  reference={this.getReference()}
                  email={this.state.email}
                  amount={this.props.total * 100}
                  paystackkey={this.state.key}
                  tag="button" /*it can be button or a or input tag */
                />
                {this.state.loggedIn ? (
                  <Logout
                    handleCloseModal={this.handleCloseModal}
                    setLoadingsState={this.setLoadingState}
                    text="Create new account"
                  />
                ) : (
                  <Button
                    type="button"
                    className="bp3-button bp3-intent-success"
                    minimal={true}
                    onClick={this.handleOpenModal}
                    large={true}
                  >
                    I already have account
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal
          visible={this.state.showModal}
          effect="fadeInUp"
          className="modal"
          onClickAway={() => this.handleCloseModal()}
        >
          <LoginForm handleCloseModal={this.handleCloseModal} />
        </Modal>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    total: state.cart.total,
    user: state.user,
    cartItems:state.cart.cartItems
  }
}
function mapDispatchToProps(dispatch) {
  return {
    savePaidPackageList: items => {
      dispatch({
        type: "SAVE_PAID_PACKAGE_LIST",
        items,
      })
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)
