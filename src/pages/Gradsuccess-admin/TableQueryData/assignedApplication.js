import { React, Component } from "react"
import { Query } from "react-apollo";
import emptyFolder from "../../../images/folder.svg"
import loader from "../../../images/loader.gif"
import {GET_ALL_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORMS} from "../../graphql/queries"
import {GET_ALL_COVER_LETTER_REDRAFT_FORMS} from "../../graphql/queries"
import {GET_ALL_COVER_LETTER_REVIEW_FORMS} from "../../graphql/queries"
import { GET_ALL_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORMS } from "../../graphql/queries"
import {GET_ALL_RESUMME_REVIEW_FORMS} from "../../graphql/queries"
import Modal from "react-modal"


import CoverLetterRedraft from "../../FormDetailsPreview/coverLetterRedraft"
import CoverLetterReviewForm from "../../FormDetailsPreview/coverLetterReviewForm"
import GraduateSchoolEssayRedraftForm from "../../FormDetailsPreview/graduateSchoolEssayRedraftForm"
import GraduateSchoolStatementReviewForm from "../../FormDetailsPreview/graduateSchoolStatementReviewForm"
import ResumeReviewForm from "../../FormDetailsPreview/resumeReviewForm"

const customStyles = {
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
            id:"",
            itemCount:0

        }
        this.OpenApplicationDetails = this.OpenApplicationDetails.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.upadateItemCount = this.upadateItemCount.bind(this)

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

    })   
}

upadateItemCount(list){
    list.forEach((eachApp)=>{
    if(eachApp.status === "Assigned"){
        this.setState({
            itemCount:this.state.itemCount+1
        })
    }
});   
}



render() {
    return(  
        <div>
            <Query 
        query={GET_ALL_COVER_LETTER_REDRAFT_FORMS}
        fetchPolicy = "no-cache"
        onCompleted={data => this.upadateItemCount(data.getAllCoverLetterRedraft)}
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
                                        <div key = {index} className = {Item.status==="Vacant"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package, Item.form_id)}>view</button>
                                                    <button onClick={() => this.props.handleDisplayMessagingComponent(Item.form_id, Item.name)}>message</button>
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
        onCompleted={data => this.upadateItemCount(data.getAllCoverLetterReview)}
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
                                        <div key = {index} className = {Item.status==="Vacant"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package, Item.form_id)}>view</button>
                                                    <button onClick={() => this.props.handleDisplayMessagingComponent(Item.form_id, Item.name)}>message</button>
                                                    
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
        onCompleted={data => this.upadateItemCount(data.getAllGraduateSchoolEssayRedraftForm)}
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
                                        <div key = {index} className = {Item.status==="Vacant"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package, Item.form_id)}>view</button>
                                                    <button onClick={() => this.props.handleDisplayMessagingComponent(Item.form_id, Item.name)}>message</button>
                                                    
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
        onCompleted={data => this.upadateItemCount(data.getAllResumeReviewForm)}
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
                                        <div key = {index} className = {Item.status==="Vacant"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package, Item.form_id)}>view</button>
                                                    <button onClick={() => this.props.handleDisplayMessagingComponent(Item.form_id, Item.name)}>message</button>
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
        onCompleted={data => this.upadateItemCount(data.getAllGraduateSchoolStatementReviewForm)}
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
                                        <div key = {index} className = {Item.status==="Vacant"?"hide_application":""}>
                                            <div className = "client_expert_listing_main" >
                                                <div>
                                                    <h4>{Item.name}</h4>
                                                    <p>{Item.summary_of_interest}</p>
                                                    <span>{Item.created_at.split(" ")[0]}</span>
                                                    <span className = "statusCard">{Item.status}</span>
                                                </div>
                                                <div className = "client_expert_listing_btn_wrapper">
                                                    <button onClick={() => this.OpenApplicationDetails(Item.package,Item.form_id)}>view</button>
                                                    <button onClick={() => this.props.handleDisplayMessagingComponent(Item.form_id, Item.name)}>message</button>
                                                    
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
        {this.state.itemCount ===0? <div className = "no_item">
            <img  src={emptyFolder} alt="gradsuccess" />
            <p>No assigned application</p>
        </div>:""}
        <Modal 
           isOpen={this.state.graduateSchoolStatementReviewForm}
           contentLabel="Minimal Modal Example"
           style={customStyles}
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
           style={customStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <CoverLetterRedraft userID = {this.state.formID} account_type = {this.props.account_type} />
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.coverLetterReviewForm}
           contentLabel="Minimal Modal Example"
           style={customStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <CoverLetterReviewForm userID = {this.state.formID} account_type = {this.props.account_type}/>
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>

        <Modal 
           isOpen={this.state.graduateSchoolEssayRedraftForm}
           contentLabel="Minimal Modal Example"
           style={customStyles}
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
           style={customStyles}
           ariaHideApp={false}
        >
            <div className = "detail_preview_modal_container">
                <div className = "detail_preview_modal_container_inner">
                      <ResumeReviewForm userID = {this.state.formID} account_type = {this.props.account_type}/>
                </div>
            </div>
            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
        </Modal>     

        </div>
    )
}
}
export default AllApplications