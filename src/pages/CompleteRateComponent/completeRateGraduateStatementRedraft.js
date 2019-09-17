import React, { Component } from 'react';
import Modal from "react-modal"
import confirm from "../../images/email.png"
import { Mutation } from 'react-apollo';
import loader from "../../images/loader.gif"
import StarRatingComponent from 'react-star-rating-component';
import { APPLICATION_REVIEW } from "../../api/sendMailEndpoint"

import {MARK_COMPLETE_GRADUATE_SCHOOL_ESSAY_REDRAFT} from '../graphql/mutations';

const defaultStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(17, 153, 146, 0.3)'
  }
};

class CompleteRateGraduateReview extends Component {

     constructor(props) {
        super(props);
        this.state = {
        	openModal:false,
        	rating:1,
        	app_comment:""
        }
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.onStarClick = this.onStarClick.bind(this)
        this.handleFormInput = this.handleFormInput.bind(this)
        this.completedRatingProcess = this.completedRatingProcess.bind(this)
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

    completedRatingProcess(){
    	let url = APPLICATION_REVIEW
	    let data = {
	        expert_id: this.props.expert_id,
	        form_id:this.props.form_id,
	        rating: this.state.rating,
	        comment:this.state.app_comment
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
		            this.handleCloseModal();
		            window.location.reload();
		          }
		    }, 2000)

	    }).catch(function(error){
			alert("failed to complete rating.... please again")
	    })

	    
    }

     onStarClick(nextValue, prevValue, name) {
    	this.setState({
    		rating:nextValue
    	})
	  }
	  handleFormInput(event){
	  	const { name, value } = event.target;
        this.setState({
            [name]: value
        })
	  }


    render() {
        return (
        	<div className = "loader-wrapper">
        	<div id="submittedSucces" className="SuccessTagForm-d">
                Thank you for your review...
            </div>
            {!this.props.appStatus?
            <button 
            type = "button"   
            className = "completeBtn"
            onClick = {()=>this.handleOpenModal()}>Mark as Complete
            </button>:
            <button 
            type = "button"   
            className = "applicationCompletedBtn" 
            >Application has been completed
            </button>
        	}

                <Modal 
		           isOpen={this.state.openModal}
		           contentLabel="Minimal Modal Example"
		           style={defaultStyles}
		           ariaHideApp={false}
		        >
		            <div className = "detail_preview_modal_container">
		                <div className = "detail_preview_modal_container_inner">
		                      <Mutation 
		                            mutation={MARK_COMPLETE_GRADUATE_SCHOOL_ESSAY_REDRAFT}
		                            onError={this.error} 
		                            onCompleted={data=>{
		                                   this.completedRatingProcess();
		                                  
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
		                                        id: this.props.applicationID,
		                                        completed:true
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
				                              id = "app_comment" 
				                              name = "app_comment"  
				                              onChange = {this.handleFormInput}
				                              rows = '4'>
				                              </textarea>
				                            </div>

		                                <button  type = "submit" >Save</button> 
		                                             
		                                </form>
		                                {loading && <img className="loader-img" src={loader} alt="gradsuccess" />}
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

export default CompleteRateGraduateReview;
