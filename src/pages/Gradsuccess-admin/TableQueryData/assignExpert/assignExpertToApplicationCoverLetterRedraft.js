import React from 'react';
import { Query } from "react-apollo";
import loader from "../../../../images/loader.gif"
import { Mutation } from 'react-apollo';
import {UPDATE_COVER_LETTER_REDRAFT} from '../../../graphql/mutations';

import {GET_ALL_EXPERTS} from "../../../graphql/queries"

export default class assignExpertToApplication extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name:"",
			phone:"",
			email:"",
			id:"",
			assignedSucess:false
		}
		this.setExpertInfo = this.setExpertInfo.bind(this)
	}

	setExpertInfo(firstName, lastName, phone, email,id){
		const Name = firstName + " " + lastName;
		this.setState({
			name:Name,
			phone:phone,
			email:email,
			id:id
		})
	}
	formSubmitted(data,id){
		this.setState({
			assignedSucess:true
		})
		setTimeout(function(){
			let url = "https://infinite-cove-53014.herokuapp.com/api/applicationAssigned"
		    let data = {
		        expert_id: id
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
		      window.location.reload();
		    }).catch(function(error){
		       alert("Networks Error please try again, Later!");
		    })
			window.location.reload();
		},1000)
	}


render() {
	 if(this.state.assignedSucess) {
	 		return (
 			<div className = "assign_expert_container">
		    	<div className = "assign_success_board">
					<h1>Success<i>!</i></h1>
		           	<div>
		            	<p>Application was successfully Assign to {this.state.name}</p>
					</div>
	            </div>
            </div>

            );
	 }else{
    return(
    	<div className = "assign_expert_container">
    	<h3 className = "form-header" >Assign Application to an Expert</h3>
    	<div className = "assign_expert_container_inner">
        <div>
        <h5>All Available Experts</h5>
	        <Query 
	        query={GET_ALL_EXPERTS}
	        variables={{ account_type:"Expert" }}
	        >
	            {({ loading, error, data }) => {
	             if (loading) return (
	                <div className = "loader">
	                    <div className="loader_main_content">
	                        <img  src={loader} alt="gradsuccess" />
	                        <h1>Loading...</h1>
	                    </div>
	                </div>
	                )
	              if (error) return <div>failed to load data</div>
	              return (
	                <div className="form_preview">
	                    <div className="form_preview_inner">
	                        
	                        <div className="form_preview_col_1">

	                            {data.getExperts === null ?
	                                    <div className = "client_expert_listing_main">
	                                        <h4>No Item Available</h4>
	                                    </div>:
	                                    data.getExperts.map((Expert,index) =>
					                        <div className="expert_list" 
					                        key = {index}
					                        onClick = {() => this.setExpertInfo(Expert.first_name, Expert.last_name, Expert.phone, Expert.email, Expert.id)}>
										      	<div className="select_indicator">i</div>
										      	<div className="name_key">{Expert.first_name + " " + Expert.last_name}</div>
									    	</div>
	                                    )}
	                            
	                        </div>
	                    </div>
	                </div>
	              );
	            }}
        	</Query>
      		</div>
      		<div>
      			<Mutation 
				    mutation={UPDATE_COVER_LETTER_REDRAFT}
				    onError={this.error} 
				    onCompleted={data=>{
				       	this.formSubmitted(data, this.state.id)
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
				                     	variables: {
				                     		id:this.props.userID,
				                     		has_expert:this.state.id,
				                     		status:"Assigned"
				                     	}
                    					});
				                 }}
					            className = "assign_form">
					                <div className="row-full">

					                    <input type="text"    
					                    id = "name"
					                    name = "name"
					                    value = {this.state.name} 
					                    readOnly
					                   />
					                   <input type="text" 
					                    id = "phone"
					                    name = "phone"
					                    value = {this.state.phone} 
					                    readOnly
					                   />
					                   <input type="text"   
					                    id = "email"
					                    name = "email" 
					                    value = {this.state.email} 
					                    readOnly
					                   />

			                   		 </div>
			                   		 
					                <br />
					                <input type = "submit" className = "submit-details" value = "Assign" />         
					            </form>
					            {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
		                 		{error && <div className="FailedTagForm"> Please provide valid Credentials</div>}
				        </div>
				         )}

            	</Mutation>
      		</div>
      		</div>
      </div>
    )
}

}
}