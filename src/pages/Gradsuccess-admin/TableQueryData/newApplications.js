import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../../images/loader.gif"
import confirm from "../../../images/email.png"
import {GET_ALL_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORMS} from "../../graphql/queries"
import {GET_ALL_COVER_LETTER_REDRAFT_FORMS} from "../../graphql/queries"
import {GET_ALL_COVER_LETTER_REVIEW_FORMS} from "../../graphql/queries"
import { GET_ALL_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORMS } from "../../graphql/queries"
import {GET_ALL_RESUMME_REVIEW_FORMS} from "../../graphql/queries"
import Modal from "react-modal"
import { Mutation } from 'react-apollo';
import { SEND_MAIL } from "../../../api/sendMailEndpoint"


import CoverLetterRedraft from "../../FormDetailsPreview/coverLetterRedraft"
import CoverLetterReviewForm from "../../FormDetailsPreview/coverLetterReviewForm"
import GraduateSchoolEssayRedraftForm from "../../FormDetailsPreview/graduateSchoolEssayRedraftForm"
import GraduateSchoolStatementReviewForm from "../../FormDetailsPreview/graduateSchoolStatementReviewForm"
import ResumeReviewForm from "../../FormDetailsPreview/resumeReviewForm"

import AssignExpertToApplicationResumeReview from "./assignExpert/assignExpertToApplicationResumeReview"
import AssignExpertToApplicationCoverLetterReview from "./assignExpert/assignExpertToApplicationCoverLetterReview"
import AssignExpertToApplicationCoverLetterRedraft from "./assignExpert/assignExpertToApplicationCoverLetterRedraft"
import AssignExpertToApplicationGraduateEssayRedraft from "./assignExpert/assignExpertToApplicationGraduateEssayRedraft"
import AssignExpertToApplicationGraduateStatementReview from "./assignExpert/assignExpertToApplicationGraduateStatementReview"



import {UPDATE_RESUME_REVIEW_FORM} from '../../graphql/mutations';
import {UPDATE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM} from '../../graphql/mutations';
import {UPDATE_GRADUATE_SCHOOL_ESSAY_REDRAFT} from '../../graphql/mutations';
import {UPDATE_COVER_LETTER_REVIEW_FORM} from '../../graphql/mutations';
import {UPDATE_COVER_LETTER_REDRAFT} from '../../graphql/mutations';
import {ASSIGN_SELF_REQUEST} from '../../graphql/mutations';




const defaultStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(17, 153, 146, 0.3)'
  }
};

class AllApplications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            coverLetterRedraftForm:false,
            coverLetterReviewForm:false,
            graduateSchoolEssayRedraftForm:false,
            resumeReviewForm:false,
            graduateSchoolStatementReviewForm:false,
            formID:"",
            showAssignExpertModal:false,
            assignExpertToApplicationResumeReview: false,
            assignExpertToApplicationCoverLetterReview:false,
            assignExpertToApplicationCoverLetterRedraft:false,
            assignExpertToApplicationGraduateEssayRedraft:false,
            assignExpertToApplicationGraduateStatementReview:false,
            id:"",
            itemCount:0,
            applicationID:"",
            CoverLetterReviewFormAR:false,
            ResumeReviewFormAR:false,
            GraduateSchoolStatementReviewFormAR:false,
            CoverLetterRedraftAR:false,
            GraduateSchoolEssayRedraftFormAR:false

        }
        this.OpenApplicationDetails = this.OpenApplicationDetails.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.OpenAssignExpertModal = this.OpenAssignExpertModal.bind(this)
        this.upadateItemCount = this.upadateItemCount.bind(this)
        this.assignSelf = this.assignSelf.bind(this)
}

OpenApplicationDetails(formType,formID){

    this.setState({
        formID:formID,
        [formType]:true

    })
}

