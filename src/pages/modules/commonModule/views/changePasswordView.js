import React, { Component } from "react"
import { Callout, Button, Divider } from "@blueprintjs/core"
import SimpleReactValidator from "simple-react-validator"
import { UPDATE_PASSWORD } from './../../../graphql/mutations';
import { Mutation } from 'react-apollo';
import { navigate } from 'gatsby';




export default class ChangePasswordView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      new_password: "",
      comfirm_password: "",
      passwordDoNotMatch: false,
      passwordChanged: false
    }
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
    })
  }

  handleFormInput=(event) =>{
    const { name, value } = event.target
    this.setState(prevState => ({
        ...prevState,
        [name]: value,
    }))
  }


  render() {
    return (
      <div>
        <Mutation
          mutation={UPDATE_PASSWORD}
          onError={this.error}
          onCompleted={data => {
            this.setState({
              passwordChanged:true
            })
            setTimeout(() => {
              navigate(this.props.redirectLink)
            }, 1000);
          }}
        >
          {(changePassword, { data, loading, error }) => (
            <div className="loader-wrapper">
              <form
                className="c-pwd-form"
                onSubmit={e => {
                  e.preventDefault()

                  if (this.validator.allValid()) {
                    if (
                      this.state.new_password !== this.state.comfirm_password
                    ) {
                      this.setState({
                        passwordDoNotMatch: true,
                      })
                    } else {
                      changePassword({
                        variables: {
                          id: this.props.user.id,
                          password: this.state.new_password,
                        },
                      })
                    }
                  } else {
                    this.validator.showMessages()
                    this.forceUpdate()
                  }
                }}
              >
                <div className="c-pwd-tips">
                  <h3>
                    In other to protect your account, make sure your password
                    is:
                  </h3>
                  <ul>
                    <li>Is longer than 7 characters</li>
                    <li>
                      Does not match significantly contain your username, eg. do
                      not use "username123"
                    </li>
                    <li>Is not a common enlish word</li>
                  </ul>
                </div>
                {this.state.passwordChanged && (
                  <Callout
                    className="bp3-intent-success"
                    icon="tick"
                  >
                    <span>Password was successfully changed</span>
                  </Callout>
                )}
                {this.state.passwordDoNotMatch && (
                  <Callout className="bp3-intent-danger" icon="error">
                    <span>Password does not match</span>
                  </Callout>
                )}
                <Divider />
                <div className="c-pwd-i">
                  <input
                    type="password"
                    className="bp3-input bp3-large"
                    placeholder="New Password"
                    id="new_password"
                    name="new_password"
                    onChange={this.handleFormInput}
                    value={this.state.new_password}
                    onBlur={() => this.validator.showMessageFor("new_password")}
                  />
                  <p className="error_message">
                    <i>
                      {this.validator.message(
                        "new_password",
                        this.state.new_password,
                        "required"
                      )}
                    </i>
                  </p>
                  <input
                    type="password"
                    className="bp3-input bp3-large"
                    placeholder="Confirm Password"
                    id="comfirm_password"
                    name="comfirm_password"
                    onChange={this.handleFormInput}
                    value={this.state.comfirm_password}
                    onBlur={() =>
                      this.validator.showMessageFor("comfirm_password")
                    }
                  />
                  <p className="error_message">
                    <i>
                      {this.validator.message(
                        "comfirm_password",
                        this.state.comfirm_password,
                        "required"
                      )}
                    </i>
                  </p>
                </div>
                <div className="c-pwd-btn">
                  <Button type="submit" loading={loading ? true : false}>
                    Change password
                  </Button>
                </div>
              </form>
              {error && (
                <Callout className="bp3-intent-danger pwd-callout" icon="error">
                  {error.graphQLErrors.map(({ message }, i) => (
                    <span key={i}>{message}</span>
                  ))}
                </Callout>
              )}
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}
