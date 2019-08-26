import gql from 'graphql-tag';
import React from 'react';

export default class queries extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}


export const LOGGED_IN_USER = gql`
  {
    me{
      id
      first_name
      last_name
      phone
      form_id
      package
      email
      account_type
  	}
  }
`;

export const GET_USER = gql`
              query GetUser($id: ID!) {
                user(id: $id) {
                  id
                  first_name
                  last_name
                  phone
                  form_id
                  package
                  email
                  account_type
                }
              }
            `;

export const GET_EXPERT = gql`
  query GetExpert($id: ID!){
  getExpert(id:$id){
    id
    first_name
    last_name
    phone
    email
  }
}
`;

export const COVER_LETTER_REVIEW_FORM = gql`
              query GetCoverLetterReviewForm($form_id: String!) {
                getCoverLetterReview(form_id: $form_id) {
                  id
                  name
                  industry_applied_for
                  summary_of_interest
                  curriculum_vitae 
                  package
                  has_expert
                  form_id
                  status
                  completed
                  created_at
                }
              }
            `;

export const RESUME_REVIEW_FORM = gql`
              query GetResumeReviewForm($form_id: String!) {
                getResumeReviewForm(form_id: $form_id) {
                  id
                  name
                  industry_applied_for  
                  summary_of_interest
                  curriculum_vitae 
                  package 
                  has_expert  
                  form_id
                  status
                  completed
                  created_at
                }
              }
            `;

export const GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM = gql`
  query GetGraduateSchoolStatementReviewForm($form_id: String!) {
    getGraduateSchoolStatementReviewForm(form_id: $form_id) {
        id
        name
        university_and_course_applied_for
        summary_of_interest
        curriculum_vitae 
        package
        has_expert
        form_id
        status
        completed
        created_at
    }
  }
`;

export const GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM = gql`
              query GetGraduateSchoolEssayRedraftForm($form_id: String!) {
                getGraduateSchoolEssayRedraftForm(form_id: $form_id) {
                    id
                    name 
                    phone 
                    employment_most_relevant_to_you_masters_application 
                    typical_achievements
                    scholarships_and_award
                    undegraduate_level_courses_master 
                    project_dissertation_name_master 
                    most_recent_undergraduate 
                    undergraduate_level_grade 
                    result_ranking
                    undegraduate_level_courses_phd 
                    project_dissertation_name_phd 
                    leadership_experience 
                    interpersonal_skills
                    presentation_skills
                    programming
                    microsoft_excel
                    java
                    other_skills
                    extracurricular_activities
                    professional_workshops
                    academic_conferences_attended
                    certificate
                    english
                    french
                    german
                    spanish
                    nigeria_languages
                    other_languages
                    masters_intended_area_of_research 
                    university_of_choice_and_course
                    modules_interested 
                    teaching_personel_contacted 
                    summary_of_interest
                    post_study_goal 
                    referee 
                    curriculum_vitae 
                    package
                    has_expert 
                    form_id
                    status
                    completed 
                    created_at
                }
              }
            `;

export const COVER_LETTER_REDRAFT = gql`
  query GetCoverLetterRedraft($form_id: String!) {
    getCoverLetterRedraft(form_id: $form_id) {
        id
        name 
        address 
        phone 
        workplace_1 
        workplace_1_roles 
        workplace_1_recognized_job
        workplace_2
        workplace_2_roles 
        workplace_2_recognized_job 
        supervised_before 
        supervised_workplace 
        recent_tertiary_institute 
        number_of_employee_supervised_workplace_1 
        number_of_employee_supervised_workplace_2
        recent_tertiary_institute_name 
        scholarship_and_awards 
        final_grade_school_1 
        result_rank_school_1 
        top_courses_school_1 
        project_dissertation_name_school_1 
        next_most_recent_tertiary_education 
        final_grade_school_2  
        result_rank_school_2
        top_courses_school_2 
        leadership_experience 
        interpersonal_skills 
        presentation_skills  
        programming 
        microsoft_excel  
        java  
        other_skills 
        extracurricular_activities
        professional_workshops 
        certification_dates 
        organization_contacted_before_hand 
        summary_of_interest 
        curriculum_vitae 
        package 
        has_expert 
        form_id
        status
        completed 
        created_at
    }
  }
`;



