import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import {COVER_LETTER_REDRAFT} from "../graphql/queries"

import ExpertInCharge from "../Client/getExpertInCharge"




class CoverLetterRedraft extends Component {
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
        query={COVER_LETTER_REDRAFT}
        variables={{ form_id:this.state.form_id }}
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

                    <ExpertInCharge id = {data.getCoverLetterRedraft.has_expert}/>
                    <h3 className = "form-header" >Form Details </h3>
                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>Name</small>
                            <p>{data.getCoverLetterRedraft.name}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Address</small>
                            <p>{data.getCoverLetterRedraft.address}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Phone</small>
                            <p>{data.getCoverLetterRedraft.phone}</p>
                        </div>
                    </div>


                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>Which is your most recent Employment Relating to Job Applied for</small>
                            <p>{data.getCoverLetterRedraft.workplace_1}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>What was your role and your typical responsibilities</small>
                            <p>{data.getCoverLetterRedraft.workplace_1_roles}</p>
                        </div>
                        
                        <div className="form_preview_fields"> 
                            <small>Have you been recognized in this job</small>
                            <p>{data.getCoverLetterRedraft.workplace_1_recognized_job}</p>
                        </div>
                    </div>

                     <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>Which is your second most recent employer?</small>
                            <p>{data.getCoverLetterRedraft.workplace_2}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>What was your role and your typical responsibilities</small>
                            <p>{data.getCoverLetterRedraft.workplace_2_roles}</p>
                        </div>
                        
                        <div className="form_preview_fields"> 
                            <small>Have you been recognized in this job</small>
                            <p>{data.getCoverLetterRedraft.workplace_2_recognized_job}</p>
                        </div>
                    </div>

                     <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>Which is your second most recent employer?</small>
                            <p>{data.getCoverLetterRedraft.supervised_before}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>If yes, in which firm(s) did you supervise</small>
                            <p>{data.getCoverLetterRedraft.supervised_workplace}</p>
                        </div>
                        
                        <div className="form_preview_fields"> 
                            <small>How many employees did you supervise in Workplace 1</small>
                            <p>{data.getCoverLetterRedraft.number_of_employee_supervised_workplace_1}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>How many employees did you supervise in Workplace 2</small>
                            <p>{data.getCoverLetterRedraft.number_of_employee_supervised_workplace_2}</p>
                        </div>
                    </div>

                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>Most recent tertiary education</small>
                            <p>{data.getCoverLetterRedraft.recent_tertiary_institute}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Name of most recent tertiary education?</small>
                            <p>{data.getCoverLetterRedraft.recent_tertiary_institute_name}</p>
                        </div>
                        
                        <div className="form_preview_fields"> 
                            <small>Scholarships and Awards</small>
                            <p>{data.getCoverLetterRedraft.scholarship_and_awards}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Final grade at School 1</small>
                            <p>{data.getCoverLetterRedraft.final_grade_school_1}</p>
                        </div>
                    </div>


                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>How do you rank your result in your overall graduating class at School 1</small>
                            <p>{data.getCoverLetterRedraft.result_rank_school_1}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Top 5 courses at School 1</small>
                            <p>{data.getCoverLetterRedraft.top_courses_school_1}</p>
                        </div>
                        
                        <div className="form_preview_fields"> 
                            <small>Your project/dissertation name at School 1</small>
                            <p>{data.getCoverLetterRedraft.project_dissertation_name_school_1}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Name of your next most recent tertiary education</small>
                            <p>{data.getCoverLetterRedraft.next_most_recent_tertiary_education}</p>
                        </div>
                    </div>

                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>Your final grade at School 2</small>
                            <p>{data.getCoverLetterRedraft.final_grade_school_2}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>How do you rank your result in your overall graduating class at School 2</small>
                            <p>{data.getCoverLetterRedraft.result_rank_school_2}</p>
                        </div>
                        
                        <div className="form_preview_fields"> 
                            <small>Your top 5 courses at School 2</small>
                            <p>{data.getCoverLetterRedraft.top_courses_school_2}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Leadership Experiences</small>
                            <p>{data.getCoverLetterRedraft.leadership_experience}</p>
                        </div>
                    </div>





                    
                    <div className="form_preview_col_1">
                        <div className="form_preview_fields"> 
                            <small>Skills</small>
                            <ul>                              
                            {data.getCoverLetterRedraft.interpersonal_skills && <li>Interpesonal Skill</li>}
                            {data.getCoverLetterRedraft.presentation_skills && <li>Presentation</li>}
                            {data.getCoverLetterRedraft.programming && <li>Programming</li>}
                            {data.getCoverLetterRedraft.microsoft_excel && <li>Microsoft Excel</li>}
                            {data.getCoverLetterRedraft.java && <li>Java</li>}
                            </ul>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Other Skills</small>
                            <p>{data.getCoverLetterRedraft.other_skills}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Extracurricular Activities and Memberships</small>
                            <p>{data.getCoverLetterRedraft.extracurricular_activities}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Professional Workshops</small>
                            <p>{data.getCoverLetterRedraft.professional_workshops}</p>
                        </div>
                    </div>

                     <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>Certifications and Dates</small>
                            <p>{data.getCoverLetterRedraft.certification_dates}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Employees at Organization Contacted Before Hand</small>
                            <p>{data.getCoverLetterRedraft.organization_contacted_before_hand}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>LSummary of your interest</small>
                            <p>{data.getCoverLetterRedraft.summary_of_interest}</p>
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
export default CoverLetterRedraft