import React from 'react';
import sendIcon from "../../../images/send_icon.svg"
import AttachedFile from "../../../images/attach.png"
import { Mutation } from 'react-apollo';
import loader from "../../../images/loader.gif"
import uploaded from "../../../images/uploaded.png"
import { CREATE_MESSAGE } from '../../graphql/mutations';
import { FETCH_CLIENT_MESSAGES } from '../../graphql/queries';

export default class uploadMessageFile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			upload_files:"",
			typedText:""
		}

		this.handleSendMessage = this.handleSendMessage.bind(this)
	}

	handleSendMessage(e){
		const typedText = e.target.value;
		this.setState({
			typedText:typedText
		})
		}

	render() {
		return (
			<div>
			<div>
			{this.props.fileType === "image"?<div className = "uploadedImage"> <img src = {this.props.fileUrl}/> </div>:
				<div className = "uploadedfile">
					<img src = {uploaded}/>
					<p>{this.props.fileName}</p>
				</div>
			}
		
			</div>

            <Mutation
	        mutation={CREATE_MESSAGE}
	        onError={this.error}
	        onCompleted={data=>{
	        	this.props.callback()
	        }}
	        >
	        {(sendMessage, { data,loading, error}) => (
	        <div className = "loader-wrapper">
	          
	          
	          <form
	          	style = {{
	          		marginTop:'0px',
	          		position: 'absolute',
				    width: '60%',
				    left:' 20%'
	          	}}
	            onSubmit={e => {
	            e.preventDefault();
	            sendMessage({
	            variables: {
	            	client_id:this.props.logged_in_user_id,
					client_name:this.props.client_name,
					expert_id:this.props.expert_id,
					expert_name:"Expert",
					message_body:this.state.typedText,
					attachment_ref:this.props.fileUrl,
					attachment_name:this.props.fileName,
					message_type:this.props.fileType || "file"
	            },
	            refetchQueries:[
                    {
                	query:FETCH_CLIENT_MESSAGES,
                	variables: {
                    	client_id:this.props.logged_in_user_id,
						client_name:this.props.client_name,
						expert_id:this.props.expert_id,
						expert_name:"Expert",
						message_body:this.state.typedText,
                	}			
                    }]
	            });
	            }}
	            encType="multipart/form-data"
	            className = "chat_form">
	            
	            <input  style = {{width: "100%",backgroundColor:"white"}} name = "chat_message" id = "chat_message" placeholder = "Add a caption" onChange = {this.handleSendMessage}></input>
				<button type = "submit" disabled = {this.state.typedText===""?true:false}>
					<img  src={sendIcon} alt="Logo" /> 
				</button>
	            
	          </form>
	          {loading && <div></div>}
	          {error && <div style = {{top: '0px',left: '40%'}}className="FailedTagForm"> Failed! Something is not right...</div>}
	          
	        </div>
	        )}
        </Mutation>
		</div>	
		);
	}
}
