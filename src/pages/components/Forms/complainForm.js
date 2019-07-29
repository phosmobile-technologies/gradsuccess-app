import React from 'react';

export default class complainForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
	            <form className = "checkout-form-container">
			        
			        <h3 className = "form-header" >Do you have a Complain or Suggestions.?<br />
			        	<small>
			        		<i>Feel free to suggest to Gradsuccess any possible way we can serve you better.</i>
			        	</small> 
			       	</h3>

			        <div className="row-full">
			          <input type="text"
			          placeholder=" Subject"
			          id = "name"
			          name = "name" onChange = {this.handleFormInput} required/>
			          <br />
			          <input type="text" className=""
			          placeholder="Reference"
			          id = "industry_applied_for"
			          name = "industry_applied_for" onChange = {this.handleFormInput} required />
			          <br />
			          
			          <textarea 
			          type="text"
			          placeholder="Message"
			          id = "summary_of_interest"
			          name = "summary_of_interest"
			          rows = '4' onChange = {this.handleFormInput} required>
			          </textarea>
			        </div>
			        <br />
			        <input type = "submit" className = "submit-details" value = "Submit" id = "submitBtn"/>
			      </form>
			</div>
		);
	}
}
