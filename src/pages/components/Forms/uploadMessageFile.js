import React from 'react';
import uploadIcon from "../../../images/upload_icon.png"
import uploaded from "../../../images/uploaded.png"
import { Mutation } from 'react-apollo';
import loader from "../../../images/loader.gif"
import loader2 from "../../../images/loader.gif"
import { SEND_ATTACHMENT } from '../../graphql/mutations';

export default class uploadMessageFile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			upload_files:""
		}

		this.onChange = this.onChange.bind(this);
	}


    onChange(e) {
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
        
        const uploader = document.getElementById('uploader')
        const uploadingText = document.getElementById('uploading')
        const completeText = document.getElementById('complete')
        const errorText = document.getElementById('error')
        let CVName = this.props.sender.replace(/\s+/g, '_')
        let timeSubmitted = new Date().getTime()
        var file = document.getElementById('file').files[0];
        let fileRef = 'upload_files/' + CVName + "_" + timeSubmitted + "_" + file.name
        this.setState({
                "upload_files": fileRef
            }
        )
        var storageRef = firebase.storage().ref(fileRef)
        var task = storageRef.put(file)
        task.on('state_changed',
            function progress(snapshot) {
                uploadingText.style.display = "block"
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                uploader.value = percentage
            },
            function error(err) {
                uploadingText.style.display = "none"
                errorText.style.display = "block"
            },
            function complete() {
            	document.getElementById('uplaodedFile').src = loader

                uploadingText.style.display = "none"
                errorText.style.display = "none"
                completeText.style.display = "block"
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').style.opacity = '1'

			       storageRef.getDownloadURL().then((url) =>{
			            document.getElementById('uplaodedFile').src = url
			            document.getElementById('uplaodedFile').alt = CVName
			       
			        }).catch((error) => {

			         console.log(error)
	                });


            })
    }




	render() {
		return (
			<div>
				<div className = "upload_container">
					<div className = "upload_inner">
					<img src={uploadIcon} htmlFor = "file" id = "uplaodedFile"  />
					</div>


					<div className = "upload_progress_container">
						<input
	                      type="file"
	                      name="file"
	                      id="file"
	                      className = "file_upload"
	                      onChange={this.onChange}/>
	                     <div className = "upload_progress_wrapper">		                    
	                      	<div className = "progressBar">
		                        <label className = "uploading" id = "uploading">Uploading...</label>
		                        <label className = "complete" id = "complete">Complete!</label>
		                        <label className = "error" id = "error">Error!</label>
		                      	<progress value = "0" max= "100" id = "uploader">0%</progress>
		                    </div>
		                    <div className = "file_upload_label">
		                      <label htmlFor="file" >Attached file</label>
		                    </div>
	                    </div>
	                    <Mutation
			                mutation={SEND_ATTACHMENT}
			                onError={this.error}
			                onCompleted={data=>{
			                this.formSubmitted()
			                }}
			                >
			                {(createCoverLetterReviewData, { data,loading, error}) => (
			                <div className = "loader-wrapper">
			                  <div id="submittedSucces" className="SuccessTagForm">
			                    Success! Your details was submitted...
			                  </div>
			                  <form
			                    onSubmit={e => {
			                    e.preventDefault();
			                    createCoverLetterReviewData({
			                    variables: this.state.data
			                    });
			                    }}
			                   >
			                    <input type = "submit" className = "sendFileUploadBtn" value = "Send" id = "submitBtn"/>
			                    
			                  </form>
			                  {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
			                  {error && <div className="FailedTagForm"> Failed! Something is not right...</div>}
			                </div>
			                )}
			                </Mutation>
                    </div>
				</div>
			</div>
		);
	}
}