export const GET_ALL_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORMS = gql`
 query{
    getAllGraduateSchoolStatementReviewForm{
      id
      name 
      university_and_course_applied_for
      summary_of_interest
      curriculum_vitae 
      created_at
      package
      has_expert
      form_id
      status
      completed
      created_at
      
    }
  }
`;


export const GET_ALL_COVER_LETTER_REVIEW_FORMS = gql`
  query{
    getAllCoverLetterReview{
      id
      name 
      industry_applied_for
      summary_of_interest
      curriculum_vitae 
      package
      has_expert
      form_id
      status
      completed
      created_at
    }
  }
`;

export const GET_ALL_RESUMME_REVIEW_FORMS = gql`
  query{
    getAllResumeReviewForm{
      id
      name
      industry_applied_for
      summary_of_interest
      curriculum_vitae 
      package
      has_expert
      form_id
      status
      completed
      created_at
    }
  }
`;
export const GET_ALL_COVER_LETTER_REDRAFT_FORMS = gql`
  query{
    getAllCoverLetterRedraft{
      id
      name
      address
      phone
      workplace_1
      workplace_1_roles
      workplace_1_recognized_job
      workplace_2
      workplace_2_roles
      workplace_2_recognized_job
      supervised_before
      supervised_workplace
      recent_tertiary_institute
      number_of_employee_supervised_workplace_1
      number_of_employee_supervised_workplace_2
      recent_tertiary_institute_name
      scholarship_and_awards
      final_grade_school_1
      result_rank_school_1
      top_courses_school_1
      project_dissertation_name_school_1
      next_most_recent_tertiary_education
      final_grade_school_2
      result_rank_school_2
      top_courses_school_2
      leadership_experience
      interpersonal_skills
      presentation_skills
      programming
      microsoft_excel
      java
      other_skills
      extracurricular_activities
      professional_workshops
      certification_dates
      organization_contacted_before_hand
      summary_of_interest
      curriculum_vitae
      package
      has_expert
      form_id
      status
      completed
      created_at
    }
  }
`;
export const GET_ALL_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORMS = gql`
  query{
    getAllGraduateSchoolEssayRedraftForm{
      id
      name
      phone
      employment_most_relevant_to_you_masters_application
      typical_achievements
      scholarships_and_award
      undegraduate_level_courses_master
      project_dissertation_name_master
      most_recent_undergraduate
      undergraduate_level_grade
      result_ranking
      undegraduate_level_courses_phd
      project_dissertation_name_phd
      leadership_experience
      interpersonal_skills
      presentation_skills
      programming
      microsoft_excel
      java
      other_skills
      extracurricular_activities
      professional_workshops
      academic_conferences_attended
      certificate
      english
      french
      german
      spanish
      nigeria_languages
      other_languages
      masters_intended_area_of_research
      university_of_choice_and_course
      modules_interested
      teaching_personel_contacted
      summary_of_interest
      post_study_goal
      referee
      curriculum_vitae
      package
      has_expert
      form_id
      status
      completed
      created_at
    }
  }

`;

export const GET_ALL_EXPERTS = gql`
  query GetExperts($account_type: String!) {
    getExperts(account_type: $account_type) {
      id
      first_name
      last_name
      phone
      form_id
      package
      email
      account_type
    }
  }
`;

export const GET_EXPERT_IN_CHARGE = gql`
  query GetExpertInCharge($id: ID!) {
      getExpertInCharge(id:$id){
        id
        first_name
        last_name
        email
      }
  }
`;


export const FETCH_CLIENT_MESSAGES = gql`
  query GetClientMessages($client_id: String!) {
    getClientMessages(client_id:$client_id){
      id
      client_id
      client_name
      expert_id
      expert_name
      message_body
      attachment_ref
      attachment_name
      message_type
      created_at
  }
  }
`;

