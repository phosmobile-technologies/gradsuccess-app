import React from "react"
import { Mutation } from "react-apollo"
import { LOGIN } from "../../../../graphql/mutations"
import loader from "../../../../../images/loader.gif"
import { AUTH_TOKEN } from "../../../../../apollo/constants"
import { connect } from "react-redux"
import { navigate } from 'gatsby';
import { FORGOT_PASSWORD } from "./../../../../graphql/mutations"
import {
  Button,
  Callout
} from "@blueprintjs/core"
import SimpleReactValidator from "simple-react-validator"

 class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        email: null,
        password: null,
      },
      forgotPassword: false,
      message: "",
      password_reset_success: false,
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleForgotPassword = this.handleForgotPassword.bind(this)
    this.formSubmitted = this.formSubmitted.bind(this)
     this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
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


  formSubmitted(data) {
    localStorage.setItem(AUTH_TOKEN, data.login.access_token)
    this.props.saveLoggedInUser(data.login.user);

    if (!this.props.handleCloseModal){
        navigate("/auth.user/");
    }else{
       window.location.reload()
    }
  }

  handleForgotPassword() {
    this.setState({
      forgotPassword: !this.state.forgotPassword,
    })
  }
  render() {
    return (
      <div>
        <div className="detail-form login-form loginModal loader-wrapper">
          <div className="loader" id="loaderImage">
            <img className="loader-img" src={loader} alt="gradsuccess" />
          </div>

          {this.state.forgotPassword ? (
            <Mutation
              mutation={FORGOT_PASSWORD}
              onError={this.error}
              onCompleted={data => {
                // this.formSubmitted(data)
              }}
            >
              {(resetPassword, { data, loading, error }) => (
                <div className="loader-wrapper">
                  {data && (
                    <Callout
                      className="bp3-intent-success cart-resize"
                      icon="error"
                    >
                      {data.forgotPassword.message}
                    </Callout>
                  )}
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      resetPassword({
                        variables: {
                          email: this.state.data.email,
                        },
                      })
                    }}
                    className="checkout-form-container login-form"
                  >
                    <h3 className="form-header">Forgot Password</h3>
                    <div className="row-full">
                      <input
                        type="text"
                        placeholder="Email"
                        id="email"
                        name="email"
                        onChange={this.handleFormInput}
                      />
                       <p className="error_message">
                    <i>
                      {this.validator.message(
                        "email",
                        this.state.data.email,
                        "required"
                      )}
                    </i>
                  </p>
                      <br />
                    </div>

                    <br />
                    <Button
                      type="submit"
                      className="bp3-intent-success bp3-large submit-button"
                      loading={loading ? true : false}
                    >
                      Reset Password
                    </Button>
                  </form>
                  {error && (
                    <Callout
                      className="bp3-intent-danger cart-resize"
                      icon="error"
                    >
                      {error.graphQLErrors.map(({ message }, i) => (
                        <span key={i}>{message}</span>
                      ))}
                    </Callout>
                  )}
                </div>
              )}
            </Mutation>
          ) : (
            <Mutation
              mutation={LOGIN}
              onError={this.error}
              onCompleted={data => {
                this.formSubmitted(data)
              }}
            >
              {(loginUser, { data, loading, error }) => (
                <div className="loader-wrapper">
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      if (this.validator.allValid()) {
                         loginUser({
                           variables: this.state.data,
                         })
                      } else {
                        this.validator.showMessages()
                        this.forceUpdate()
                      }

                      
                     
                    }}
                    className="checkout-form-container login-form"
                  >
                    <h3 className="login-header">Login </h3>
                    <div className="row-full">
                      <input
                        type="text"
                        placeholder="Email"
                        id="email"
                        name="email"
                        onChange={this.handleFormInput}
                      />
                       <p className="error_message">
                    <i>
                      {this.validator.message(
                        "email",
                        this.state.data.email,
                        "required"
                      )}
                    </i>
                  </p>
                      <br />

                      {this.state.forgotPassword ? (
                        " "
                      ) : (
                        <>
                        <input
                          type="password"
                          placeholder="Password"
                          id="password"
                          name="password"
                          onChange={this.handleFormInput}
                        />
                         <p className="error_message">
                    <i>
                      {this.validator.message(
                        "password",
                        this.state.data.password,
                        "required"
                      )}
                    </i>
                  </p>
                  </>
                      )}
                    </div>

                    <br />
                    <Button
                      type="submit"
                      className="bp3-intent-success bp3-large submit-button"
                      loading={loading ? true : false}
                    >
                      Login
                    </Button>
                  </form>
                  {error && (
                    <Callout
                      className="bp3-intent-danger cart-resize"
                      icon="error"
                    >
                      {error.graphQLErrors.map(({ message }, i) => (
                        <span key={i}>{message}</span>
                      ))}
                    </Callout>
                  )}
                </div>
              )}
            </Mutation>
          )}

          <div className="explainInput">
            <h3>Note</h3>

            <p>
              Please login with your checkout email address and the password
              sent to the email address
            </p>
            <p>
              Note: Ensure to change the password from your dashboard for
              security purposes.
            </p>

            <br />
            {this.state.forgotPassword ? (
              <button
                className="forgot_password"
                onClick={this.handleForgotPassword}
              >
                Login
              </button>
            ) : (
              <button
                className="forgot_password"
                onClick={this.handleForgotPassword}
              >
                Forgot password
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    saveLoggedInUser: user => {
      dispatch({
        type: "SAVE_LOGGEDIN_USER",
        user,
      })
    }
  }
}
export default connect(
  null,
  mapDispatchToProps,
)(Login)