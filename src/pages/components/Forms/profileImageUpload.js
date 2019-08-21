
import React from "react"
import { graphql } from "gatsby"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CREATE_CLIENT_ACCOUNT } from "../../graphql/mutations"
import loader from "../../../images/loader.gif"
import defaultImage from "../../../images/default_profile_img.png"

export default class resumeReviewForm extends React.Component {
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

_onChange(event){
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
}


  onChange(e) {
  	document.getElementById("submittedSucces").style.display = "block"
    const firebase = require("firebase")

      	const config = {
      		apiKey: 'AIzaSyB9uwinxn9jEKUmcz0_7rxgLDycAeGO2Fk',
      		authDomain: 'gradsuccess-6c883.firebaseapp.com',
      		databaseURL: 'https://gradsuccess-6c883.firebaseio.com',
      		projectId: 'gradsuccess-6c883',
      		storageBucket: 'gs://gradsuccess-6c883.appspot.com/',
      		messagingSenderId: '153907721792',
      		appID:"1:153907721792:web:ff681e47886cdbb7"
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
            console.log(err)
        },
        function complete() {
            document.getElementById("submittedSucces").style.display = "none"
            document.getElementById("accountCreated").style.display = "block";
            setTimeout(function() {
           		window.location = "/"
		    }, 5000)
		      
        })
    }
  render() {
    if (this.state.account_created) {
      return (
        <div>
          <div className="thank-you">
            <div className="thank-you-inner-left">
              
            </div>
          </div>
        </div>
      )
    } else {
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
	                	<p>Your Account was successfully Created,</p>
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
                      className="submit-details"
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
}
