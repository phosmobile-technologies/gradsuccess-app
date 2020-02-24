import React, { Component } from "react"
import { Callout, Button} from "@blueprintjs/core"
import SimpleReactValidator from "simple-react-validator"
import { UPDATE_USER } from "./../../../graphql/mutations"
import { Mutation } from "react-apollo"
import { navigate } from "gatsby"

export default class EditProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "", // customer email
      first_name: "",
      last_name: "",
      phone: "",
      editSuccess: false,
    }
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
    })
  }

  handleFormInput = event => {
    const { name, value } = event.target
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  componentDidMount() {
    var user = this.props.user
    this.setState({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
    })
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={UPDATE_USER}
          onError={this.error}
          onCompleted={data => {
            this.setState({
              editSuccess: true,
            })
            setTimeout(() => {
              navigate("/user/account/dashboard")
            }, 3000)
          }}
        >
          {(editProfile, { loading, error }) => (
            <div className="p-edit-form-container">
              <form
                className="p-edit-form"
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
                      editProfile({
                        variables: {
                          id: this.props.user.id,
                          email: this.state.email, // customer email
                          first_name: this.state.first_name,
                          last_name: this.state.last_name,
                          phone: this.state.phone,
                        },
                      })
                    }
                  } else {
                    this.validator.showMessages()
                    this.forceUpdate()
                  }
                }}
              >
                {this.state.editSuccess && (
                  <Callout className="bp3-intent-success" icon="tick">
                    <span>Profile Updated Successfully</span>
                  </Callout>
                )}
               

                <div className="c-pwd-i">
                  <div className="input-e-c">
                    <span>Email Address</span>
                    <input
                      type="text"
                      className="bp3-input bp3-large"
                      placeholder="Email Address"
            
                      id="email"
                      name="email"
                      onChange={this.handleFormInput}
                      value={this.state.email}
                      onBlur={() => this.validator.showMessageFor("email")}
                    />
                    <p className="error_message">
                      <i>
                        {this.validator.message(
                          "email",
                          this.state.email,
                          "required"
                        )}
                      </i>
                    </p>
                  </div>

                  <div className="input-e-c">
                    <span>First Name</span>
                    <input
                      type="text"
                      className="bp3-input bp3-large"
                      placeholder="First Name"
            
                      id="first_name"
                      name="first_name"
                      onChange={this.handleFormInput}
                      value={this.state.first_name}
                      onBlur={() => this.validator.showMessageFor("first_name")}
                    />
                    <p className="error_message">
                      <i>
                        {this.validator.message(
                          "first_name",
                          this.state.first_name,
                          "required"
                        )}
                      </i>
                    </p>
                  </div>

                  <div className="input-e-c">
                    <span>Last Name</span>
                    <input
                      type="text"
                      className="bp3-input bp3-large "
                      placeholder="Last Name"
            
                      id="last_name"
                      name="last_name"
                      onChange={this.handleFormInput}
                      value={this.state.last_name}
                      onBlur={() => this.validator.showMessageFor("last_name")}
                    />
                    <p className="error_message">
                      <i>
                        {this.validator.message(
                          "last_name",
                          this.state.last_name,
                          "required"
                        )}
                      </i>
                    </p>
                  </div>

                  <div className="input-e-c">
                    <span>Phone</span>
                    <input
                      type="test"
                      className="bp3-input bp3-large"
                      placeholder="Phone"
            
                      id="phone"
                      name="phone"
                      onChange={this.handleFormInput}
                      value={this.state.phone}
                      onBlur={() => this.validator.showMessageFor("phone")}
                    />
                    <p className="error_message">
                      <i>
                        {this.validator.message(
                          "phone",
                          this.state.phone,
                          "required"
                        )}
                      </i>
                    </p>
                  </div>
                </div>
                <div className="c-pwd-btn">
                  <Button
                    type="submit"
                    className="bp3-intent-success bp3-large"
                    loading={loading ? true : false}
                  >
                    Save changes
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
