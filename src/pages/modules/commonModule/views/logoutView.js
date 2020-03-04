

import React, { Component } from "react"
import { Callout, Button,} from "@blueprintjs/core"
import { LOGOUT } from "./../../../graphql/mutations"
import { Mutation } from "react-apollo"
import { navigate } from "gatsby"
import logoutIcon from '../../../../images/logout.svg'
import { connect } from 'react-redux';

 class LogoutView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editSuccess: false,
    }

  }

  handleFormInput = event => {
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
          mutation={LOGOUT}
          onError={this.error}
          onCompleted={data => {
            localStorage.removeItem("auth-token");
            this.props.resetUser();
             navigate("/",{
               replace:true
             })
          }}
        >
          {(logout, { loading, error }) => (
            <div className="p-edit-form-container">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  logout({
                    variables: {},
                  })
                }}
              >
                <div className="logout">
                  <div className = "logout-t">
                    <img src={logoutIcon} alt="gradsuccess loguot" />
                    Are you sure your want to Logout?
                  </div>
                  <div className="logout-btn">
                    <div className="logout-btn-inner">
                      <Button
                        type="submit"
                        className="bp3-intent-danger bp3-large"
                        loading={loading ? true : false}
                      >
                        Logout
                      </Button>
                      <Button
                        type="button"
                        className="bp3-intent-success bp3-large"
                        onClick = {()=>{
                          navigate(this.props.redirectLink)
                        }}
                      >
                        Go Back
                      </Button>
                    </div>
                  </div>
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

function mapDispatchToProps(dispatch) {
  return {
    resetUser: user => {
      dispatch({
        type: "RESET_USER",
        user,
      })
    },
  }
}
export default connect(
  null,
  mapDispatchToProps
)(LogoutView)