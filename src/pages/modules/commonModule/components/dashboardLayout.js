import React, { Component } from "react"
import DashboardLayoutView from "./../views/dashboardLayoutView"
import { connect } from 'react-redux';
import { navigate } from 'gatsby';

class DashboardLayout extends Component {

  componentDidMount(){
    if(this.props.user=== null){
      navigate("/")
    }
  }
  render() {
    return (
      <div>
        <DashboardLayoutView
          routes={this.props.routes}
          body={this.props.body}
          title= {this.props.title}
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.loggedInUser,
  }
}

export default connect(mapStateToProps,null)(DashboardLayout)