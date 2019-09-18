import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import discouted from "../../../images/logo.png"
import displayPicture from "../../../images/dan.jpeg"
import LogoutForm from "../Forms/logoutForm"
import dan from "../../../images/default_profile_img.png"
import {PROFILE_IMAGE_REF} from "../../../api/sendMailEndpoint"
//Men icon
import settingIcon from "../../../images/icons/setting.png"


// Dropdown menu import
import Settings from './settings'



export default class mainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings:false,
      imgUrl:"",
      noProfileImage:false
    };  
     this.handleDropDownMenu = this.handleDropDownMenu.bind(this);
     this.downloadUploadedFile = this.downloadUploadedFile.bind(this);
     this.handleComponents = this.handleComponents.bind(this);
  }

  handleDropDownMenu(){
      this.setState({
        showSettings:!this.state.showSettings,
        
      })
    
  }


componentDidMount(){
        let url = PROFILE_IMAGE_REF
        let data = {
            expert_id: this.props.id,
            
        }
          fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          method: "post",
          body: JSON.stringify(data)
        }).then(function(response){
            return response.text()
        }).then((text)=>{
          if(text === "No Image"){
            this.setState({
          noProfileImage:true
            })
          }else{
              this.downloadUploadedFile(text)
          }
        }).catch(function(error){
            console.log("failed");
        })
    }

    downloadUploadedFile(downloadRef){
        const firebase = require("firebase")
        const config = {
          apiKey: "AIzaSyC26CrW2BGh2lXXDK0Gkcl4gCIPccHvW6s",
          authDomain: "gradsuccess.firebaseapp.com",
          databaseURL: "https://gradsuccess.firebaseio.com",
          projectId: "gradsuccess",
          storageBucket: "gradsuccess.appspot.com",
          messagingSenderId: "1038128602103",
          appId: "1:1038128602103:web:55d1ab3ffe5b02bf222cf2",
        }
        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }
        var storageRef = firebase.storage().ref(downloadRef)

       storageRef.getDownloadURL().then((url) =>{
          this.setState({
              imgUrl:url
          })
        }).catch((error) => {
         switch (error.code) {
            case 'storage/object-not-found':
             this.setState({
                  fileNotAvailable:true
              })
              break;

            case 'storage/unauthorized':
               this.setState({
                  fileNotAvailable:true
              })
              break;

            case 'storage/canceled':
               this.setState({
                  fileNotAvailable:true
              })
              break;

            case 'storage/unknown':
               this.setState({
                  fileNotAvailable:true
              })
              break;
         }

        });
    }

   handleComponents(func){
     this.handleDropDownMenu();
     this.props.showEditComponent(func)
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

          { this.state.showSettings && 
            <div className = "drop-down-main settings">
              <div className = "drop-down-main-inner">
                <div className = "drop-down-main-list">
                  <div className= "s-p-wrapper">
                    <div className= "s-p-image">
                      {this.state.noProfileImage?<img id = "default" src = {dan}/>:<img id = "custom" src = {this.state.imgUrl}/>}
                    </div>
                    <div className= "s-p-detail">
                      <p><strong>{this.props.accountName}</strong></p>
                      <p>{this.props.email}</p>
                    </div>
                  </div>
                  <div className = "not-item">
                    <button onClick = {()=>this.handleComponents("editProfile")}>Edit Profile</button>
                  </div>
                  <div className = "not-item">
                    <button onClick = {()=>this.handleComponents("updateProfileImage")} >Update Profle Image</button>
                  </div>
                </div>
                <div className = "drop-down-main-bottom">
                  <LogoutForm />
                </div>
              </div>
          </div>
          }</div>
    )
  }
}