handleCloseModal(){
    this.setState({
        coverLetterRedraftForm:false,
        coverLetterReviewForm:false,
        graduateSchoolEssayRedraftForm:false,
        resumeReviewForm:false,
        graduateSchoolStatementReviewForm:false,
        showAssignExpertModal:false,
        assignExpertToApplicationResumeReview: false,
        assignExpertToApplicationCoverLetterReview:false,
        assignExpertToApplicationCoverLetterRedraft:false,
        assignExpertToApplicationGraduateEssayRedraft:false,
        assignExpertToApplicationGraduateStatementReview:false,
        CoverLetterReviewFormAR:false,
        ResumeReviewFormAR:false,
        GraduateSchoolStatementReviewFormAR:false,
        CoverLetterRedraftAR:false,
        GraduateSchoolEssayRedraftFormAR:false

    })   
}

OpenAssignExpertModal(formType, name, id){
    if(formType === "resumeReviewForm"){
        this.setState({
            id:id,
            assignExpertToApplicationResumeReview: true,
        })
    }else if(formType === "coverLetterReviewForm"){
        this.setState({
            id:id,
            assignExpertToApplicationCoverLetterReview:true,
        })
    }else if(formType === "graduateSchoolEssayRedraftForm"){
        this.setState({
            id:id,
            assignExpertToApplicationGraduateEssayRedraft:true,
        })
    }else if(formType === "coverLetterRedraftForm"){
        this.setState({
            id:id,
            assignExpertToApplicationCoverLetterRedraft:true,
        })
    }else{
        this.setState({
            id:id,
            assignExpertToApplicationGraduateStatementReview:true,
        })
    }
    


}
upadateItemCount(plus){
    this.setState({
        itemCount:this.state.itemCount+plus
    })
}

assignSelf(form_id,application,id){
    let url = SEND_MAIL
    let data = {
        expert_id: this.props.expert_id,
        form_id:form_id,
        formType: application
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

        if(application === "coverLetterReviewForm"){
            this.setState({
                CoverLetterReviewFormAR:true,
                applicationID:id,
            })
        }else if(application === "resumeReviewForm"){
             this.setState({
                ResumeReviewFormAR:true,
                applicationID:id,
            })
        }else if(application === "graduateSchoolStatementReviewForm"){
             this.setState({
                GraduateSchoolStatementReviewFormAR:true,
                applicationID:id,
            })
        }else if(application === "coverLetterRedraft") {
                 this.setState({
                CoverLetterRedraftAR:true,
                applicationID:id,
            })
        }else{
             this.setState({
                GraduateSchoolEssayRedraftFormAR:true,
                applicationID:id,
            })
        }

    }).catch(function(error){
        console.log(error);
    })
    

}



