import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import {RESUME_REVIEW_FORM} from "../graphql/queries"
import ExpertInCharge from "../Client/getExpertInCharge"





class ResumeReviewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            form_id:props.userID || "empty"
        }
}


render() {
    return(  
        <div>
        <Query 
        query={RESUME_REVIEW_FORM}
        variables={{ 
            form_id:this.state.form_id }}
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
                        <ExpertInCharge id = {data.getResumeReviewForm.has_expert}/>
                        <h3 className = "form-header" >Form Details </h3>
                        <div className="form_preview_col_1">
                            <div className="form_preview_fields">
                                <small>Name</small>
                                <p>{data.getResumeReviewForm.name}</p>
                            </div>
                            <div className="form_preview_fields"> 
                                <small>Industry and Role Title Applied for</small>
                                <p>{data.getResumeReviewForm.industry_applied_for}</p>
                            </div>

                             <div className="form_preview_fields"> 
                                <small>Summary of Interest</small>
                                <p>{data.getResumeReviewForm.summary_of_interest}</p>
                            </div>
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
export default ResumeReviewForm