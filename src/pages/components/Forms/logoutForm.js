import React from 'react';
import { graphql } from 'gatsby';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {LOGOUT} from '../../graphql/mutations';
import {AUTH_TOKEN} from '../../../apollo/constants'

export default class logout extends React.Component {


constructor(props) {
	super(props);
	this.state = {
	}
	this.logoutCompleted = this.logoutCompleted.bind(this);

}


    logoutCompleted(data){
    	localStorage.removeItem(AUTH_TOKEN)
    	localStorage.removeItem('clientI')
    	localStorage.removeItem('clientN')
    	localStorage.removeItem('currentC')
    	localStorage.removeItem('chat_state')
	    window.location = '/'
	}
	render() {
		return (
			<div>
			
				<Mutation 
				    mutation={LOGOUT}
				    onError={this.error} 
				    onCompleted={data=>{
				       	this.logoutCompleted(data)
				    }}>		
				{(logoutForm, { data}) => (		
			            <form 
				            onSubmit={e => {
			                    e.preventDefault();
			                    logoutForm({ 
			                      variables: this.state.data
			                     });
			                 }}
				            >
	                   		
			                <input type = "submit" value = "Logout" className = "logoutBtn"/>         
			            </form>
		         )}
            	</Mutation>
        </div>
		);
	}
}
