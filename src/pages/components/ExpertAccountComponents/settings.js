import React from 'react';
import LogoutForm from "../Forms/logoutForm"
import dan from "../../../images/default_profile_img.png"
import { Link } from "gatsby"
import {PROFILE_IMAGE_REF} from "../../../api/sendMailEndpoint"

export default class settings extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imgUrl:"",
			noProfileImage:false
		}
		 this.downloadUploadedFile = this.downloadUploadedFile.bind(this);
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

	render() {
		return (
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
								<Link to="profile-update/edit-profile" activeStyle={{color: 'white'}} className="pad">Edit Profile</Link>
							</div>
							<div className = "not-item">
								<Link to="profile-update/change-profile-image" activeStyle={{color: 'white'}} className="pad">Change Profle Image</Link>
							</div>
						</div>
						<div className = "drop-down-main-bottom">
							<LogoutForm />
						</div>
					</div>
					</div>
		);
	}
}