render() {
    return(  
        <div>
            <Query 
        query={GET_ALL_COVER_LETTER_REDRAFT_FORMS}
        fetchPolicy = "no-cache"
        onCompleted={data => this.upadateItemCount(data.getAllCoverLetterRedraft.length)}
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

                            {data.getAllCoverLetterRedraft === null ?
                                    <div className = "client_expert_listing_main">
                                        <h4>No Item Available</h4>
                                    </div>:
                                    data.getAllCoverLetterRedraft.map((Item,index) =>
                                        <div key = {index} className = {Item.status==="Assigned"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package, Item.form_id)}>view</button>
                                                    {this.props.account_type === "Admin" ? <button onClick={() => this.OpenAssignExpertModal(Item.package, Item.name, Item.id)}>Assign Expert</button>:""}

                                                    {Item.status === "Pending Approval"?<button className = "pendingBtn">Pending Approval</button>:<Mutation 
                                                        mutation={ASSIGN_SELF_REQUEST}
                                                        onError={this.error} 
                                                        onCompleted={data=>{
                                                               this.assignSelf(Item.form_id,Item.package,Item.id)
                                                        }}>        
                                                    {(asignSelfRequest, { data,loading, error}) => (        
                                                        <div className = "loader-wrapper">
                                                            <div id="submittedSucces" className="SuccessTagForm">
                                                                Success! Redirecting...
                                                            </div>
                                                            <form 
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                asignSelfRequest({ 
                                                                  variables: {
                                                                    expert_id: this.props.expert_id,
                                                                    form_id:Item.form_id,
                                                                    package:Item.package
                                                                  }
                                                                 });
                                                             }}>
                                                            <button  type = "submit" >Assign Self</button> 
                                                                         
                                                            </form>
                                                            {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                                             {error && <div className="FailedTagForm"> Connection error, please check network and try again.</div>}
                                                    </div>
                                                     )}

                                                    </Mutation>}
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )}
                        </div>
                        
                    </div>
                </div>
              );
            }}
        </Query>
        <Query 
        query={GET_ALL_COVER_LETTER_REVIEW_FORMS}
        fetchPolicy = "no-cache"
        onCompleted={data => this.upadateItemCount(data.getAllCoverLetterReview.length)}
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

                            {data.getAllCoverLetterReview === null ?
                                    <div className = "client_expert_listing_main">
                                        <h4>No Item Available</h4>
                                    </div>:
                                    data.getAllCoverLetterReview.map((Item,index) =>
                                        <div key = {index} className = {Item.status==="Assigned"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package, Item.form_id)}>view</button>
                                                    {this.props.account_type === "Admin" ? <button onClick={() => this.OpenAssignExpertModal(Item.package, Item.name, Item.id)}>Assign Expert</button>:""}
                                                   {Item.status === "Pending Approval"?<button className = "pendingBtn">Pending Approval</button>:<Mutation 
                                                        mutation={ASSIGN_SELF_REQUEST}
                                                        onError={this.error} 
                                                        onCompleted={data=>{
                                                               this.assignSelf(Item.form_id,Item.package,Item.id)
                                                        }}>        
                                                    {(asignSelfRequest, { data,loading, error}) => (        
                                                        <div className = "loader-wrapper">
                                                            <div id="submittedSucces" className="SuccessTagForm">
                                                                Success! Redirecting...
                                                            </div>
                                                            <form 
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                asignSelfRequest({ 
                                                                  variables: {
                                                                    expert_id: this.props.expert_id,
                                                                    form_id:Item.form_id,
                                                                    package:Item.package
                                                                  }
                                                                 });
                                                             }}>
                                                            <button  type = "submit" >Assign Self</button> 
                                                                         
                                                            </form>
                                                            {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                                             {error && <div className="FailedTagForm"> Connection error, please check network and try again.</div>}
                                                    </div>
                                                     )}

                                                    </Mutation>}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )}
                        </div>
                        
                    </div>
                </div>
              );
            }}
        </Query>
        <Query 
        query={GET_ALL_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORMS}
        fetchPolicy = "no-cache"
        onCompleted={data => this.upadateItemCount(data.getAllGraduateSchoolEssayRedraftForm.length)}
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

                            {data.getAllGraduateSchoolEssayRedraftForm === null ?
                                    <div className = "client_expert_listing_main">
                                        <h4>No Item Available</h4>
                                    </div>:
                                    data.getAllGraduateSchoolEssayRedraftForm.map((Item,index) =>
                                        <div key = {index} className = {Item.status==="Assigned"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package, Item.form_id)}>view</button>
                                                    {this.props.account_type === "Admin" ? <button onClick={() => this.OpenAssignExpertModal(Item.package, Item.name, Item.id)}>Assign Expert</button>:""}
                                                    {Item.status === "Pending Approval"?<button className = "pendingBtn">Pending Approval</button>:<Mutation 
                                                        mutation={ASSIGN_SELF_REQUEST}
                                                        onError={this.error} 
                                                        onCompleted={data=>{
                                                               this.assignSelf(Item.form_id,Item.package,Item.id)
                                                        }}>        
                                                    {(asignSelfRequest, { data,loading, error}) => (        
                                                        <div className = "loader-wrapper">
                                                            <div id="submittedSucces" className="SuccessTagForm">
                                                                Success! Redirecting...
                                                            </div>
                                                            <form 
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                asignSelfRequest({ 
                                                                  variables: {
                                                                    expert_id: this.props.expert_id,
                                                                    form_id:Item.form_id,
                                                                    package:Item.package
                                                                  }
                                                                 });
                                                             }}>
                                                            <button  type = "submit" >Assign Self</button> 
                                                                         
                                                            </form>
                                                            {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                                             {error && <div className="FailedTagForm"> Connection error, please check network and try again.</div>}
                                                    </div>
                                                     )}

                                                    </Mutation>}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )}
                        </div>
                        
                    </div>
                </div>
              );
            }}
        </Query>
        <Query 
        query={GET_ALL_RESUMME_REVIEW_FORMS}
        fetchPolicy = "no-cache"
        onCompleted={data => this.upadateItemCount(data.getAllResumeReviewForm.length)}
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

                            {data.getAllResumeReviewForm === null ?
                                    <div className = "client_expert_listing_main">
                                        <h4>No Item Available</h4>
                                    </div>:
                                    data.getAllResumeReviewForm.map((Item,index) =>
                                        <div key = {index} className = {Item.status==="Assigned"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package, Item.form_id)}>view</button>
                                                    {this.props.account_type === "Admin" ? <button onClick={() => this.OpenAssignExpertModal(Item.package, Item.name, Item.id)}>Assign Expert</button>:""}
                                                    {Item.status === "Pending Approval"?<button className = "pendingBtn">Pending Approval</button>:<Mutation 
                                                        mutation={ASSIGN_SELF_REQUEST}
                                                        onError={this.error} 
                                                        onCompleted={data=>{
                                                               this.assignSelf(Item.form_id,Item.package,Item.id)
                                                        }}>        
                                                    {(asignSelfRequest, { data,loading, error}) => (        
                                                        <div className = "loader-wrapper">
                                                            <div id="submittedSucces" className="SuccessTagForm">
                                                                Success! Redirecting...
                                                            </div>
                                                            <form 
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                asignSelfRequest({ 
                                                                  variables: {
                                                                    expert_id: this.props.expert_id,
                                                                    form_id:Item.form_id,
                                                                    package:Item.package
                                                                  }
                                                                 });
                                                             }}>
                                                            <button  type = "submit" >Assign Self</button> 
                                                                         
                                                            </form>
                                                            {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                                             {error && <div className="FailedTagForm"> Connection error, please check network and try again.</div>}
                                                    </div>
                                                     )}

                                                    </Mutation>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                        </div>
                        
                    </div>
                </div>
              );
            }}
        </Query>
        <Query 
        query={GET_ALL_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORMS}
        fetchPolicy = "no-cache"
        onCompleted={data => this.upadateItemCount(data.getAllGraduateSchoolStatementReviewForm.length)}
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

                            {data.getAllGraduateSchoolStatementReviewForm === null ?
                                    <div className = "client_expert_listing_main">
                                        <h4>No Item Available</h4>
                                    </div>:
                                    data.getAllGraduateSchoolStatementReviewForm.map((Item,index) =>
                                        <div key = {index} className = {Item.status==="Assigned"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package,Item.form_id)}>view</button>
                                                    {this.props.account_type === "Admin" ? <button onClick={() => this.OpenAssignExpertModal(Item.package, Item.name, Item.id)}>Assign Expert</button>:""}
                                                    
                                                    {Item.status === "Pending Approval"?<button className = "pendingBtn">Pending Approval</button>:<Mutation 
                                                        mutation={ASSIGN_SELF_REQUEST}
                                                        onError={this.error} 
                                                        onCompleted={data=>{
                                                               this.assignSelf(Item.form_id,Item.package,Item.id)
                                                        }}>        
                                                    {(asignSelfRequest, { data,loading, error}) => (        
                                                        <div className = "loader-wrapper">
                                                            <div id="submittedSucces" className="SuccessTagForm">
                                                                Success! Redirecting...
                                                            </div>
                                                            <form 
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                asignSelfRequest({ 
                                                                  variables: {
                                                                    expert_id: this.props.expert_id,
                                                                    form_id:Item.form_id,
                                                                    package:Item.package
                                                                  }
                                                                 });
                                                             }}>
                                                            <button  type = "submit" >Assign Self</button> 
                                                                         
                                                            </form>
                                                            {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                                             {error && <div className="FailedTagForm"> Connection error, please check network and try again.</div>}
                                                    </div>
                                                     )}

                                                    </Mutation>}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )}
                        </div>
                        
                    </div>
                </div>
              );
            }}
        </Query>
        {this.state.itemCount ===0? <div className = "no_item">No new application</div>:""}
        <Modal 
           isOpen={this.state.graduateSchoolStatementReviewForm}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <GraduateSchoolStatementReviewForm userID = {this.state.formID} account_type = {this.props.account_type}/>
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.coverLetterRedraftForm}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <CoverLetterRedraft userID = {this.state.formID} account_type = {this.props.account_type}/>
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.coverLetterReviewForm}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <CoverLetterReviewForm userID = {this.state.formID} account_type = {this.props.account_type} />
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.graduateSchoolEssayRedraftForm}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <GraduateSchoolEssayRedraftForm userID = {this.state.formID} account_type = {this.props.account_type}/>
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.resumeReviewForm}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <ResumeReviewForm userID = {this.state.formID} account_type = {this.props.account_type}/>
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>


        {/* Asigning of expers for each table of the application*/}

        <Modal 
           isOpen={this.state.assignExpertToApplicationResumeReview}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <AssignExpertToApplicationResumeReview userID = {this.state.id} />
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.assignExpertToApplicationCoverLetterReview}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <AssignExpertToApplicationCoverLetterReview userID = {this.state.id} />
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>


        <Modal 
           isOpen={this.state.assignExpertToApplicationCoverLetterRedraft}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <AssignExpertToApplicationCoverLetterRedraft userID = {this.state.id} />
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.assignExpertToApplicationGraduateEssayRedraft}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <AssignExpertToApplicationGraduateEssayRedraft userID = {this.state.id} />
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.assignExpertToApplicationGraduateStatementReview}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <AssignExpertToApplicationGraduateStatementReview userID = {this.state.id} />
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

         <Modal 
           isOpen={this.state.GraduateSchoolStatementReviewFormAR}
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
                                   this.handleCloseModal()
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
                                        has_expert:this.props.expert_id,
                                        status:"Assigned"

                                      },
                                      refetchQueries:[
                                        {
                                            query:GET_ALL_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORMS
                                        }]
                                     });
                                 }}
                                 className = "confirm_form">
                                 <div className = "confim_assign"><img  src={confirm} alt="gradsuccess" /></div>
                                 <h2>Confirm Request </h2>
                                 <p>
                                     Your request to assign self application will be sent to the admin,
                                 your will get an email if your request is approved
                                 </p>
                                <button  type = "submit" >Confirm Request</button> 
                                             
                                </form>
                                {loading && <div className = "loader-d"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                 {error && <div className="FailedTagForm-d"> Something went wrong, pease try again.</div>}
                        </div>
                         )}

                        </Mutation>  
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>
        <Modal 
           isOpen={this.state.ResumeReviewFormAR}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <Mutation 
                            mutation={UPDATE_RESUME_REVIEW_FORM}
                            onError={this.error} 
                            onCompleted={data=>{
                                   this.handleCloseModal()
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
                                        has_expert:this.props.expert_id,
                                        status:"Assigned"

                                      },
                                      refetchQueries:[
                                        {
                                            query:GET_ALL_RESUMME_REVIEW_FORMS
                                        }]
                                     });
                                 }}
                                 className = "confirm_form">
                                 <div className = "confim_assign"><img  src={confirm} alt="gradsuccess" /></div>
                                 <h2>Confirm Request </h2>
                                 <p>
                                     Your request to assign self application will be sent to the admin,
                                 your will get an email if your request is approved
                                 </p>
                                <button  type = "submit" >Confirm Request</button> 
                                             
                                </form>
                                {loading && <div className = "loader-d"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                 {error && <div className="FailedTagForm-d"> Something went wrong, pease try again.</div>}
                        </div>
                         )}

                        </Mutation>  
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.GraduateSchoolEssayRedraftFormAR}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <Mutation 
                            mutation={UPDATE_GRADUATE_SCHOOL_ESSAY_REDRAFT}
                            onError={this.error} 
                            onCompleted={data=>{
                                   this.handleCloseModal()
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
                                        has_expert:this.props.expert_id,
                                        status:"Assigned"

                                      },
                                      refetchQueries:[
                                        {
                                            query:GET_ALL_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORMS
                                        }]
                                     });
                                 }}
                                 className = "confirm_form">
                                 <div className = "confim_assign"><img  src={confirm} alt="gradsuccess" /></div>
                                 <h2>Confirm Request </h2>
                                 <p>
                                     Your request to assign self application will be sent to the admin,
                                 your will get an email if your request is approved
                                 </p>
                                <button  type = "submit" >Confirm Request</button> 
                                             
                                </form>
                                {loading && <div className = "loader-d"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                 {error && <div className="FailedTagForm-d"> Something went wrong, pease try again.</div>}
                        </div>
                         )}

                        </Mutation>  
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>


        <Modal 
           isOpen={this.state.CoverLetterReviewFormAR}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <Mutation 
                            mutation={UPDATE_COVER_LETTER_REVIEW_FORM}
                            onError={this.error} 
                            onCompleted={data=>{
                                   this.handleCloseModal()
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
                                        has_expert:this.props.expert_id,
                                        status:"Assigned"

                                      },
                                      refetchQueries:[
                                        {
                                            query:GET_ALL_COVER_LETTER_REVIEW_FORMS
                                        }]
                                     });
                                 }}
                                 className = "confirm_form">
                                 <div className = "confim_assign"><img  src={confirm} alt="gradsuccess" /></div>
                                 <h2>Confirm Request </h2>
                                 <p>
                                     Your request to assign self application will be sent to the admin,
                                     your will get an email if your request is approved
                                 </p>
                                <button  type = "submit" >Confirm Request</button> 
                                             
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


        <Modal 
           isOpen={this.state.CoverLetterRedraftAR}
           contentLabel="Minimal Modal Example"
           style={defaultStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <Mutation 
                            mutation={UPDATE_COVER_LETTER_REDRAFT}
                            onError={this.error} 
                            onCompleted={data=>{
                                   this.handleCloseModal()
                            }}
                            >        
                        {(asignSelfRequest, { data,loading, error}) => (        
                            <div className = "loader-wrapper">
                                <div id="submittedSucces" className="SuccessTagForm">
                                    Success! Redirecting...
                                </div>
                                <form 
                                onSubmit={e => {
                                    e.preventDefault();
                                    asignSelfRequest({ 
                                      variables: {
                                        id: this.state.applicationID,
                                        has_expert:this.props.expert_id,
                                        status:"Assigned"

                                      },
                                      refetchQueries:[
                                        {
                                            query:GET_ALL_COVER_LETTER_REDRAFT_FORMS
                                        }]
                                     });
                                 }}
                                 className = "confirm_form">
                                 <div className = "confim_assign"><img  src={confirm} alt="gradsuccess" /></div>
                                 <h2>Confirm Request </h2>
                                 <p>
                                     Your request to assign self application will be sent to the admin,
                                     your will get an email if your request is approved
                                 </p>
                                <button  type = "submit" >Confirm Request</button> 
                                             
                                </form>
                                {loading && <div className = "loader-d"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                 {error && <div className="FailedTagForm-d"> Something went wrong, pease try again.</div>}
                        </div>
                         )}

                        </Mutation>  
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        </div>
    )
}
}
export default AllApplications