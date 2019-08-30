import gql from 'graphql-tag';
import React from 'react';


export const LOGIN = gql`
    mutation login(
    $email: String!,
	$password:String!
	){
		login(data:{
		    username: $email
		    password:$password
		}){
		    access_token
		    user{
		      first_name
		      phone
		      account_type
		    }
		}
	}
`;

export const LOGOUT = gql`
   mutation{
	  logout{
	    message
	  }
	}
`;


export const FORGOT_PASSWORD = gql`
    mutation ForgotPassword(
    $email: String!,
	){
		forgotPassword(
		    data:{
				email:$email
			}
		  ){
		    message
		}
	}
`;

export const CREATE_CLIENT_ACCOUNT = gql`
    mutation CreateClientAcccount(
    $first_name:String!,
    $last_name:String!,
    $phone:String!,
    $form_id: String!,
    $package: String!,
	$email:String!,
	$password:String!
	$account_type:String! ){
		 createClientAcccount(
		    first_name:$first_name
		    last_name:$last_name
		    phone:$phone
		    form_id:$form_id
		    package:$package
		    email:$email
		    password:$password
		    account_type:$account_type
				  ){
				    id
		}
	}
`;
export const UPDATE_CLIENT_ACCOUNT = gql`
    mutation UpdateClientAcccount(
    $id:ID!,
    $first_name:String!,
    $last_name:String!,
    $phone:String!,
    $email: String!){
		 updateClientAcccount(
	 		id:$id,
		    first_name:$first_name
		    last_name:$last_name
		    phone:$phone
		    email:$email
				  ){
		   id
		}
	}
`;

export const CREATE_COVER_LETTTER_REVIEW = gql`
    mutation CreateCoverLetterReviewForm(
    $name: String!,
	$industry_applied_for:String!,
	$summary_of_interest:String!,
	$curriculum_vitae: String!,
	$package:String
	$has_expert:String
	$form_id:String
	$status:String
	$completed:Boolean!
	){
		createCoverLetterReviewForm(
			name:$name, 
			industry_applied_for:$industry_applied_for, 
			summary_of_interest:$summary_of_interest, 
			curriculum_vitae: $curriculum_vitae,
			package:$package
			has_expert:$has_expert
			form_id:$form_id
			status:$status
			completed:$completed
			){
			name
		}
	}
`;

export const CREATE_RESUME_REVIEW_FORM = gql`
    mutation CreateResumeReviewForm(
    $name: String!,
	$industry_applied_for:String!,
	$summary_of_interest:String!,
	$curriculum_vitae: String!,
	$package:String,
	$has_expert:String
	$form_id:String!
	$status:String
	$completed:Boolean
	){
		createResumeReviewForm(
			name:$name, 
			industry_applied_for:$industry_applied_for, 
			summary_of_interest:$summary_of_interest, 
			curriculum_vitae:$curriculum_vitae, 
			package:$package,
			has_expert:$has_expert
			form_id:$form_id
			status:$status
			completed:$completed
			){
			name
		}
	}
`;


export const CREATE_GRADUATE_SCHOOL_STATEMENT_REVIEW = gql`
    mutation GraduateSchoolStatementReviewForm(
    $name: String!,
	$university_and_course_applied_for:String!,
	$summary_of_interest:String!,
	$curriculum_vitae: String!,
	$package:String
	$has_expert:String
	$form_id:String
	$status:String
	$completed:Boolean!
	){
		createGraduateSchoolStatementReviewForm(
    name: $name, 
    university_and_course_applied_for: $university_and_course_applied_for, 
    summary_of_interest: $summary_of_interest,
    curriculum_vitae:$curriculum_vitae, 
    package: $package
    has_expert:$has_expert
    form_id:$form_id
    status:$status
    completed:$completed
	    ) {
		   name
		}
	}
`;

