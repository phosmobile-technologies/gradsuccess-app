import React from "react"
import { Button } from "@blueprintjs/core"
import SimpleReactValidator from "simple-react-validator"

export default class ExpertBasicInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      confirm_password: null,
      password_mismatch: false,
    }
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
    })
  }
  verifyInputs = () => {
    if (this.validator.allValid()) {
      if (this.state.confirm_password !== this.props.password) {
        this.setState({
          password_mismatch: true,
        })
      } else {
        this.props.nextStep()
      }
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  handleConfirmPassword = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }
  render() {
    const { handleFormInput, storePassword } = this.props
    return (
      <div>
        <h3 className="form-header expert-form-header">Apply As Expert</h3>
        <div className="expert-form">
          <form className="checkout-form-container">
            <div className="multi-step-wrapper">
              <ul>
                <li className="first-step">
                  <h3>1</h3>
                  <p>Associate Detail</p>
                </li>
                <li>
                  <h3>2</h3>
                  <p>Educational Background</p>
                </li>
                <li>
                  <h3>3</h3>
                  <p>Profile Image</p>
                </li>
                <li>
                  <h3>4</h3>
                  <p>Bio Format</p>
                </li>
                <li>
                  <h3>5</h3>
                  <p>Summary</p>
                </li>
              </ul>
            </div>
            <div className="align-input">
              <div className="align-input-w">
                <input
                  type="text"
                  required
                  placeholder="First name"
                  onChange={handleFormInput}
                  id="first_name"
                  autoComplete="false"
                  name="first_name"
                  className="bp3-input bp3-large"
                  value={this.props.first_name}
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "last_name",
                      this.props.last_name,
                      "required"
                    )}
                  </i>
                </p>
              </div>
              <div className="align-input-w">
                <input
                  type="text"
                  required
                  placeholder="Last name"
                  onChange={handleFormInput}
                  id="last_name"
                  autoComplete="false"
                  name="last_name"
                  className="bp3-input bp3-large"
                  value={this.props.last_name}
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "last_name",
                      this.props.last_name,
                      "required"
                    )}
                  </i>
                </p>
              </div>
            </div>

            <div className="align-input">
              <div className="align-input-w">
                <input
                  type="email"
                  placeholder="Email Address"
                  id="email"
                  name="email"
                  required
                  autoComplete="false"
                  className="bp3-input bp3-large"
                  onChange={handleFormInput}
                  value={this.props.email}
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "email",
                      this.props.email,
                      "required|email"
                    )}
                  </i>
                </p>
              </div>
              <div className="align-input-w">
                <input
                  type="text"
                  required
                  placeholder="Phone"
                  onChange={handleFormInput}
                  id="phone"
                  name="phone"
                  className="bp3-input bp3-large"
                  value={this.props.phone}
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "phone",
                      this.props.phone,
                      "required|phone"
                    )}
                  </i>
                </p>
              </div>
            </div>

            <div className="align-input">
              <div className="align-input-w">
                <input
                  type="text"
                  required
                  placeholder="Bank Account Number"
                  onChange={handleFormInput}
                  id="bank_account_number"
                  name="bank_account_number"
                  className="bp3-input bp3-large"
                  value={this.props.bank_account_number}
                />
              </div>
              <div className="align-input-w">
                <input
                  type="text"
                  required
                  placeholder="Bank Name"
                  onChange={handleFormInput}
                  id="bank_name"
                  name="bank_name"
                  className="bp3-input bp3-large"
                  value={this.props.bank_name}
                />
              </div>
            </div>

            <div className="align-input">
              <div className="align-input-w">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  autoComplete="false"
                  required
                  className="bp3-input bp3-large"
                  onBlur={storePassword}
                />
                <p className="error_message">
                  <i>
                    {this.validator.message(
                      "password",
                      this.props.password,
                      "required|min:8"
                    )}
                  </i>
                </p>
              </div>
              <div className="align-input-w">
                <input
                  type="password"
                  placeholder="Comfirm Password"
                  id="confirm_password"
                  autoComplete="false"
                  name="confirm_password"
                  required
                  className="bp3-input bp3-large"
                  onChange={this.handleConfirmPassword}
                  value={this.props.confirm_password}
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
                {this.state.password_mismatch && (
                  <p className="error_message">
                    <i>Confirm password does not match</i>
                  </p>
                )}
              </div>
            </div>
            <br />
            <div className="layout-btn">
              <Button
                type="button"
                className="bp3-button bp3-intent-success n-btn"
                onClick={this.verifyInputs}
                large={true}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
