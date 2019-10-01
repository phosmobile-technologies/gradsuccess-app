import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CREATE_COVER_LETTER_REDRAFT } from '../../graphql/mutations';
import download from "../../../images/download.png"
import loader from "../../../images/loader.gif"
import ThankYou from "../formCompletePage"

export default class resumeReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: "empty",
                address: "empty",
                phone: "empty",
                workplace_1: "empty",
                workplace_1_roles: "empty",
                workplace_1_recognized_job: "empty",
                workplace_2: "empty",
                workplace_2_roles: "empty",
                workplace_2_recognized_job: "empty",
                supervised_before: "empty",
                supervised_workplace: "empty",
                recent_tertiary_institute: "empty",
                number_of_employee_supervised_workplace_1: "empty",
                number_of_employee_supervised_workplace_2: "empty",
                recent_tertiary_institute_name: "empty",
                scholarship_and_awards: "empty",
                final_grade_school_1: "empty",
                result_rank_school_1: "empty",
                top_courses_school_1: "empty",
                project_dissertation_name_school_1: "empty",
                next_most_recent_tertiary_education: "empty",
                final_grade_school_2: "empty",
                result_rank_school_2: "empty",
                top_courses_school_2: "empty",
                leadership_experience: "empty",
                interpersonal_skills: false,
                presentation_skills: false,
                programming: false,
                microsoft_excel: false,
                java: false,
                other_skills: "empty",
                extracurricular_activities: "empty",
                professional_workshops: "empty",
                certification_dates: "empty",
                organization_contacted_before_hand: "empty",
                summary_of_interest: "empty",
                curriculum_vitae: "CV.pdf",
                package: this.props.package,
                has_expert: "empty",
                form_id: "empty",
                status:"Vacant",
                completed:false
            },
            form_submit_success:false,
        }
        this.handleFormInput = this.handleFormInput.bind(this);
        this.onChange = this.onChange.bind(this)
        this.formSubmitted = this.formSubmitted.bind(this)
    }

    componentDidMount() {
      if (localStorage.hasOwnProperty("targeted")) {
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            has_expert: localStorage.getItem("targeted"),
            status: "Assigned",
          },
        }))
      }
      localStorage.getItem('payment_successful');
      if(localStorage.hasOwnProperty('payment_successful')){
        this.setState({
          form_submit_success:true
        })
      }

      document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').style.opacity = '0.5'
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                form_id: localStorage.getItem("form_id")
            }

        }))
        localStorage.setItem("package",this.props.package);
    }


    handleFormInput(event) {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    [name]: checked
                }
            }))
        } else {
            this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    [name]: value
                }
            }))
        }
    }
    formSubmitted() {
        document.getElementById("submittedSucces").style.display = "block"
        localStorage.setItem('payment_successful',true)

        setTimeout(function() {
            if (document.getElementById("submittedSucces") != null) {
                document.getElementById("submittedSucces").style.display = "none"
            }
        }, 5000)
        this.setState({
          form_submit_success:true
        })

    }

    onChange(e) {
        const firebase = require("firebase")

          const config = {
            apiKey: "AIzaSyC26CrW2BGh2lXXDK0Gkcl4gCIPccHvW6s",
            authDomain: "gradsuccess.firebaseapp.com",
            databaseURL: "https://gradsuccess.firebaseio.com",
            projectId: "gradsuccess",
            storageBucket: "gradsuccess.appspot.com",
            messagingSenderId: "1038128602103",
            appId: "1:1038128602103:web:55d1ab3ffe5b02bf222cf2",
          }
        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }
        
        const uploader = document.getElementById('uploader')
        const uploadingText = document.getElementById('uploading')
        const completeText = document.getElementById('complete')
        const errorText = document.getElementById('error')
        let CVName = this.state.data.name.replace(/\s+/g, '_')
        let timeSubmitted = new Date().getTime()
        var file = document.getElementById('file').files[0];
        let fileRef = 'CurriculumVitae/' + CVName + "_" + timeSubmitted + "_" + file.name
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                "curriculum_vitae": fileRef
            }
        }))
        var storageRef = firebase.storage().ref(fileRef)
        var task = storageRef.put(file)
        task.on('state_changed',
            function progress(snapshot) {
                uploadingText.style.display = "block"
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                uploader.value = percentage
            },
            function error(err) {
                uploadingText.style.display = "none"
                errorText.style.display = "block"
            },
            function complete() {
                uploadingText.style.display = "none"
                errorText.style.display = "none"
                completeText.style.display = "block"
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').style.opacity = '1'
            })
    }
    componentWillUnmount() {
      
      if(this.state.form_submit_success){
        localStorage.removeItem("yshKSMCis129_#&NISis");
        localStorage.removeItem("targeted")
      }else{
      }

    }
    render() {
      if(!this.state.form_submit_success){
        return (
            <div>
                <div className = "detail-form">
                  <Mutation
                  mutation={CREATE_COVER_LETTER_REDRAFT}
                  onError={this.error}
                  onCompleted={data=>{
                  this.formSubmitted()
                  }}
                  >
                  {(createCoverLetterRedraftData, { data,loading, error}) => (
                  <div className = "loader-wrapper">
                    <div id="submittedSucces" className="SuccessTagForm">
                      Success! Your Details was submitted...
                    </div>
                    <form
                      onSubmit={e => {
                      e.preventDefault();
                      createCoverLetterRedraftData({
                      variables: this.state.data
                      });
                      }}
                      className = "checkout-form-container">
                      
                      <h3 className = "form-header" >Please Fill with correct details </h3>
                      <div className="row-full">
                        <input type="text"
                        placeholder="Name (Surname First)"
                        id = "name"
                        name = "name" required onChange = {this.handleFormInput} />
                        <br />
                        <input type="text"
                        placeholder="Address"
                        id = "address"
                        name = "address" required onChange = {this.handleFormInput} />
                        <br />
                        
                        <input type="text"
                        placeholder="Phone"
                        id = "phone"
                        name = "phone" required onChange = {this.handleFormInput} />
                        <br />
                        <input type="text"
                        placeholder="Workplace 1"
                        id = "workplace_1"
                        name = "workplace_1" required onChange = {this.handleFormInput} />
                        <br />
                        <textarea
                        type="text"
                        placeholder="What was your role and your typical responsibilities?"
                        id = "workplace_1_roles"
                        name = "workplace_1_roles"
                        rows = '4' required onChange = {this.handleFormInput} ></textarea>
                        <textarea
                        type="text"
                        placeholder="Have you been recognized in this job? *"
                        id = "workplace_1_recognized_job"
                        name = "workplace_1_recognized_job"
                        rows = '4' required onChange = {this.handleFormInput} ></textarea>
                        <input type="text"
                        placeholder="Workplace 2"
                        id = "workplace_2"
                        name = "workplace_2" onChange = {this.handleFormInput} />
                        <br />
                        <textarea
                        type="text"
                        placeholder="What was your role and your typical responsibilities?"
                        id = "workplace_2_roles"
                        name = "workplace_2_roles"
                        rows = '4' onChange = {this.handleFormInput} ></textarea>
                        <textarea
                        type="text"
                        placeholder="Have you been recognized in this job? *"
                        id = "workplace_2_recognized_job"
                        name = "workplace_2_recognized_job"
                        rows = '4' onChange = {this.handleFormInput} ></textarea>
                        <div className = "selectibleList">
                          <label>Have you supervised before? * </label>
                          <div>
                            <div>
                              <input type="radio"
                              name="supervised_before"
                              id ="supervised_before"
                              checked={this.state.data.supervised_before === "Yes"}
                              onChange = {this.handleFormInput}
                              value="Yes"/>
                              
                              <label>Yes</label>
                            </div>
                            
                            <div>
                              <input type="radio"
                              name="supervised_before"
                              id ="supervised_before"
                              checked={this.state.data.supervised_before === "No"}
                              onChange = {this.handleFormInput}
                              value="No" />
                              <label>No</label>
                            </div>
                          </div>
                        </div>
                        <div className = "selectibleList">
                          <label>If yes, in which firm(s) did you supervise?</label>
                          <div>
                            <input type="radio"
                            name="supervised_workplace"
                            id ="supervised_workplace"
                            value="Workplace 1"
                            checked={this.state.data.supervised_workplace === "Workplace 1"}
                            onChange = {this.handleFormInput} />
                            <label>Workplace 1</label>
                          </div>
                          <div>
                            <input type="radio"
                            name="supervised_workplace"
                            id ="supervised_workplace"
                            value="Workplace 2"
                            checked={this.state.data.supervised_workplace === "Workplace 2"}
                            onChange = {this.handleFormInput} />
                            <label>Workplace 2</label>
                          </div>
                        </div>
                        <input type="text"
                        name = "number_of_employee_supervised_workplace_1"
                        id = "number_of_employee_supervised_workplace_1"
                        placeholder="How many employees did you supervise in Workplace 1? *"  required onChange = {this.handleFormInput} />
                        <input type="text"
                        name = "number_of_employee_supervised_workplace_2"
                        id = "number_of_employee_supervised_workplace_2"
                        placeholder="How many employees did you supervise in Workplace 2?"  required required onChange = {this.handleFormInput} />
                        <div className = "selectibleList" >
                          <label>Most recent tertiary education</label>
                          <div>
                            <input type="radio"
                            id ="recent_tertiary_institute"
                            name="recent_tertiary_institute"
                            value="Phd"
                            checked={this.state.data.recent_tertiary_institute ==="Phd"}
                            onChange = {this.handleFormInput} />
                            <label>Phd</label>
                          </div>
                          <div>
                            <input type="radio"
                            id ="recent_tertiary_institute"
                            name="recent_tertiary_institute"
                            checked={this.state.data.recent_tertiary_institute ==="MSc."}
                            value="MSc."  onChange = {this.handleFormInput} />
                            <label>MSc.</label>
                          </div>
                          <div>
                            <input type="radio"
                            id ="recent_tertiary_institute"
                            name="recent_tertiary_institute"
                            checked={this.state.data.recent_tertiary_institute ==="Bachelors/HND"}
                            value="Bachelors/HND"  onChange = {this.handleFormInput} />
                            <label>Bachelors/HND</label>
                          </div>
                          <div>
                            <input type="radio"
                            id ="recent_tertiary_institute"
                            name="recent_tertiary_institute"
                            checked={this.state.data.recent_tertiary_institute ==="O' Level"}
                            value="O' Level"  onChange = {this.handleFormInput} />
                            <label>O' Level</label>
                          </div>
                        </div>
                        
                        <input type="text"
                        name = "recent_tertiary_institute_name"
                        id = "recent_tertiary_institute_name"
                        placeholder="Name of most recent tertiary education?"  required onChange = {this.handleFormInput} />
                        <input type="text"
                        name = "scholarship_and_awards"
                        id = "scholarship_and_awards"
                        placeholder=" Scholarships and Awards (Awarding Body, Dates)"  onChange = {this.handleFormInput} />
                        <input type="text"
                        name = "final_grade_school_1"
                        id = "final_grade_school_1"
                        placeholder=" Final grade at School 1" required onChange = {this.handleFormInput} />
                        <div className = "selectibleList">
                          <label>How do you rank your result in your overall graduating class at School 1? *</label>
                          <div>
                            <input type="radio"
                            name="result_rank_school_1"
                            id ="result_rank_school_1"
                            checked={this.state.data.result_rank_school_1 ==="Top 5%"}
                            value="Top 5%"  onChange = {this.handleFormInput} />
                            <label>5%</label>
                          </div>
                          <div>
                            <input type="radio"
                            name="result_rank_school_1"
                            id ="result_rank_school_1"
                            checked={this.state.data.result_rank_school_1 ==="Top 10%"}
                            value="Top 10%"  onChange = {this.handleFormInput} />
                            <label>Top 10%</label>
                          </div>
                          <div>
                            <input type="radio"
                            name="result_rank_school_1"
                            id ="result_rank_school_1"
                            checked={this.state.data.result_rank_school_1 ==="Top 20%"}
                            value="Top 20%"  onChange = {this.handleFormInput} />
                            <label>Top 20%</label>
                          </div>
                          <div>
                            <input type="radio"
                            name="result_rank_school_1"
                            id ="result_rank_school_1"
                            checked={this.state.data.result_rank_school_1 ==="Top 50%"}
                            value="Top 50%"  onChange = {this.handleFormInput} />
                            <label>Top 50%</label>
                          </div>
                        </div>
                        <textarea type="text"
                        id ="top_courses_school_1"
                        name="top_courses_school_1"
                        placeholder="Top 5 courses at School 1"  onChange = {this.handleFormInput} ></textarea>
                        <input type="text"
                        id ="project_dissertation_name_school_1"
                        name="project_dissertation_name_school_1"
                        placeholder="Your project/dissertation name at School 1"  onChange = {this.handleFormInput} />
                        <input type="text"
                        id ="next_most_recent_tertiary_education"
                        name="next_most_recent_tertiary_education"
                        placeholder="Name of your next most recent tertiary education"  onChange = {this.handleFormInput} />
                        <input type="text"
                        id ="final_grade_school_2"
                        name="final_grade_school_2"
                        placeholder="Your final grade at School 2?" onChange = {this.handleFormInput}  />
                        
                        <br/>
                        <div className = "selectibleList">
                          <label>How do you rank your result in your overall graduating class at School 2?</label>
                          <div>
                            <input type="radio"
                            name="result_rank_school_2"
                            id ="result_rank_school_2"
                            checked={this.state.data.result_rank_school_2 ==="Top 5%"}
                            value="Top 5%"  onChange = {this.handleFormInput} />
                            <label>5%</label>
                          </div>
                          <div>
                            <input type="radio"
                            name="result_rank_school_2"
                            id ="result_rank_school_2"
                            checked={this.state.data.result_rank_school_2 ==="Top 10%"}
                            value="Top 10%" onChange = {this.handleFormInput}  />
                            <label>Top 10%</label>
                          </div>
                          <div>
                            <input type="radio"
                            name="result_rank_school_2"
                            id ="result_rank_school_2"
                            checked={this.state.data.result_rank_school_2 ==="Top 20%"}
                            value="Top 20%"  onChange = {this.handleFormInput} />
                            <label>Top 20%</label>
                          </div>
                          <div>
                            <input type="radio"
                            name="result_rank_school_2"
                            id ="result_rank_school_2"
                            checked={this.state.data.result_rank_school_2 ==="Top 50%"}
                            value="Top 50%"  onChange = {this.handleFormInput} />
                            <label>Top 50%</label>
                          </div>
                        </div>
                        <textarea type="text"
                        id ="top_courses_school_2"
                        name="top_courses_school_2"
                        placeholder="Your top 5 courses at School 2"  onChange = {this.handleFormInput} >
                        </textarea>
                        <input
                        type="text"
                        placeholder="Leadership Experiences"
                        id ="leadership_experience"
                        name="leadership_experience"
                        onChange = {this.handleFormInput} />
                        <div className = "selectibleList">
                          <label>What is Skills ?</label>
                          
                          <div>
                            <input type="checkbox"
                            id ="interpersonal_skills"
                            name="interpersonal_skills"
                            checked={this.state.data.interpersonal_skills}
                            onChange = {this.handleFormInput} />
                            <label>Interpersonal Skills</label>
                          </div>
                          <div>
                            <input type="checkbox"
                            id ="presentation_skills"
                            name="presentation_skills"
                            checked={this.state.data.presentation_skills}
                            onChange = {this.handleFormInput} />
                            <label>Presentation Skills</label>
                          </div>
                          <div>
                            <input type="checkbox"
                            id ="programming"
                            name="programming"
                            checked={this.state.data.programming}
                            onChange = {this.handleFormInput} />
                            <label>Programming (provide details in comment box below)</label>
                          </div>
                          <div>
                            <input type="checkbox"
                            id ="microsoft_excel"
                            name="microsoft_excel"
                            checked={this.state.data.microsoft_excel}
                            onChange = {this.handleFormInput} />
                            <label>Microsoft Excel</label>
                          </div>
                          <div>
                            <input type="checkbox"
                            id ="java"
                            name="java"
                            checked={this.state.data.java}
                            onChange = {this.handleFormInput} />
                            <label>JAVA</label>
                          </div>
                          <div className = "other_skills">
                            <input type="checkbox"
                            checked={this.state.data.other_skills != "empty"}
                            onChange = {this.handleFormInput} />
                            <input type="text"
                            id ="other_skills"
                            name="other_skills"
                            placeholder = "Other Skills"
                            onChange = {this.handleFormInput} />
                          </div>
                        </div>
                        <input type="text"
                        id ="extracurricular_activities"
                        name="extracurricular_activities"
                        placeholder="Extracurricular Activities"  onChange = {this.handleFormInput} />
                        <input type="text"
                        id ="professional_workshops"
                        name="professional_workshops"
                        placeholder="Professional Workshops"  onChange = {this.handleFormInput} />
                        <input type="text"
                        id ="certification_dates"
                        name="certification_dates"
                        placeholder="Certifications and Dates"  onChange = {this.handleFormInput} />
                        <input type="text"
                        id ="organization_contacted_before_hand"
                        name="organization_contacted_before_hand"
                        placeholder="Employees at Organization Contacted Before Hand"  onChange = {this.handleFormInput} />
                        <textarea
                        type="text"
                        id ="summery_of_interest"
                        name="summery_of_interest"
                        placeholder="Summary of your interest"
                        rows = '4' onChange = {this.handleFormInput} ></textarea>
                      </div>
                      <input
                      type="file"
                      name="file"
                      id="file"
                      className = "file_upload"
                      onChange={this.onChange}/>
                      
                      <div className = "progressBar">
                        <label className = "uploading" id = "uploading">Uploading...</label>
                        <label className = "complete" id = "complete">Complete!</label>
                        <label className = "error" id = "error">Error!</label>
                      <progress value = "0" max= "100" id = "uploader">0%</progress>
                    </div>
                    <div className = "file_upload_label">
                      <label htmlFor="file" >Upload Essay</label>
                    </div>
                    <br />
                    <input type = "submit" className = "submit-details" value = "Submit" id = "submitBtn"/>
                    
                  </form>
                  {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                  {error && <div className="FailedTagForm"> Failed! Something is not right...</div>}
                </div>
                )}
                </Mutation>
                <div className = "explainInput">
                  <h3>Essay Redraft</h3>
                  <p>
                    The information to be collected from this form would be used as a basis for your resume and cover letter. For experienced personnel with over 5 years professional experience, just upload your CV. the form is not required.
                  </p>
                  <span className = "required">* Required</span>
                  <ul>
                    <li>
                      <span>Name (Surname First)</span>
                      <p>Provide your full name, address, phone and correctly answer the fields after<i>Your Surname should come first</i></p>
                    </li>
                    <li>
                      <span>Which is your most recent Employment Relating to Job Applied for? (Workplace 1) *</span>
                      <p>Please provide the name of your most recent employer here</p>
                    </li>
                    <li>
                      <span>What was your role and your typical responsibilities? (Ignore if CV attached) *</span>
                      <p>Please list the top 5</p>
                    </li>
                    <li>
                      <span>Have you been recognized in this job? *</span>
                      <p>Please list top 3 achievements. For example, 'Achieved 45% increase in revenues by creating new social media platform to connect with new customer segments'</p>
                    </li>
                    <li>
                      <span>Which is your second most recent employer? (Workplace 2)</span>
                      <p>Please provide the name</p>
                    </li>
                    <li>
                      <span>What was your role and your typical responsibilities?(Ignore if CV attached)</span>
                      <p>Please list the top 5</p>
                    </li>
                    <li>
                      <span>Have you been recognized in this job?</span>
                      <p>Please list top 3 achievements. For example, 'Achieved 45% increase in revenues by creating new social media platform to connect with new customer segments'</p>
                    </li>
                    <li>
                      <span>How many employees did you supervise in Workplace 1? *</span>
                      <p>If you don't have specifics, feel free to provide a range. e.g 15 - 20</p>
                    </li>
                    <li>
                      <span>How many employees did you supervise in Workplace 2?</span>
                      <p>Feel free to provide a range</p>
                    </li>
                    <li>
                      <span>What is the name of your most recent tertiary education? (Ignore if contained in CV attached) *</span>
                      <p>Feel free to provide a range</p>
                    </li>
                    <li>
                      <span>Scholarships and Awards (Awarding Body, Dates)</span>
                      <p>e.g. Chevron Undergraduate Scholarships, July 2015</p>
                    </li>
                    <li>
                      <span>What was your final grade at School 1? (Ignore if contained in CV attached)</span>
                    </li>
                    <li>
                      <span>What are your top 5 courses at School 1 relating to your job of interest?</span>
                    </li>
                    <li>
                      <span>What was your project/dissertation name at School 1 and Grade achieved in percentage? *</span>
                    </li>
                    <li>
                      <span>What is the name of your next most recent tertiary education? (Ignore if contained in CV attached) *</span>
                    </li>
                    <li>
                      <span>What was your final grade at School 2? (List final grade as provided on your final transcript or result) *</span>
                    </li>
                    <li>
                      <span>What are your top 5 courses at School 2 relating to your job of interest?</span>
                    </li>
                    <li>
                      <span>Extracurricular Activities and Memberships (List all sports, clubs and society memberships)</span>
                    </li>
                    <li>
                      <span>Professional Workshops and Trainings (Organizer and Dates)</span>
                      <p>e.g. Conflict Management and Communication Improvement, Toastmasters USA, July 12th -13th, 2015</p>
                    </li>
                    
                    <li>
                      <span>Certifications and Dates</span>
                      <p>e.g. CFA Level 1 (July 2012)</p>
                    </li>
                    
                    <li>
                      <span>Employees at Organization Contacted Before Hand</span>
                    </li>
                    <li>
                      <span>Summary of your interest</span>
                      <p>
                        Try to describe in few words, what you want to do and experiences that sparked the interest. e.g. I am interested in the concept of poverty alleviation through entrepreneurship. My experience working at 'workplace 1', allowed me to see the full picture of the consequences of unequal wealth distributions in most parts of emerging economies, and by studying the PhD/Masters at 'University' I believe I will be equipped with he right tools to tackle this challenges
                      </p>
                    </li>
                    
                  </ul>
                </div>
              </div>

              </div>
           
        );
        }else{
          return(
             <ThankYou />
          )
        }
    }
}