export const CREATE_COVER_LETTER_REDRAFT = gql`
    mutation CoverLetterRedraft(
	    $name: String!,
		$address: String!,
		$phone: String!,
		$workplace_1: String!,
		$workplace_1_roles: String!,
		$workplace_1_recognized_job: String!,
		$workplace_2: String!,
		$workplace_2_roles: String!,
		$workplace_2_recognized_job: String!,
		$supervised_before: String!,
		$supervised_workplace: String!,
		$recent_tertiary_institute: String!,
		$number_of_employee_supervised_workplace_1: String!,
		$number_of_employee_supervised_workplace_2: String!,
		$recent_tertiary_institute_name: String!,
		$scholarship_and_awards: String!,
		$final_grade_school_1: String!,
		$result_rank_school_1: String!,
		$top_courses_school_1: String!,
		$project_dissertation_name_school_1: String!,
		$next_most_recent_tertiary_education: String!,
		$final_grade_school_2: String!,
		$result_rank_school_2: String!,
		$top_courses_school_2: String!,
		$leadership_experience: String!,
	    $interpersonal_skills: Boolean!,
	    $presentation_skills: Boolean!,
	    $programming: Boolean!,
	    $microsoft_excel: Boolean!,
	    $java: Boolean!,
	    $other_skills:String,
		$extracurricular_activities: String!,
		$professional_workshops: String!,
		$certification_dates: String!,
		$organization_contacted_before_hand: String!,
		$summary_of_interest: String!,
		$curriculum_vitae: String!,
		$package: String!
		$has_expert:String
		$form_id:String
		$status:String
		$completed:Boolean!
	){
		createCoverLetterRedraft(
	    name: $name,
		address: $address,
		phone: $phone,
		workplace_1: $workplace_1,
		workplace_1_roles: $workplace_1_roles,
		workplace_1_recognized_job: $workplace_1_recognized_job,
		workplace_2: $workplace_2,
		workplace_2_roles: $workplace_2_roles,
		workplace_2_recognized_job: $workplace_2_recognized_job,
		supervised_before: $supervised_before,
		supervised_workplace: $supervised_workplace,
		recent_tertiary_institute: $recent_tertiary_institute,
		number_of_employee_supervised_workplace_1: $number_of_employee_supervised_workplace_1,
		number_of_employee_supervised_workplace_2: $number_of_employee_supervised_workplace_2,
		recent_tertiary_institute_name: $recent_tertiary_institute_name,
		scholarship_and_awards: $scholarship_and_awards,
		final_grade_school_1: $final_grade_school_1,
		result_rank_school_1: $result_rank_school_1,
		top_courses_school_1: $top_courses_school_1,
		project_dissertation_name_school_1: $project_dissertation_name_school_1,
		next_most_recent_tertiary_education: $next_most_recent_tertiary_education,
		final_grade_school_2: $final_grade_school_2,
		result_rank_school_2: $result_rank_school_2,
		top_courses_school_2: $top_courses_school_2,
		leadership_experience: $leadership_experience,
	    interpersonal_skills: $interpersonal_skills,
	    presentation_skills: $presentation_skills,
	    programming: $programming,
	    microsoft_excel: $microsoft_excel,
	    java: $java,
	    other_skills: $other_skills,
		extracurricular_activities: $extracurricular_activities,
		professional_workshops: $professional_workshops,
		certification_dates: $certification_dates,
		organization_contacted_before_hand: $organization_contacted_before_hand,
		summary_of_interest: $summary_of_interest,
		curriculum_vitae: $curriculum_vitae,
		package: $package
		has_expert:$has_expert
		form_id:$form_id
		status:$status
		completed:$completed
		) {
		   name
		  }
			}
`;


