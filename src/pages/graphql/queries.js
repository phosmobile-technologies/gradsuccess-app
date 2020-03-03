import React, { Component } from "react"
import gql from "graphql-tag"
import { PackageFields, AssociateFields, Messages } from "./fragments"

export const LOGGED_IN_USER = gql`
  {
    me {
      id
      first_name
      last_name
      phone
      email
      account_type
      id
      first_name
      last_name
      phone
      email
      account_type
      details {
        id
        highest_ranked_university_attended
        qualification_at_university
        employment
        scholarships_and_awards
        graduating_grade
        gre_score
        gmat_score
        ielts
        university_transcripts
        attached_file
        bio_bait
        where_client_from
        what_jobs_client
        client_reach_you_for
        profile_image_ref
        user_name
        bank_account_number
      }
      cover_letter_redrafts {
        ...coverLetterRedraftField
      }
      cover_letter_reviews {
        ...coverLetterReviewField
      }
      graduate_school_essay_redrafts {
        ...graduateSchoolEssayRedraftField
      }
      graduate_school_statement_review {
        ...graduateSchoolStatementReviewField
      }
      resume_reviews {
        ...resumeReviewField
      }
    }
  }
  ${PackageFields.cover_letter_redraft}
  ${PackageFields.cover_letter_review}
  ${PackageFields.graduate_school_essay_redrafts}
  ${PackageFields.graduate_school_statement_review}
  ${PackageFields.resume_reviews}
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      first_name
      last_name
      phone
      email
    }
  }
`

export const GET_EXPERT = gql`
  query GetExpert($id: ID!) {
    getExpert(id: $id) {
      id
      first_name
      last_name
      phone
      email
    }
  }
`
export const COMBINED_PACKAGE_QUERY_BY_STATUS = gql`
  query($status: PackageStatus!) {
    getCoverLetterReviewByStatus(status: $status) {
      ...coverLetterReviewField
    }
    getGraduateSchoolStatementReviewByStatus(status: $status) {
      ...graduateSchoolStatementReviewField
    }
    getCoverLetterRedraftByStatus(status: $status) {
      ...coverLetterRedraftField
    }
    getGraduateSchoolEssayRedraftByStatus(status: $status) {
      ...graduateSchoolEssayRedraftField
    }
    getResumeReviewByStatus(status: $status) {
      ...resumeReviewField
    }
  }
  ${PackageFields.cover_letter_redraft}
  ${PackageFields.cover_letter_review}
  ${PackageFields.graduate_school_essay_redrafts}
  ${PackageFields.graduate_school_statement_review}
  ${PackageFields.resume_reviews}
`

export const COMBINED_PACKAGE_QUERY_BY_STATUS_FOR_ASSOCIATE = gql`
  query($status: PackageStatus!, $associate_id: ID!) {
    getAssociateCoverLetterReviewByStatus(
      status: $status
      assigned_associate_id: $associate_id
    ) {
      ...coverLetterReviewField
    }
    getAssociateGraduateSchoolStatementReviewByStatus(
      status: $status
      assigned_associate_id: $associate_id
    ) {
      ...graduateSchoolStatementReviewField
    }
    getAssociateCoverLetterRedraftByStatus(
      status: $status
      assigned_associate_id: $associate_id
    ) {
      ...coverLetterRedraftField
    }
    getAssociateGraduateSchoolEssayRedraftByStatus(
      status: $status
      assigned_associate_id: $associate_id
    ) {
      ...graduateSchoolEssayRedraftField
    }
    getAssociateResumeReviewByStatus(
      status: $status
      assigned_associate_id: $associate_id
    ) {
      ...resumeReviewField
    }
  }
  ${PackageFields.cover_letter_redraft}
  ${PackageFields.cover_letter_review}
  ${PackageFields.graduate_school_essay_redrafts}
  ${PackageFields.graduate_school_statement_review}
  ${PackageFields.resume_reviews}
`
export const COMBINED_PACKAGE_QUERY_BY_ASSOCIATE_ID = gql`
  query($user_id: ID!) {
    getCoverLetterReviewByAssociateId(assigned_associate_id: $user_id) {
      ...coverLetterReviewField
    }
    getGraduateSchoolStatementReviewByAssociateId(
      assigned_associate_id: $user_id
    ) {
      ...graduateSchoolStatementReviewField
    }
    getCoverLetterRedraftByAssociateId(assigned_associate_id: $user_id) {
      ...coverLetterRedraftField
    }
    getGraduateSchoolEssayRedraftByAssociateId(
      assigned_associate_id: $user_id
    ) {
      ...graduateSchoolEssayRedraftField
    }
    getResumeReviewByAssociateId(assigned_associate_id: $user_id) {
      ...resumeReviewField
    }
  }
  ${PackageFields.cover_letter_redraft}
  ${PackageFields.cover_letter_review}
  ${PackageFields.graduate_school_essay_redrafts}
  ${PackageFields.graduate_school_statement_review}
  ${PackageFields.resume_reviews}
`

