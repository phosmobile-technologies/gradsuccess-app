import React from 'react';
import { graphql } from 'gatsby';
import { Mutation } from 'react-apollo';
import { UPDATE_PASSWORD } from "../../graphql/mutations"
import { PASSWORD_CHANGE } from "../../../api/sendMailEndpoint"
import loader from "../../../images/loader.gif"

export default class resumeReviewForm extends React.Component {
constructor(props) {
	super(props);
	this.state = {
      	data:{
            new_password:""
        },
        password_verified:true,
	    account_created:false
	}
	this.verifyPassword = this.verifyPassword.bind(this);
	this.storePassword = this.storePassword.bind(this);
	this.verifyConfirmPassword = this.verifyConfirmPassword.bind(this);
	this.handleFormInput = this.handleFormInput.bind(this);
}
verifyPassword(event){
	const {name,value} = event.target;
	const password_info = document.getElementById('password_info');
	// When the user starts to type something inside the password field
	  // Validate length
	if(value.length >= 8) {
	    password_info.style.display = "none"
	} else {
	    password_info.style.display = "block"
	    this.setState({
	    	password_verified:true
	    })
	}
}
storePassword(event){
	const {name,value} = event.target;
	this.setState(prevState =>({
      data:{
        ...prevState.data,
        [name]:value
      }
    }))
}
verifyConfirmPassword(event){
	const {value} = event.target;
	const password_info_c = document.getElementById('password_info_c');
	// When the user starts to type something inside the password field
	  // Validate length
	if(value != this.state.data.new_password) {
		this.setState({
	    	password_verified:true
	    })
	    password_info_c.style.display = "block"
	}else{
	    password_info_c.style.display = "none"
	    this.setState({
	    	password_verified:false
	    })
	}
}
handleFormInput(event){
	const {name,value} = event.target;
	this.setState(prevState =>({
		data:{
		...prevState.data,
		[name]:value
		}
	}))
}

passwordChanged(){
    let url = PASSWORD_CHANGE
	    let data = {
	        email: this.props.email,
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
	    	document.getElementById("submittedSucces").style.display = "block"
	    	setTimeout(()=>{
		          if (document.getElementById("submittedSucces") != null) {
		            document.getElementById("submittedSucces").style.display = "none"
		            this.props.closeModal();
		          }
		    }, 2000)

	    }).catch(function(error){
	    })


}
render() {
	return (
		<div className = "confirm_password">
	        <div className = "confirm_password_inner">
	              <Mutation 
	                    mutation={UPDATE_PASSWORD}
	                    onError={this.error}
	                    onCompleted={data=>{
                               this.passwordChanged();
                              
                        }}
	                    >        
	                {(asignSelfRequest, { data,loading, error}) => (        
	                    <div className = "loader-wrapper">
	                        <div id="submittedSucces" className="SuccessTagForm-d">
	                           	Password was successfully updated
	                        </div>
	                        <form 
	                        onSubmit={e => {
	                            e.preventDefault();
	                            asignSelfRequest({ 
	                              variables: {
	                                id: this.props.id,
	                                password:this.state.data.new_password
	                              }
	                         })}}
	                         className = "confirm_form change_password_form">
	                         <h4 className = "completeAppMTitle">Change Password</h4>
	                         <br />
	                            <div className="row-full comment_input">
	                              <input type="password"  
			                    placeholder="Password"   
			                    id = "new_password"
			                    name = "new_password"
			                    autoComplete = "false"
			                    onChange = {this.verifyPassword}
			                    required
			                    onBlur = {this.storePassword}/>
			                    <span id = "password_info" className = "password_info">provide atleast 8 character password e.g ERe203_sj</span>

			                    <input type="password"  
			                    placeholder="Comfirm Password"   
			                    id = "confirm_password"
			                    autoComplete = "false"
			                    name = "confirm_password" 
			                    required
			                    onChange = {this.verifyConfirmPassword}/>
			                    <span id = "password_info_c" className = "password_info">password mismatch!</span>
	                            </div>
	                            <br />
								<input
			                      type="submit"
			                      className="submit-details"
			                      value="Change"
			                      css={{
			                        opacity: this.state.password_verified ? "0.3" : "1",
			                      }}
			                      disabled={this.state.password_verified}	
			                    /> 
	                                     
	                        </form>
	                        {loading && <img className="loader-img" src={loader} alt="gradsuccess" />}
	                         {error && <div className="FailedTagForm-d"> Something went wrong, pease try again.</div>}
	                </div>
	                 )}

	                </Mutation>  
	        </div>
	    </div>
	);
	}
	}
