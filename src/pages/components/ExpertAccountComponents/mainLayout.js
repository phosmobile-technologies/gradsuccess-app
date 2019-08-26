import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {Link} from 'gatsby'


import discouted from "../../../images/logo.png"
import displayPicture from "../../../images/dan.jpeg"

//Men icon

import settingIcon from "../../../images/icons/setting.png"


// Dropdown menu import
import Settings from './settings'



export default class mainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings:false
    };  
     this.handleDropDownMenu = this.handleDropDownMenu.bind(this);
  }

  handleDropDownMenu(){
      this.setState({
        showSettings:!this.state.showSettings,
        
      })
    
  }


  render() {
    return (
      <div className = "d-header-container">
      <div className = "d-header">
         <div className = "d-header-inner">
            <div className = "d-menu-container">
             <h3 className = "form-header-main" >{this.props.currentComponent}</h3>
            </div>

            <div className = "d-notifications-area-container">
                <div className = "hamburger-menu" onClick = {this.props.toggleMenu}>
                  <div className = "stroke-1"></div>
                  <div className = "stroke-2"></div>
                  <div className = "stroke-3"></div>
                </div>
                <img  onClick={this.handleDropDownMenu.bind()} src={settingIcon} alt="Logo" />
            </div>
         </div>

         </div>

          <div>
             
         </div>

          { this.state.showSettings && <Settings  email = {this.props.email} accountName = {this.props.accountName} id = {this.props.id} changePassword = {this.props.changePassword} handleDropDownMenu = {this.handleDropDownMenu}/> }
      </div>
    )
  }
}