export const CHAT_HISTORY = gql`
  query($sender_id: ID!, $recipient_id: ID!) {
    getSeMessages(sender_id: $sender_id, recipient_id: $recipient_id) {
      ...MessageField
    }
    getReMessages(sender_id: $recipient_id, recipient_id: $sender_id) {
      ...MessageField
    }
  }
  ${Messages.message}
`

export const GET_ASSIGN_ASSOCIATE = gql`
  query getAsignAssociate($id: ID!) {
    getAsignAssociate(id: $id) {
      id
      first_name
      last_name
      email
    }
  }
`

export const FETCH_CLIENT_MESSAGES = gql`
  query GetClientMessages($client_id: String!) {
    getClientMessages(client_id: $client_id) {
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
`

export const GET_EXPERT_CLIENTS_COVER_LETTER_REVIEW = gql`
  query GetExpertClientsCoverLetterReview($has_expert: ID!) {
    getExpertClientsCoverLetterReview(has_expert: $has_expert) {
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
`
export const GET_EXPERT_CLIENTS_RESUME_REVIEW_FORM = gql`
  query GetExpertClientsResumeReviewForm($has_expert: ID!) {
    getExpertClientsResumeReviewForm(has_expert: $has_expert) {
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
`
export const GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM = gql`
  query GetExpertClientsGraduateSchoolStatementReviewForm($has_expert: ID!) {
    getExpertClientsGraduateSchoolStatementReviewForm(has_expert: $has_expert) {
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
`
export const GET_EXPERT_CLIENTS_COVER_LETTER_REDRAFT = gql`
  query GetExpertClientsCoverLetterRedraft($has_expert: ID!) {
    getExpertClientsCoverLetterRedraft(has_expert: $has_expert) {
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
`
export const GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM = gql`
  query GetExpertClientsGraduateSchoolEssayRedraftForm($has_expert: ID!) {
    getExpertClientsGraduateSchoolEssayRedraftForm(has_expert: $has_expert) {
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
`

export const GET_ALL_REQUEST = gql`
  query {
    getAssignRequest {
      expert_id
      form_id
      package
      created_at
    }
  }
`

export const GET_ASSIGN_REGUEST = gql`
  query GetAssignRequest($form_id: String!) {
    getAssignRequest(form_id: $form_id) {
      expert_id
      form_id
      package
      created_at
    }
  }
`

export const GET_APPLICATION_REVIEW = gql`
  query GetApplicationReview($form_id: String!) {
    applicationReview(form_id: $form_id) {
      expert_id
      form_id
      rating
      comment
    }
  }
`

export const BLOG_POSTS = gql`
  query {
    allMediumUser {
      edges {
        node {
          name
        }
      }
    }
  }
`

export const GET_EXPERT_DETAIL = gql`
  query GetExpertDetail($expert_id: ID!) {
    getExpertDetail(expert_id: $expert_id) {
      id
      expert_id
      highest_ranked_university_attended
      qualification_at_university
      employment
      scholarships_and_awards
      graduating_grade
      gre_score
      gmat_score
      ielts
      university_transcripts
      curriculum_vitae
      bio_bait
      where_client_from
      what_jobs_client
      client_reach_you_for
      profile_image_ref
      user_name
      bank_account_number
      bank_name
    }
  }
`

export const SINGLE_EXPERT_DETAIL_BAIT = gql`
  query GetExpertDetail($expert_id: ID!) {
    getExpertDetail(expert_id: $expert_id) {
      id
      expert_id
      bio_bait
      profile_image_ref
      user_name
    }
  }
`

export const ALL_ASSOCIATES = gql`
  query GetAllAssociates($account_type: String!) {
    getAllAssociates(account_type: $account_type) {
      ...associateField
    }
  }
  ${AssociateFields.associate}
`
export const ASSOCIATE = gql`
  query getAssociate($id: ID!) {
    getAssociate(id: $id) {
      ...associateField
    }
  }
  ${AssociateFields.associate}
`

export const GET_EXPERT_DETAIL_BAIT = gql`
  {
    allExpertDetail {
      id
      expert_id
      bio_bait
      profile_image_ref
      user_name
    }
  }
`
export const CHATLISTMEMBER = gql`
         query getChatListMember($id: ID!) {
           getChatListMember(id: $id) {
             ...UserFullField
           }
         }
         ${AssociateFields.user_full}
       `

       
export const ASSOCIATE_RATING = gql`
         query associateRating($associate_id: ID!) {
           associateRating(associate_id: $associate_id) {
             rating
           }
         }
       `
export default class Queries extends Component {
  render() {
    return <div></div>
  }
}
