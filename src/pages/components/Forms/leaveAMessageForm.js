import React from 'react';
import sendIcon from "../../../images/send_icon.svg"
import { CREATE_MESSAGE } from '../../graphql/mutations';
import { FETCH_CLIENT_MESSAGES } from '../../graphql/queries';
import { Mutation } from 'react-apollo';
import { Query } from 'react-apollo';
import loader from "../../../images/loader.gif"


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
			expertInChargeID:""

			}
			this.handleSendMessage = this.handleSendMessage.bind(this)
			this.submitMessage = this.submitMessage.bind(this)
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

		handleSendMessage(e){
			const typedText = e.target.value;
			this.setState({
				typedText:typedText
			})
			console.log(this.state.typedText)
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
        document.getElementById("submittedSucces").style.display = "block"

	        setTimeout(function() {
	            if (document.getElementById("submittedSucces") != null) {
	                document.getElementById("submittedSucces").style.display = "none"
	            }
	        }, 5000)
	        this.setState({
	          form_submit_success:true
	        })
	        this.submitMessage(data)

	        document.getElementById('chat_message').value = ""

	    }

	render() {
		return (
			<div>
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
		                            <div className="container lighter" id = {messageInstance.client_name === this.props.sender?"coloured":"uncoloured"} key  = {index}>
									  	<p>{messageInstance.message_body}</p>
									  	<span className="time-right">{messageInstance.client_name}</span>
									  	<span className="time-right">{messageInstance.created_at}</span>
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
                  <div id="submittedSucces" className = "message_sent_notification">Message sent!</div>
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

						<button type = "submit" disabled = {this.state.typedText===""?true:false}>
							<img  src={sendIcon} alt="Logo" /> 
							<span>Send Message</span>
						</button>
                    
                  </form>
                  {loading && <div className = "sending_message_notification">Sending...</div>}
                  {error && <div className="FailedTagForm"> Failed! Something is not right...</div>}
                </div>
                )}
                </Mutation>}
			</div>
		);
	}
}
