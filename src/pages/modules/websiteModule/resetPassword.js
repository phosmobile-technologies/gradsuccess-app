import React, { Component } from "react"
import { Callout, Button } from "@blueprintjs/core"
import { UPDATE_FORGOTTEN_PASSWORD } from "../../graphql/mutations"
import { navigate } from "gatsby"
import { Mutation } from "react-apollo"
import Layout from "./components/layout"
import SimpleReactValidator from "simple-react-validator"

export default class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      new_password: null,
      confirm_password: null,
      resetToken: null,
      email: null,
      passwordMismatch: false,
    }
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
    })
  }

  componentDidMount() {
    let pathName = this.props.location.pathname.split("/")
    let resetToken = pathName[2]
    let email = pathName[3]

    this.setState(
      {
        resetToken,
        email,
      },
      () => {}
    )
  }

  handleForm = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  render() {
    if (this.state.resetToken) {
      return (
        <Layout>
          <div className="co-container">
            <div className="co-inner">
              <Mutation
                mutation={UPDATE_FORGOTTEN_PASSWORD}
                onError={this.error}
                onCompleted={data => {
                  if (
                    data.updateForgottenPassword.status === "PASSWORD_UPDATED"
                  ) {
                    navigate("/")
                  }
                }}
              >
                {(updateForgotenPassword, { data, loading, error }) => (
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault()
                        this.setState({
                          passwordMismatch: false,
                        })
                        if (this.validator.allValid()) {
                          if (
                            this.state.new_password ===
                            this.state.confirm_password
                          ) {
                            updateForgotenPassword({
                              variables: {
                                email: this.state.email,
                                token: this.state.resetToken,
                                password: this.state.new_password,
                                password_confirmation: this.state
                                  .confirm_password,
                              },
                            })
                          } else {
                            this.setState({
                              passwordMismatch: true,
                            })
                          }
                        } else {
                          this.validator.showMessages()
                          this.forceUpdate()
                        }
                      }}
                      ref={form => (this.form = form)}
                      className="checkout-form-container"
                      id="cartForm"
                    >
                      <h3>Reset Password</h3>
                      {error && (
                        <Callout className="bp3-intent-danger" icon="error">
                          {error.graphQLErrors.map(({ message }, i) => (
                            <span key={i}>{message}</span>
                          ))}
                        </Callout>
                      )}
                      {this.state.passwordMismatch && (
                        <Callout className="bp3-intent-danger" icon="error">
                          <span>The password confirmation does not match.</span>
                        </Callout>
                      )}
                      {data && (
                        <Callout className="bp3-intent-success" icon="tick">
                          <span>{data.updateForgottenPassword.message}</span>
                        </Callout>
                      )}
                      <hr />
                      <p>
                        <small>
                          <strong>Hints:</strong>Use at least 8 characters— A mixture of letters
                          and numbers
                        </small>
                      </p>

                      <div className="c-fill">
                        <input
                          type="password"
                          className="bp3-input bp3-large"
                          placeholder="New Password"
                          onChange={this.handleForm}
                          id="new_password"
                          name="new_password"
                          value={this.state.new_password}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "Password",
                              this.state.new_password,
                              "required|min:8"
                            )}
                          </i>
                        </p>
                      </div>
                      <div className="c-fill">
                        <input
                          type="password"
                          className="bp3-input bp3-fill bp3-large"
                          placeholder="Confirm Password"
                          onChange={this.handleForm}
                          id="confirm_password"
                          name="confirm_password"
                          onBlur={this.verifyEmail}
                          value={this.state.confirm_password}
                        />
                        <p className="error_message">
                          <i>
                            {this.validator.message(
                              "confirm_password",
                              this.state.confirm_password,
                              "required"
                            )}
                          </i>
                        </p>
                      </div>

                      <Button type="submit" loading={loading}>
                        Reset Password
                      </Button>
                    </form>
                  </div>
                )}
              </Mutation>
            </div>
          </div>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <div></div>
        </Layout>
      )
    }
  }
}
