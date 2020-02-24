import React, { Component } from 'react';
import { Query } from "react-apollo"
import { LOGGED_IN_USER } from "../../../graphql/queries"
import logo from '../../../../images/logo2.png'
import NotFoundPage from './../../../401';
import { Spinner } from "@blueprintjs/core"
import { connect } from 'react-redux';
import { navigate } from 'gatsby';

class AuthUser extends Component {
  
  redirectUser(data){
    this.props.saveUserDetails(data);

    switch (data.account_type) {
      case "Admin":
        navigate("admin/account/new-application", {
          replace: true,
        })
        break
      case "Associate":
        navigate("associate/account/new-application", {
          replace: true,
        })
        break
      default:
        navigate("user/account/dashboard", {
          replace: true,
        })
        break
    }
  }

  render() {
    return (
      <Query
        query={LOGGED_IN_USER}
        onCompleted={data => {
          this.redirectUser(data.me)
        }}
        fetchPolicy = "no-cache"
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="loading-logged-user-landing">
                <img src={logo} alt="gradsuccess" />
                <Spinner
                  className="bp3-intent-success"
                  number={Spinner.SIZE_LARG}
                />
              </div>
            )
          if (error) return <NotFoundPage />
          return (
            <div>
              {data.allExpertDetail === null ? (
                <div className="client_expert_listing_main_expert">
                  <h4>No Item Available</h4>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}



function mapDispatchToProps(dispatch) {
  return {
    saveUserDetails: data => {
      dispatch({
        type: "SAVE_USER_DETAILS",
        data,
      })
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AuthUser)