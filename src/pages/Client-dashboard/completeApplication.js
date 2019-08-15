import React, { Component } from 'react';
import Modal from "react-modal"
import confirm from "../../images/email.png"
import { Mutation } from 'react-apollo';
import loader from "../../images/loader.gif"
import StarRatingComponent from 'react-star-rating-component';

import {UPDATE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM} from '../graphql/mutations';

const defaultStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(17, 153, 146, 0.3)'
  }
};

class CompleteApplication extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	openModal:false,
        	rating:1
        }
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.onStarClick = this.onStarClick.bind(this)
        this.handleFormInput = this.handleFormInput.bind(this)
    }
    handleOpenModal(){
    	this.setState({
    		openModal:true
    	})
    }
    handleCloseModal(){
    	this.setState({
    		openModal:false
    	})
    }

     onStarClick(nextValue, prevValue, name) {
    	this.setState({
    		rating:nextValue
    	})
	  }
	  handleFormInput(){
	  	console.log('comment')
	  }


    render() {
        return (
        	<div className = "loader-wrapper">
            <button type = "button"   className = "completeBtn" onClick = {()=>this.handleOpenModal()}> Mark as complete </button>

                <Modal 
		           isOpen={this.state.openModal}
		           contentLabel="Minimal Modal Example"
		           style={defaultStyles}
		           ariaHideApp={false}
		        >
		            <div className = "detail_preview_modal_container">
		                <div className = "detail_preview_modal_container_inner">
		                      <Mutation 
		                            mutation={UPDATE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM}
		                            onError={this.error} 
		                            onCompleted={data=>{
		                                   this.handleCloseModal();
		                                   window.location.reload()
		                            }}
		                            >        
		                        {(asignSelfRequest, { data,loading, error}) => (        
		                            <div className = "loader-wrapper">
		                                <div id="submittedSucces" className="SuccessTagForm-d">
		                                    Success! Redirecting...
		                                </div>
		                                <form 
		                                onSubmit={e => {
		                                    e.preventDefault();
		                                    asignSelfRequest({ 
		                                      variables: {
		                                        id: this.state.applicationID,
		                                        has_expert:"0",
		                                        status:"Pending Approval"

		                                      }
		                                 })}}
		                                 className = "confirm_form">
		                                 <h4 className = "completeAppMTitle">Mark application as Completed</h4>
		                                 <br />
		                                 <div className = "client_rate">
									        <p>Rate Expert:</p>
									        <StarRatingComponent 
									          name="rate1" 
									          starCount={5}
									          value={this.state.rating}
									          onStarClick={this.onStarClick.bind(this)}
									        />
									      </div>
				                            <div className="row-full comment_input">
				                              <textarea type="text"  
				                              placeholder="Leave a comment"   
				                              id = "leave_a_comment" 
				                              name = "leave_a_comment"  
				                              onChange = {this.handleFormInput}
				                              rows = '4'>
				                              </textarea>
				                            </div>

		                                <button  type = "submit" >Save</button> 
		                                             
		                                </form>
		                                {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
		                                 {error && <div className="FailedTagForm-d"> Something went wrong, pease try again.</div>}
		                        </div>
		                         )}

		                        </Mutation>  
		                </div>
		            </div>
		            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
		        </Modal>
            </div>

        );
    }
}

export default CompleteApplication;