export const GET_EXPERT_CLIENTS_COVER_LETTER_REVIEW = gql`
  query GetExpertClientsCoverLetterReview($has_expert: ID!) {
      getExpertClientsCoverLetterReview(has_expert:$has_expert){
      id
      name 
      industry_applied_for
      summary_of_interest
      curriculum_vitae 
      package
      has_expert
      form_id
      status
      completed
      created_at
  }
  }
`;
export const GET_EXPERT_CLIENTS_RESUME_REVIEW_FORM= gql`
  query GetExpertClientsResumeReviewForm($has_expert: ID!) {
      getExpertClientsResumeReviewForm(has_expert:$has_expert){
      id
      name 
      industry_applied_for
      summary_of_interest
      curriculum_vitae 
      package
      has_expert
      form_id
      status
      completed
      created_at
  }
  }
`;
export const GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM= gql`
  query GetExpertClientsGraduateSchoolStatementReviewForm($has_expert: ID!) {
      getExpertClientsGraduateSchoolStatementReviewForm(has_expert:$has_expert){
      id
      name 
      university_and_course_applied_for
      summary_of_interest
      curriculum_vitae 
      created_at
      package
      has_expert
      form_id
      status
      completed
      created_at
  }
  }
`;
export const GET_EXPERT_CLIENTS_COVER_LETTER_REDRAFT= gql`
  query GetExpertClientsCoverLetterRedraft($has_expert: ID!) {
      getExpertClientsCoverLetterRedraft(has_expert:$has_expert){
        id
        name
        address
        phone
        workplace_1
        workplace_1_roles
        workplace_1_recognized_job
        workplace_2
        workplace_2_roles
        workplace_2_recognized_job
        supervised_before
        supervised_workplace
        recent_tertiary_institute
        number_of_employee_supervised_workplace_1
        number_of_employee_supervised_workplace_2
        recent_tertiary_institute_name
        scholarship_and_awards
        final_grade_school_1
        result_rank_school_1
        top_courses_school_1
        project_dissertation_name_school_1
        next_most_recent_tertiary_education
        final_grade_school_2
        result_rank_school_2
        top_courses_school_2
        leadership_experience
        interpersonal_skills
        presentation_skills
        programming
        microsoft_excel
        java
        other_skills
        extracurricular_activities
        professional_workshops
        certification_dates
        organization_contacted_before_hand
        summary_of_interest
        curriculum_vitae
        package
        has_expert
        form_id
        status
        completed
        created_at
      }
  }
`;
export const GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM= gql`
  query GetExpertClientsGraduateSchoolEssayRedraftForm($has_expert: ID!) {
     getExpertClientsGraduateSchoolEssayRedraftForm(has_expert:$has_expert){
      id
      name
      phone
      employment_most_relevant_to_you_masters_application
      typical_achievements
      scholarships_and_award
      undegraduate_level_courses_master
      project_dissertation_name_master
      most_recent_undergraduate
      undergraduate_level_grade
      result_ranking
      undegraduate_level_courses_phd
      project_dissertation_name_phd
      leadership_experience
      interpersonal_skills
      presentation_skills
      programming
      microsoft_excel
      java
      other_skills
      extracurricular_activities
      professional_workshops
      academic_conferences_attended
      certificate
      english
      french
      german
      spanish
      nigeria_languages
      other_languages
      masters_intended_area_of_research
      university_of_choice_and_course
      modules_interested
      teaching_personel_contacted
      summary_of_interest
      post_study_goal
      referee
      curriculum_vitae
      package
      has_expert
      form_id
      status
      completed
      created_at
  } 
  }
`;


export const GET_ALL_REQUEST = gql`
  query{
    getAssignRequest{
     expert_id
  form_id
  package
  created_at
    }
  }
`;

export const GET_ASSIGN_REGUEST = gql`
  query GetAssignRequest($form_id: String!) {
    getAssignRequest(form_id:$form_id){
      expert_id
      form_id
      package
      created_at
  }
  }
`;

export const GET_APPLICATION_REVIEW = gql`
  query GetApplicationReview($form_id: String!) {
  applicationReview(form_id:$form_id){
    expert_id
    form_id
    rating
    comment
    
  }
}
`;