export const CREATE_GRADUATE_SCHOOL_ESSAY_REDRAFT = gql`
    mutation GraduateSchoolEssayRedraftForm(
    $name: String!,
	$phone: String!,
	$employment_most_relevant_to_you_masters_application: String!,
	$typical_achievements: String!,
	$scholarships_and_award: String!,
	$undegraduate_level_courses_master: String!,
	$project_dissertation_name_master: String!,
	$most_recent_undergraduate: String!,
	$undergraduate_level_grade: String!,
	$result_ranking: String!,
	$undegraduate_level_courses_phd: String!,
	$project_dissertation_name_phd: String!,
	$leadership_experience: String!,
    $interpersonal_skills:Boolean!,
    $presentation_skills:Boolean!,
    $programming:Boolean!,
    $microsoft_excel:Boolean!,
    $java:Boolean!,
    $other_skills:String!,
	$extracurricular_activities: String!,
	$professional_workshops:String!,
	$academic_conferences_attended:String!,
	$certificate:String!,
	$english:Boolean!,
	$french:Boolean!,
	$german:Boolean!,
	$spanish:Boolean!,
	$nigeria_languages:Boolean!,
	$other_languages:String!,
	$masters_intended_area_of_research: String!,
	$university_of_choice_and_course: String!,
	$modules_interested: String!,
	$teaching_personel_contacted: String!,
	$summary_of_interest: String!,
	$post_study_goal: String!,
	$referee: String!,
	$curriculum_vitae: String,
	$package: String!,
	$has_expert:String
	$form_id:String!
	$status:String
	$completed:Boolean!
	){
		createGraduateSchoolEssayRedraftForm(
		    name:$name,
			phone:$phone,
			employment_most_relevant_to_you_masters_application:$employment_most_relevant_to_you_masters_application,
			typical_achievements:$typical_achievements,
			scholarships_and_award:$scholarships_and_award,
			undegraduate_level_courses_master:$undegraduate_level_courses_master,
			project_dissertation_name_master:$project_dissertation_name_master,
			most_recent_undergraduate:$most_recent_undergraduate,
			undergraduate_level_grade:$undergraduate_level_grade,
			result_ranking:$result_ranking,
			undegraduate_level_courses_phd:$undegraduate_level_courses_phd,
			project_dissertation_name_phd:$project_dissertation_name_phd,
			leadership_experience:$leadership_experience,
		    interpersonal_skills:$interpersonal_skills,
		    presentation_skills:$presentation_skills,
		    programming:$programming,
		    microsoft_excel:$microsoft_excel,
		    java:$java,
		    other_skills:$other_skills,
			extracurricular_activities:$extracurricular_activities,
			professional_workshops:$professional_workshops,
			academic_conferences_attended:$academic_conferences_attended,
			certificate:$certificate,
			english:$english,
			french:$french,
			german:$german,
			spanish:$spanish,
			nigeria_languages:$nigeria_languages,
			other_languages:$other_languages,
			masters_intended_area_of_research:$masters_intended_area_of_research,
			university_of_choice_and_course:$university_of_choice_and_course,
			modules_interested:$modules_interested,
			teaching_personel_contacted:$teaching_personel_contacted,
			summary_of_interest:$summary_of_interest,
			post_study_goal:$post_study_goal,
			referee:$referee,
			curriculum_vitae:$curriculum_vitae,
			package:$package
			has_expert:$has_expert
			form_id:$form_id
			status:$status
			completed:$completed
			) {
   name
  }
	}

`;

export const UPDATE_RESUME_REVIEW_FORM = gql`
    mutation UpdateResumeReviewForm(
    $id: ID!,
	$has_expert:String
	$status:String
	){
		updateResumeReviewForm(
			id:$id,
			has_expert:$has_expert
			status:$status
			){
			name
    
		}
	}
`;

export const UPDATE_COVER_LETTER_REVIEW_FORM = gql`
    mutation UpdateCoverLetterReviewForm(
    $id: ID!,
	$has_expert:String
	$status:String
	){
		updateCoverLetterReviewForm(
			id:$id,
			has_expert:$has_expert
			status:$status
			){
			name
    		
		}
	}
`;
export const UPDATE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM = gql`
    mutation UpdateGraduateSchoolStatementReviewForm(
    $id: ID!,
	$has_expert:String
	$status:String
	){
		updateGraduateSchoolStatementReviewForm(
			id:$id,
			has_expert:$has_expert
			status:$status
			){
			name
    
		}
	}
`;
export const UPDATE_COVER_LETTER_REDRAFT = gql`
    mutation UpdateCoverLetterRedraft(
    $id: ID!,
	$has_expert:String
	$status:String
	){
		updateCoverLetterRedraft(
			id:$id,
			has_expert:$has_expert
			status:$status
			){
			name
    
		}
	}
`;
export const UPDATE_GRADUATE_SCHOOL_ESSAY_REDRAFT = gql`
    mutation UpdateGraduateSchoolEssayRedraftForm(
    $id: ID!,
	$has_expert:String
	$status:String
	){
		updateGraduateSchoolEssayRedraftForm(
			id:$id,
			has_expert:$has_expert
			status:$status
			){
			name
    
		}
	}
`;

