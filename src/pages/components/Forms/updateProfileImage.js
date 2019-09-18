
import React from "react"
import { graphql } from "gatsby"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CREATE_CLIENT_ACCOUNT } from "../../graphql/mutations"
import loader from "../../../images/loader.gif"
import defaultImage from "../../../images/default_profile_img.png"
import { UPDATE_PROFILE_IMAGE } from "../../../api/sendMailEndpoint"

export default class UploadProfileImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image_ready:true,
      imageUrl:"",
      file:"",
      profileImageRef:"",
      account_created:false
    }
    this.onChange = this.onChange.bind(this);
    this._onChange = this._onChange.bind(this)
  }
  componentDidMount(){
    if(localStorage.getItem('profileID') === undefined){
      window.location = "/"
    }
  }
_onChange(event){
  this.setState({
    file: URL.createObjectURL(event.target.files[0])
  })
}


  onChange(e) {
  	document.getElementById("submittedSucces").style.display = "block"
    const id = this.props.id
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
		let imageName = "Gradsuccess_profile_image"
		let timeSubmitted = new Date().getTime()
		var file = document.getElementById('file').files[0];
		let fileRef = 'ProfileImages/' + imageName + "_" + timeSubmitted + "_" + file.name
		this.setState(prevState => ({   
		        "profileImageRef": fileRef

		}))
	    var storageRef = firebase.storage().ref(fileRef)
	    var task = storageRef.put(file)
	    task.on('state_changed',
        function progress(snapshot) {
            //
        },
        function error(err) {
            alert("profile image update failed")
        },
        function complete() {
          let url = UPDATE_PROFILE_IMAGE
          let data = {
              profileID:id,
              imageRef: fileRef,
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
              document.getElementById("submittedSucces").style.display = "none"
              document.getElementById("accountCreated").style.display = "block";
              setTimeout(function() {
                  localStorage.removeItem('profileID');
                 window.location.reload()
          }, 2000)
          }).catch(function(error){
          })



		      
        })
    }
  render() {
      return (
        <div>
          <div className="expert-form">
          <div id="submittedSucces">
                    <div className="loader">
                      <img
                        className="loader-img"
                        src={loader}
                        alt="gradsuccess"
                      />
                    </div>
                  </div>
            
                  <div id = "accountCreated">
                  	<div>
	                	<p>Profile image was updated successfully,</p>
	              	</div>
                  </div>
                  <form className="checkout-form-container"
                  > 
                  	 <input
                      type="file"
                      name="file"
                      id="file"
                      ref="uploadImg"
                      className = "file_upload"
                      onChange={this._onChange}/>

                  	<div className =  {this.state.file !== ""?"uploadImg":"hide-upload-img"}>
                     <img  src = {this.state.file}/>
                     	<label htmlFor="file">change</label>
                   	</div>
                     <div className = "p-image" id = {this.state.file !== ""?"hide-d-img":""} >
                    
                       <div >
                         <img  id = "previewimg" src = {defaultImage}/>
                       </div>
                       <label htmlFor="file">Upload Image</label>
                     </div>
                    <input
                      type="button"
                      className="upload-p"
                      value="Save"
                      disabled={this.state.file ===""}
                      onClick = {this.onChange}
                    />
                  </form>
                  
          </div>
        </div>
      )
  }
}
