import React from "react"
import { graphql } from "gatsby"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { UPDATE_CLIENT_ACCOUNT } from "../../graphql/mutations"
import loader from "../../../images/loader.gif"

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data:{
           id:this.props.id,
           first_name:this.props.first_name,
           last_name:this.props.last_name,
           email:this.props.email,
           phone:this.props.phone,
      },
      password_verified: true,
      account_created: false,
      moredetails:""
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleForgotPassword = this.handleForgotPassword.bind(this)
    this.verifyPassword = this.verifyPassword.bind(this)
    this.verifyConfirmPassword = this.verifyConfirmPassword.bind(this)
    this.storePassword = this.storePassword.bind(this)
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
    this.setState({
         account_created:true
    })
    setTimeout(function() {
      window.location.reload()
    }, 2000)
  }

  handleForgotPassword() {
    this.setState({
      forgotPassword: !this.state.forgotPassword,
    })
  }
  verifyPassword(event) {
    const { name, value } = event.target
    const password_info = document.getElementById("password_info")
    // When the user starts to type something inside the password field
    // Validate length
    if (value.length >= 8) {
      password_info.style.display = "none"
    } else {
      password_info.style.display = "block"
      this.setState({
        password_verified: true,
      })
    }
  }

  storePassword(event) {
    const { name, value } = event.target
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }))
  }

  verifyConfirmPassword(event) {
    const { value } = event.target
    const password_info_c = document.getElementById("password_info_c")
    // When the user starts to type something inside the password field
    // Validate length
    if (value != this.state.data.password) {
      this.setState({
        password_verified: true,
      })
      password_info_c.style.display = "block"
    } else {
      password_info_c.style.display = "none"
      this.setState({
        password_verified: false,
      })
    }
  }

  render() {
    if (this.state.account_created) {
      return (
        <div>
          <div className="account-updated">
            <div >
              <h1>
                Account Updated <i>!</i>
              </h1>
              <div>
                <p>Your Account was successfully updated </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="expert-form expert-form-extend">
            <Mutation
              mutation={UPDATE_CLIENT_ACCOUNT}
              onError={this.error}
              onCompleted={data => {
                this.formSubmitted(data)
              }}
            >
              {(createExpertAccount, { data, loading, error }) => (
                <div className="loader-wrapper">
                  <div id="submittedSucces" className="SuccessTagForm">
                    Success! Account Create Successfully...
                  </div>
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      createExpertAccount({
                        variables: this.state.data,
                      })
                    }}
                    className="checkout-form-container"
                  >
                    <h3 className="form-header">Update Profile</h3>
                    <div className="row-full">
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="First name"
                            onChange={this.handleFormInput}
                            value = {this.state.data.first_name}
                            id="first_name"
                            autoComplete="false"
                            name="first_name"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="Last name"
                            onChange={this.handleFormInput}
                            value = {this.state.data.last_name}
                            id="last_name"
                            autoComplete="false"
                            name="last_name"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <input
                          type="email"
                          placeholder="Email Address"
                          id="email"
                          name="email"
                          value = {this.state.data.email}
                          required
                          autoComplete="false"
                          onChange={this.handleFormInput}
                        />

                        <div className="col">
                          <input
                            type="text"
                            required
                            placeholder="Phone"
                            value = {this.state.data.phone}
                            onChange={this.handleFormInput}
                            id="phone"
                            name="phone"
                          />
                        </div>
                      </div>
                      <div className="row-full">        
                              <textarea type="text"
                               placeholder="More Details"
                               id = "more_details"
                               name = "more_details"
                               rows = '4' onChange = {this.handleFormInput} >
                              </textarea>
                        </div>
                    </div>

                    <br />
                    <input
                      type="submit"
                      className="submit-details"
                      value="Update"
                    />
                  </form>
                  {loading && (
                    <div className="loader">
                      <img
                        className="loader-img"
                        src={loader}
                        alt="gradsuccess"
                      />
                    </div>
                  )}
                  {error && (
                    <div className="FailedTagForm"> Email already Exists</div>
                  )}
                </div>
              )}
            </Mutation>
          </div>
        </div>
      )
    }
  }
}
