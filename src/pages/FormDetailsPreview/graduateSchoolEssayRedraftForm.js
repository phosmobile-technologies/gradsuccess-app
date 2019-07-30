import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import { GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM } from "../graphql/queries"
import ExpertInCharge from "../Client/getExpertInCharge"

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            form_id:props.userID || "empty",
            fileUrl:"",
            fileNotAvailable:false
        }
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

          console.log(url)
       
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
        return (
            <div>
                <Query
                query={GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM}
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
                    <ExpertInCharge id = {data.getGraduateSchoolEssayRedraftForm.has_expert}/>
                    <h3 className = "form-header" >Form Details </h3>
                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>Name</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.name}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Which Employment is most relevant to you Masters Application?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.employment_most_relevant_to_you_masters_application}</p>
                        </div>
                    </div>

                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>What were your typical achievements which relates to your Proposed Masters application ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.typical_achievements}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Scholarships and Awards (Awarding Body, Dates)</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.scholarships_and_award}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>What are your top 5 courses at your Undegraduate level relating to your Masters of interest?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.undegraduate_level_courses_master}</p>
                        </div>
                    </div>



                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>What are your top 5 courses at your Undegraduate level relating to your Masters of interest ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.undegraduate_level_courses_master}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>What was your project/dissertation name at Undergraduate level and Grade achieved in percentage ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.project_dissertation_name_master}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>What is the name of your most recent Undergraduate education ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.most_recent_undergraduate}</p>
                        </div>
                    </div>


                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>What was your final grade at Undergraduate level ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.undergraduate_level_grade}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Your Result Ranking at Undergraduate level ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.result_ranking}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>What are your top 5 courses at Undergraduate relating to your PhD of interest ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.undegraduate_level_courses_phd}</p>
                        </div>
                    </div>


                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>What was your project/dissertation name at Undergraduate level and Grade achieved in percentage?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.project_dissertation_name_phd}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Leadership Experiences</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.leadership_experience}</p>
                        </div>
                    </div>

                    <div className="form_preview_col_1">
                        <div className="form_preview_fields"> 
                            <small>Skills</small>
                            <ul>                              
                            {data.getGraduateSchoolEssayRedraftForm.interpersonal_skills && <li>Interpesonal Skill</li>}
                            {data.getGraduateSchoolEssayRedraftForm.presentation_skills && <li>Presentation</li>}
                            {data.getGraduateSchoolEssayRedraftForm.programming && <li>Programming</li>}
                            {data.getGraduateSchoolEssayRedraftForm.microsoft_excel && <li>Microsoft Excel</li>}
                            {data.getGraduateSchoolEssayRedraftForm.java && <li>Java</li>}
                            </ul>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Other Skills</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.other_skills}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Extracurricular Activities and Memberships</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.extracurricular_activities}</p>
                        </div>
                    </div>


                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>Professional Workshops ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.professional_workshops}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Academic Conferences Attended  ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.academic_conferences_attended}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Certifications and Dates ?</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.certificate}</p>
                        </div>
                    </div>

                    <div className="form_preview_col_1">
                        <div className="form_preview_fields"> 
                            <small>Skills</small>
                            <ul>                              
                            {data.getGraduateSchoolEssayRedraftForm.english && <li>English</li>}
                            {data.getGraduateSchoolEssayRedraftForm.french && <li>French</li>}
                            {data.getGraduateSchoolEssayRedraftForm.german && <li>german</li>}
                            {data.getGraduateSchoolEssayRedraftForm.spanish && <li>Spanish</li>}
                            </ul>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Nigerian Language other than Native</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.other_languages}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Masters Intended Area of Research</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.university_of_choice_and_course}</p>
                        </div>
                    </div>

                    <div className="form_preview_col_1">
                        <div className="form_preview_fields">
                            <small>University of Choice and Course</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.university_of_choice_and_course}</p>
                        </div>
                        <div className="form_preview_fields"> 
                            <small>Teaching personnel/ Faculties Contacted at Institutions</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.teaching_personel_contacted}</p>
                        </div>

                        <div className="form_preview_fields"> 
                            <small>Summary of your interest</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.summary_of_interest}</p>
                        </div>
                    </div>

                    <div className="form_preview_col_1">
                        <div className="form_preview_fields"> 
                            <small>Post Study Goals (Career Ambitions)</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.post_study_goal}</p>
                        </div>
                        <div className="form_preview_fields">
                            <small>Referee</small>
                            <p>{data.getGraduateSchoolEssayRedraftForm.referee}</p>
                        </div>
                        <br />
                            {!this.state.fileNotAvailable?<a className = "download_file" href = {this.state.fileUrl} target = "_blank"> Download uploaded file</a>: <p className = "no_file">No Document was uploaded</p>}
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
export default Message