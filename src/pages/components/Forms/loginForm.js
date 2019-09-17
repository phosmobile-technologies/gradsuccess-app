import React from 'react';
import { graphql } from 'gatsby';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {LOGIN} from '../../graphql/mutations';
import {FORGOT_PASSWORD} from '../../graphql/mutations';
import loader from "../../../images/loader.gif"
import {AUTH_TOKEN} from '../../../apollo/constants'
import { PASSWORD_RESET } from "../../../api/sendMailEndpoint"

export default class resumeReviewForm extends React.Component {


constructor(props) {
		super(props);
		this.state = {
	      data:{
	        email:null,
	        password:null,
	      },
	      forgotPassword:false,
	      message:"",
	      password_reset_success:false
	}
	this.handleFormInput = this.handleFormInput.bind(this);
	this.handleForgotPassword = this.handleForgotPassword.bind(this);
	this.formSubmitted = this.formSubmitted.bind(this);
	this.forgotSubmitted = this.forgotSubmitted.bind(this);
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

    forgotSubmitted(data){
	    document.getElementById("loaderImage").style.display = "block"
	     var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxtz_!@#$%^&*()_+=-<>?/\|''";

        var string_length = 64;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }

	    let url = PASSWORD_RESET
	    let emailAddress = {
	        email: this.state.data.email,
	        token:randomstring
	    }
	      fetch(url, {
	      headers: {
	        "Content-Type": "application/json",
	        "Accept": "application/json"
	      },
	      method: "post",
	      body: JSON.stringify(emailAddress)
	    }).then(function(response){
	        return response.text()
	    }).then((text)=>{
	    	this.setState({
	    		message:text,
	    		password_reset_success:true
	    	})
	    	document.getElementById("loaderImage").style.display = "none"
	    	document.getElementById("submittedSucces").style.display = "flex"	   
	    }).catch(function(error){
	        alert("password reset failed")
	    })    }

    formSubmitted(data){
	    document.getElementById("submittedSucces").style.display = "block"
	        setTimeout(function() {
	          if (document.getElementById("submittedSucces") != null) {
	            document.getElementById("submittedSucces").style.display = "none"
	          }
	    }, 2000)
	    localStorage.setItem(AUTH_TOKEN, data.login.access_token)

	    if(data.login.user.account_type === "Client"){
	    	window.location = '/Client-dashboard'
	    }else if(data.login.user.account_type === "Expert"){
	    	window.location = '/Expert-dashboard'
	    }else{
	       	window.location = '/Gradsuccess-admin'
    }
    }

  	handleForgotPassword(){
	  	this.setState({
	  		forgotPassword:!this.state.forgotPassword
	  	})
	}


	render() {
		return (
			<div>
			<div className = "detail-form loginModal loader-wrapper">
			
			<div className = "loader" id = "loaderImage"><img className="loader-img" src={loader} alt="gradsuccess" /></div>
		    	

            	{this.state.forgotPassword ?
            			<div>
				            {!this.state.password_reset_success ?<form className = "checkout-form-container">
					            
								<h3 className = "form-header" >Forgot Password</h3>
				                <div className="row-full">

				                    <input type="text"  
				                    placeholder="Email"   
				                    id = "email"
				                    name = "email" 
				                    onChange = {this.handleFormInput}/>
				                    <br />
				                    
		                   		 </div>
		                   		 
				                <br />
				                <input type = "button" className = "submit-details" value = "Submit" onClick = {this.forgotSubmitted}/>         
				            </form>:
				            <div id="submittedSucces" className="passwordSent">
	                			{this.state.message}
				            </div>
				            }
			            </div>
			            :<Mutation 
				    mutation={LOGIN}
				    onError={this.error} 
				    onCompleted={data=>{
				       	this.formSubmitted(data)
				    }}>		
				{(createResumeReviewData, { data,loading, error}) => (		
			        <div className = "loader-wrapper">
			        	<div id="submittedSucces" className="SuccessTagForm">
			                Success! Redirecting...
			            </div>
			            <form 
			            onSubmit={e => {
		                    e.preventDefault();
		                    createResumeReviewData({ 
		                      variables: this.state.data
		                     });
		                 }}
			            className = "checkout-form-container">
							<h3 className = "form-header" >Login </h3>
			                <div className="row-full">

			                    <input type="text"  
			                    placeholder="Email"   
			                    id = "email"
			                    name = "email" 
			                    onChange = {this.handleFormInput}/>
			                    <br />

			                    {this.state.forgotPassword ? " ":<input type="password"  
			                    placeholder="Password"  
			                    id = "password"
			                   	name = "password" onChange = {this.handleFormInput} />}
			                    
	                   		 </div>
	                   		 
			                <br />
			                <input type = "submit" className = "submit-details" value = "Login" />         
			            </form>
			            {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                 		{error && <div className="FailedTagForm"> Please provide valid Credentials</div>}
		        </div>
		         )}

            	</Mutation>
            }

	        <div className = "explainInput">
	            <h3>Note</h3>
	            
	              <p>
	                 Please login with your checkout email address and the password sent to the email address
	               </p>
	               <p>Note: Ensure to change the password from your dashboard for security purposes.</p>

	               <br />
	               {this.state.forgotPassword ?<button className = "forgot_password" onClick = {this.handleForgotPassword}>Login</button>:

	               <button className = "forgot_password" onClick = {this.handleForgotPassword}>Forgot password</button>}
	               
	        </div>   
        </div>
			
			</div>
		);
	}
}