export const SEND_ATTACHMENT = gql`
    mutation UpdateGraduateSchoolEssayRedraftForm(
    $id: ID!,
	$has_expert:String
	$status:String
	){
		updateGraduateSchoolEssayRedraftForm(
			id:$id,
			has_expert:$has_expert
			status:$status
			){
			name
    
		}
	}
`;


export const ASSIGN_SELF_REQUEST = gql`
    mutation AssignRequest(
	$expert_id:String,
	$form_id:String,
	$package:String
	){
		assignRequest(
			expert_id:$expert_id
			form_id:$form_id
			package:$package
			){
			expert_id
		    form_id
		    package
		    created_at
		}
	}
`;






export const CREATE_MESSAGE = gql`
    mutation CreateMessages(
    $client_id:String!,
	$client_name:String!,
	$expert_id:String!,
	$expert_name:String!,
	$message_body:String,
	$attachment_ref:String,
	$attachment_name:String,
	$message_type:String,



	){
		createMessages(
		client_id:$client_id,
		client_name:$client_name,
		expert_id:$expert_id,
		expert_name:$expert_name,
		message_body:$message_body
		attachment_ref:$attachment_ref
		attachment_name:$attachment_name
		message_type:$message_type
		){

	    client_id
		client_name
		expert_id
		expert_name
		message_body
		attachment_ref
		attachment_name
		message_type
  }
	}
`;



export const MARK_COMPLETE_RESUME_REVIEW_FORM = gql`
    mutation MarkCompleteResumeReviewForm(
    $id: ID!,
	$completed:Boolean
	){
		markCompleteResumeReviewForm(
			id:$id,
			completed:$completed
			){
			name
		}
	}
`;

export const MARK_COMPLETE_COVER_LETTER_REVIEW_FORM = gql`
    mutation MarkCompleteCoverLetterReviewForm(
    $id: ID!,
	$completed:Boolean
	){
		markCompleteCoverLetterReviewForm(
			id:$id,
			completed:$completed
			){
			name
		}
	}
`;
export const MARK_COMPLETE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM = gql`
    mutation MarkCompleteGraduateSchoolStatementReviewForm(
    $id: ID!,
	$completed:Boolean
	){
		markCompleteGraduateSchoolStatementReviewForm(
			id:$id,
			completed:$completed
			){
			name
		}
	}
`;
export const MARK_COMPLETE_COVER_LETTER_REDRAFT = gql`
    mutation MarkCompleteCoverLetterRedraft(
    $id: ID!,
	$completed:Boolean
	){
		markCompleteCoverLetterRedraft(
			id:$id,
			completed:$completed
			){
			name
		}
	}
`;
export const MARK_COMPLETE_GRADUATE_SCHOOL_ESSAY_REDRAFT = gql`
    mutation MarkCompleteGraduateSchoolEssayRedraftForm(
    $id: ID!,
	$completed:Boolean
	){
		markCompleteGraduateSchoolEssayRedraftForm(
			id:$id,
			completed:$completed
			){
			name
		}
	}
`;

export const UPDATE_PASSWORD = gql`
    mutation UpdatePassword(
    $id: ID!,	
	$password:String!
	){
		updatePassword(
			id:$id,
			password:$password
			){
			first_name
		    last_name
		    phone
		    account_type
		    package
		}
	}
`;

export default class mutations extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div></div>
		);
	}
}
