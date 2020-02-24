import React from "react"
import { SAVE_RESET_PASSWORD } from "../../../../../api/sendMailEndpoint"
import loader from "../../../../../images/loader.gif"

export default class resumeReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        email: "",
        password: "",
      },
      password_verified: true,
      account_created: false,
      message:""
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleForgotPassword = this.handleForgotPassword.bind(this)
    this.verifyPassword = this.verifyPassword.bind(this)
    this.verifyConfirmPassword = this.verifyConfirmPassword.bind(this)
    this.storePassword = this.storePassword.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
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

  resetPassword() {
    document.getElementById("loaderImage").style.display = "block"
    let url = SAVE_RESET_PASSWORD
      let emailAddress = {
          email: this.state.data.email,
          password:this.state.data.password,
      }
        fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        method: "post",
        body: JSON.stringify(emailAddress)
      }).then(function(response){
          return response.text()
      }).then((text)=>{
         if(text === "failed"){
           this.setState({
              message:text
           })
           document.getElementById("submittedSucces").style.display = "flex";
           document.getElementById("loaderImage").style.display = "none"
         }else{
            this.setState({
              account_created: true,
              message:text,
            })

            document.getElementById("loaderImage").style.display = "none"
         }
       
      }).catch(function(error){
          alert("password reset failed")
      })    
  }

  handleForgotPassword() {
    this.setState({
      forgotPassword: !this.state.forgotPassword,
    })
  }
  verifyPassword(event) {
    const {value } = event.target
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
    if (value !== this.state.data.password) {
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
          <div className="thank-you">
            <div className="thank-you-inner-left">
              <h1 className = "resteH1">
                {this.state.message}
              </h1>
              <div>
                <p></p>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      )
    } else {
      return (
        <div loader-wrapper>
        <div className = "loader" id = "loaderImage"><img className="loader-img" src={loader} alt="gradsuccess" /></div>
          <div className="expert-form">
                <div className="loader-wrapper">
                  <div id="submittedSucces" className="FailedTagFormReset">
                    {this.state.message}
                  </div>
                  <form
                    className="checkout-form-container"
                  >
                    <h3 className="form-header">Password Reset</h3>
                    <hr />
                    <p><small><strong>Hints:</strong> At least 8 characters—the more characters, the better
                    A mixture of both uppercase and lowercase letters,
                    A mixture of letters and numbers</small></p>
                    <div className="row-full">
                        <input
                          type="email"
                          placeholder="Email Address"
                          id="email"
                          name="email"
                          required
                          autoComplete="false"
                          onChange={this.handleFormInput}
                        />
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        autoComplete="false"
                        onChange={this.verifyPassword}
                        required
                        onBlur={this.storePassword}
                      />
                      <span id="password_info" className="password_info">
                        provide atleast 8 character password e.g ERe203_sj
                      </span>

                      <input
                        type="password"
                        placeholder="Comfirm Password"
                        id="confirm_password"
                        autoComplete="false"
                        name="confirm_password"
                        required
                        onChange={this.verifyConfirmPassword}
                      />
                      <span id="password_info_c" className="password_info">
                        password mismatch!
                      </span>
                    </div>

                    <br />
                    <input
                      type="button"
                      className="submit-details"
                      value="Submit"
                      css={{
                        opacity: this.state.password_verified ? "0.3" : "1",
                      }}
                      disabled={this.state.password_verified}
                      onClick= {this.resetPassword}
                    />
                  </form>
        </div>
        </div>
        </div>
      )
    }
  }
}
