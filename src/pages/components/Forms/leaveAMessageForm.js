import React from 'react';
import sendIcon from "../../../images/send_icon.svg"
import AttachedFile from "../../../images/attach.png"
import downloadedAttach from "../../../images/download2.png"
import { CREATE_MESSAGE } from '../../graphql/mutations';
import { FETCH_CLIENT_MESSAGES } from '../../graphql/queries';
import { Mutation } from 'react-apollo';
import { Query } from 'react-apollo';
import loader from "../../../images/loader.gif"
import loaderImage from "../../../images/loadingImage.gif"
import Modal from "react-modal"
import UploadMessageFile from './uploadMessageFile';


const defaultStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(17, 153, 146, 0.3)'
  }
};

export default class leaveAMessageForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			dateSent:"24/07/2019",
			sender:"Bunner Speef",
			messages:[
				{
					messageBody:"Welcome to Gradsucess... leave a for a message for an expert"
				}
				],
			typedText:"",
			expertInChargeID:"",
			UploadMessageFile:false,
			fileRef:"",
			fileUrl:"",
			fileName:"",
			fileType:""

			}
			this.handleSendMessage = this.handleSendMessage.bind(this)
			this.submitMessage = this.submitMessage.bind(this)
			this.handleMessageUpload = this.handleMessageUpload.bind(this)
			this.handleCloseModal = this.handleCloseModal.bind(this)
			this.onChange = this.onChange.bind(this)
		}
		componentDidMount(){
			if(this.props.expert_id){
				this.setState({
				expertInChargeID:this.props.expert_id
			})
			}else{
				this.setState({
				expertInChargeID:localStorage.getItem('chat_state')
			})
			}
		}

		handleCloseModal(){
		    this.setState({
		        UploadMessageFile:false
		    })   
		}

		handleSendMessage(e){
			const typedText = e.target.value;
			this.setState({
				typedText:typedText
			})
		}

		handleMessageUpload(){
			this.setState({
				UploadMessageFile:true
			})
		}

		submitMessage(data){
			const m = {
				messageBody:data.createMessages.message_body
			}
			this.setState(prevState => ({
	            messages: [...prevState.messages,m]
	        }))
		}
		formSubmitted(data) {
        document.getElementById("submittedSuccess").style.display = "block"

	        setTimeout(function() {
	            if (document.getElementById("submittedSuccess") != null) {
	                document.getElementById("submittedSuccess").style.display = "none"
	            }
	        }, 5000)
	        this.setState({
	          form_submit_success:true
	        })
	        this.submitMessage(data)

	        document.getElementById('chat_message').value = ""
	    }



	    onChange(e) {
	    document.getElementById('attachedDocument').src = loaderImage
	    document.getElementById('uploadLoader').style.display = "block"
	    document.getElementById('submittedInprogress').style.display = "block"
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

        let CVName = this.props.sender.replace(/\s+/g, '_')
        let timeSubmitted = new Date().getTime()
        var file = document.getElementById('file').files[0];
        var fileLink = "";
        var uploaded = false;
        var complete = ""
        let fileRef = 'upload_files/' + CVName + "_" + timeSubmitted + "_" + file.name
        let FileType = file.type.split("/")[0];
        this.setState({
                "upload_files": fileRef
            }
        )
        var storageRef = firebase.storage().ref(fileRef)
        var task = storageRef.put(file)
        task.on('state_changed',
            function progress(snapshot) {
               document.getElementById('submittedInprogress').style.display = "none"
            },
            function error(err) {
            	alert("file upload interupted abruptly...plase try again");
            },
            complete = () =>{
	       		storageRef.getDownloadURL().then((url) =>{
	       		fileLink= url;
	       		uploaded = true;
        		document.getElementById('submittedInprogress').style.display = "none"
			    document.getElementById('attachedDocument').src = AttachedFile


			    setTimeout(() =>{
		        if (document.getElementById("submittedSuccess") != null) {
		            document.getElementById("submittedSuccess").style.display = "none"
		            
		            }
		            this.setState({
						fileRef:fileRef,
						fileUrl:fileLink,
						fileName:file.name,
						fileType:FileType,
						UploadMessageFile:true

					})
		        }, 1000)
		        document.getElementById('uploadLoader').style.display = "none"

		        
	        }).catch((error) => {

	         console.log(error)
	        });
            })

    }
	render() {
		return (
			<div>
				<div id = "uploadLoader">
					<div  className = "loader">
	                    <div className="loader_main_content">
	                        <img  src={loader} alt="gradsuccess" />
	                        <h1>Just a moment..</h1>
	                    </div>
	                </div>
                </div>
				<p className = "chat_header">Gradsuccess Chat Bot</p>
				{this.state.expertInChargeID === "empty"?
				<div className = "chat_component">
					<p className = "messagingNotAvailable">Messaging is not available at the moment, Your Application has not been assigned to an expert yet</p>
				</div>:
				<div className = "chat_component">
				<Query 
		        query={FETCH_CLIENT_MESSAGES}
		        variables={{ client_id:this.props.logged_in_user_id }}
		        >
		            {({ loading, error, data }) => {
		             if (loading) return (
		                <div className = "loader">
		                    <div className="loader_main_content">
		                        <img  src={loader} alt="gradsuccess" />
		                        <h1>loading previous messages...</h1>
		                    </div>
		                </div>
		                )
		              if (error) return <div>failed to load data</div>
		              return (
		                	<div>
		                	{data.getClientMessages.length === 0?
	                		 	<div>
								  	<p>No Conversation!.</p>
								</div>:
			                	<div>
									{data.getClientMessages.map((messageInstance,index) =>
										<div>
			                           {messageInstance.message_type === "image" || messageInstance.message_type === "file"? 
			                           	<div className="container lighter" id = {messageInstance.client_name === this.props.sender?"coloured":"uncoloured"} key  = {index}>
										  	{messageInstance.message_type === "image"?
										  	<div className = "display_message_upload_exist">
											  	<img className = "up_exist" src = {messageInstance.attachment_ref}/>
											  	<div>
											  		<a target = "_blank" href = {messageInstance.attachment_ref}>{messageInstance.attachment_name}</a>
											  	</div>
										  	</div>:
										  	<div className = "display_message_upload_icon">
											  	<img className = "dl_icon" src = {downloadedAttach}/>
											  	<div>
											  		<a target = "_blank" href = {messageInstance.attachment_ref}>{messageInstance.attachment_name}</a>
											  	</div>
										  	</div>
										  	}

										  	<p>{messageInstance.message_body}</p>
										  	<span className="time-right">{messageInstance.client_name}</span>
										  	<span className="time-right">{messageInstance.created_at}</span>
										</div>:
										<div className="container lighter" id = {messageInstance.client_name === this.props.sender?"coloured":"uncoloured"} key  = {index}>
										  	<p>{messageInstance.message_body}</p>
										  	<span className="time-right">{messageInstance.client_name}</span>
										  	<span className="time-right">{messageInstance.created_at}</span>
										</div>
										}
									</div>

			                        )}
								</div>
							}
							</div>
		              );
		            }}
		        </Query>
		        </div>}
				{this.state.expertInChargeID === "empty" ? "" :<Mutation
                mutation={CREATE_MESSAGE}
                onError={this.error}
                onCompleted={data=>{
                this.formSubmitted(data)
                }}
                >
                {(sendMessage, { data,loading, error}) => (
                <div className = "loader-wrapper">
                  <div id="submittedSuccess" className = "message_sent_notification">Message sent!</div>
                  <div id="submittedInprogress" className = "sending_message_notification2">Uploading...</div>
                  <form
                    onSubmit={e => {
                    e.preventDefault();
                    sendMessage({
                    variables: {
                    	client_id:this.props.logged_in_user_id,
						client_name:this.props.sender,
						expert_id:this.state.expertInChargeID,
						expert_name:"Expert",
						message_body:this.state.typedText,
						attachment_ref:null,
						attachment_name:null,
						message_type:null
                    },
                    refetchQueries:[
                    {
                    	query:FETCH_CLIENT_MESSAGES,
                    	variables: {
	                    	client_id:this.props.logged_in_user_id,
							client_name:this.props.sender,
							expert_id:this.state.expertInChargeID,
							expert_name:"Expert",
							message_body:this.state.typedText,
                    	}
                    }]
                    });
                    }}
                    encType="multipart/form-data"
                    className = "chat_form">
                    
                    <input name = "chat_message" id = "chat_message" placeholder = "Type a message" onChange = {this.handleSendMessage}></input>
                    	<input
	                      type="file"
	                      name="file"
	                      id="file"
	                      className = "file_upload"
	                      onChange={this.onChange}/>
						<label htmlFor="file" id = "attLabel" >
							<img  htmlFor = "attachedDocument" id = "attachedDocument" src={AttachedFile} alt="Logo" />
						</label>

						<button type = "submit" disabled = {this.state.typedText===""?true:false}>
							<img  src={sendIcon} alt="Logo" /> 
							<span className = "sendMessage">Send Message</span>
						</button>
                    
                  </form>
                  {loading && <div className = "sending_message_notification">Sending...</div>}
                  {error && <div className="FailedTagForm"> Failed! Something is not right...</div>}
                </div>
                )}
                </Mutation>}


	        <Modal 
	           isOpen={this.state.UploadMessageFile}
	           contentLabel="Minimal Modal Example"
	           style={defaultStyles}
	           ariaHideApp={false}
	        >
	            <div className = "detail_preview_modal_container">
	                <div className = "detail_preview_modal_container_inner">
	                      <UploadMessageFile  
		                    fileRef = {this.state.fileRef}
							fileUrl = {this.state.fileUrl}
							fileName = {this.state.fileName}
							fileType = {this.state.fileType}
							logged_in_user_id = {this.props.logged_in_user_id}
							client_name = {this.props.sender}
							expert_id = {this.state.expertInChargeID}
							callback = {this.handleCloseModal}
							/>
	                </div>
	            </div>
	            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>



			</div>
		);
	}
}
