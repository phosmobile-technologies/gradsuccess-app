import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import {GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM} from "../graphql/queries"
import ExpertInCharge from "../Client-dashboard/getExpertInCharge"
import ApproveDeclineApplicationGraduateReview from "../ApproveDeclineComponents/approveDeclineApplicationGraduateReview";
import CompleteRateGraduateStatementReview from "../CompleteRateComponent/completeRateGraduateStatementReview";
import GetApplicationRating from "./getApplicationRating";

class GraduateSchoolEssayRedraftForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            form_id:props.userID || "empty",
            fileUrl:"",
            fileNotAvailable:false
        }
        this.downloadUploadedFile = this.downloadUploadedFile.bind(this);
}

downloadUploadedFile(downloadRef){
        const firebase = require("firebase")
        const config = {
          apiKey: 'AIzaSyB9uwinxn9jEKUmcz0_7rxgLDycAeGO2Fk',
          authDomain: 'gradsuccess-6c883.firebaseapp.com',
          databaseURL: 'https://gradsuccess-6c883.firebaseio.com',
          projectId: 'gradsuccess-6c883',
          storageBucket: 'gs://gradsuccess-6c883.appspot.com/',
          messagingSenderId: '153907721792',
          appID:"1:153907721792:web:ff681e47886cdbb7"
        }
        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }
        var storageRef = firebase.storage().ref(downloadRef)

       storageRef.getDownloadURL().then((url) =>{
          this.setState({
              fileUrl:url
          })
       
        }).catch((error) => {

         switch (error.code) {
            case 'storage/object-not-found':
             this.setState({
                  fileNotAvailable:true
              })
              break;

            case 'storage/unauthorized':
               this.setState({
                  fileNotAvailable:true
              })
              break;

            case 'storage/canceled':
               this.setState({
                  fileNotAvailable:true
              })
              break;

            case 'storage/unknown':
               this.setState({
                  fileNotAvailable:true
              })
              break;
         }
                });
    }

render() {
    return(  
        <div>
        <Query 
        query={GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM}
        variables={{form_id:this.state.form_id }}
        onCompleted={(data)=>{
            this.downloadUploadedFile(data.getGraduateSchoolStatementReviewForm.curriculum_vitae)
        }}
        >
            {({ loading, error, data }) => {
              if (loading) return (
                <div className = "loader">
                    <div className="loader_main_content">
                        <img  src={loader} alt="gradsuccess" />
                        <h1>preparing...</h1>
                    </div>
                </div>
                )
              if (error) return <div>failed to load data</div>
              return (
                <div className="form_preview">
                    <div className="form_preview_inner">
                        <h3 className = "form-header" >Form Details </h3>
                        <ExpertInCharge id = {data.getGraduateSchoolStatementReviewForm.has_expert}/>
                        
                        {data.getGraduateSchoolStatementReviewForm.status === "Pending Approval" && this.props.account_type === "Admin" ?<ApproveDeclineApplicationGraduateReview id = {data.getGraduateSchoolStatementReviewForm.id} form_id = {data.getGraduateSchoolStatementReviewForm.form_id}/>:""}
                        <div className="form_preview_col_1">
                            <div className="form_preview_fields">
                                <small>Name:</small>
                                <p>{data.getGraduateSchoolStatementReviewForm.name}</p>
                            </div>
                            <div className="form_preview_fields"> 
                                <small>University and Course Applied for:</small>
                                <p>{data.getGraduateSchoolStatementReviewForm.university_and_course_applied_for}</p>
                            </div>

                             <div className="form_preview_fields"> 
                                <small>Summary of Interest:</small>
                                <p>{data.getGraduateSchoolStatementReviewForm.summary_of_interest}</p>
                            </div>
                             <br />
                             <div className = "btn_wrapper">
                              {!this.state.fileNotAvailable?<a className = "download_file" href = {this.state.fileUrl} > Download uploaded file</a>: <p className = "no_file">No Document was uploaded</p>}
                               {this.props.account_type === "Client" && data.getGraduateSchoolStatementReviewForm.status === "Assigned"? 
                              <CompleteRateGraduateStatementReview 
                              form_id = {data.getGraduateSchoolStatementReviewForm.form_id} 
                              applicationID = {data.getGraduateSchoolStatementReviewForm.id} 
                              expert_id = {data.getGraduateSchoolStatementReviewForm.has_expert} 
                              appStatus = {data.getGraduateSchoolStatementReviewForm.completed}/>:
                              ""}
                             </div>
                             {data.getGraduateSchoolStatementReviewForm.completed?
                               <GetApplicationRating form_id = {data.getGraduateSchoolStatementReviewForm.form_id}/>:""}
                            <div className = "spacing">
                                
                            </div>
                        </div>
                    
                    </div>
                </div>
              );
            }}
        </Query>


      </div>
    )
}
}
export default GraduateSchoolEssayRedraftForm