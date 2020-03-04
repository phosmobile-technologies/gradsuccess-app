

import React, { Component } from 'react';
import LogoutView from './../views/logoutView';

class Logout extends Component {
  render() { 
    return <LogoutView redirectLink={this.props.redirectLink} />
  }
}

export default Logout;
