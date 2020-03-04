import React, { Component } from "react"
import gql from "graphql-tag"

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { username: $email, password: $password }) {
      access_token
      user {
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
      }
    }
  }
`

export const LOGOUT = gql`
  mutation {
    logout {
      message
    }
  }
`

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(data: { email: $email }) {
      message
    }
  }
`

export const UPDATE_FORGOTTEN_PASSWORD = gql`
  mutation UpdateForgottenPassword(
    $email: String!
    $token: String!
    $password: String!
    $password_confirmation: String!
  ) {
    updateForgottenPassword(
      data: {
        email: $email
        token: $token
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
      message
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser(
    $first_name: String!
    $last_name: String!
    $phone: String!
    $email: String!
    $password: String!
    $account_type: String!
  ) {
    CreateUser(
      input: {
        first_name: $first_name
        last_name: $last_name
        phone: $phone
        email: $email
        password: $password
        account_type: $account_type
      }
    ) {
      id
      first_name
      last_name
      phone
      email
      account_type
    }
  }
`

export const CREATE_ASSOCIATE_PROFILE = gql`
  mutation CreateAssociateDetail(
    $highest_ranked_university_attended: String
    $qualification_at_university: String
    $employment: String
    $scholarships_and_awards: String
    $graduating_grade: String
    $gre_score: String
    $gmat_score: String
    $ielts: String
    $university_transcripts: String
    $attached_file: String
    $bio_bait: String!
    $where_client_from: String
    $what_jobs_client: String
    $client_reach_you_for: String
    $profile_image_ref: String
    $user_name: String
    $bank_account_number: String
    $bank_name: String
    $user_id: ID!
  ) {
    CreateAssociateDetail(
      input: {
        highest_ranked_university_attended: $highest_ranked_university_attended
        qualification_at_university: $qualification_at_university
        employment: $employment
        scholarships_and_awards: $scholarships_and_awards
        graduating_grade: $graduating_grade
        gre_score: $gre_score
        gmat_score: $gmat_score
        ielts: $ielts
        university_transcripts: $university_transcripts
        attached_file: $attached_file
        bio_bait: $bio_bait
        where_client_from: $where_client_from
        what_jobs_client: $what_jobs_client
        client_reach_you_for: $client_reach_you_for
        profile_image_ref: $profile_image_ref
        user_name: $user_name
        bank_account_number: $bank_account_number
        bank_name: $bank_name
        user_id: $user_id
      }
    ) {
      id
    }
  }
`

export const UPDATE_ASSOCIATE_PROFILE = gql`
  mutation UpdateAssociateDetail(
    $id: ID!
    $highest_ranked_university_attended: String
    $qualification_at_university: String
    $employment: String
    $scholarships_and_awards: String
    $graduating_grade: String
    $gre_score: String
    $gmat_score: String
    $ielts: String
    $university_transcripts: String
    $attached_file: String
    $bio_bait: String
    $where_client_from: String
    $what_jobs_client: String
    $client_reach_you_for: String
    $profile_image_ref: String
    $user_name: String
    $bank_account_number: String
    $bank_name: String
  ) {
    UpdateAssociateDetail(
      input: {
        id: $id
        highest_ranked_university_attended: $highest_ranked_university_attended
        qualification_at_university: $qualification_at_university
        employment: $employment
        scholarships_and_awards: $scholarships_and_awards
        graduating_grade: $graduating_grade
        gre_score: $gre_score
        gmat_score: $gmat_score
        ielts: $ielts
        university_transcripts: $university_transcripts
        attached_file: $attached_file
        bio_bait: $bio_bait
        where_client_from: $where_client_from
        what_jobs_client: $what_jobs_client
        client_reach_you_for: $client_reach_you_for
        profile_image_ref: $profile_image_ref
        user_name: $user_name
        bank_account_number: $bank_account_number
        bank_name: $bank_name
      }
    ) {
      id
    }
  }
`

export const UPDATE_ASSOCIATE_PROFILE_IMAGE = gql`
  mutation UpdateAssociateDetail($id: ID!, $profile_image_ref: String) {
    UpdateAssociateDetail(
      input: { id: $id, profile_image_ref: $profile_image_ref }
    ) {
      id
      profile_image_ref
    }
  }
`

export const REVIEW_PACKAGE = gql`
  mutation ReviewPackage(
    $associate_id: ID!
    $user_id: ID!
    $rating: String!
    $comment: String
  ) {
    ReviewPackage(
      input: {
        associate_id: $associate_id
        user_id: $user_id
        rating: $rating
        comment: $comment
      }
    ) {
      id
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $first_name: String!
    $last_name: String!
    $phone: String!
    $email: String!
  ) {
    UpdateUser(
      input: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        phone: $phone
        email: $email
      }
    ) {
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
    }
  }
`

export const CREATE_PACKAGE = gql`
  mutation CreatePackage(
    $package_name: String!
    $turn_around_time: TurnAroundTime!
    $amount: Float!
    $form_type: FormType!
  ) {
    CreatePackage(
      input: {
        package_name: $package_name
        turn_around_time: $turn_around_time
        amount: $amount
        form_type: $form_type
      }
    ) {
      id
      package_name
      turn_around_time
      amount
    }
  }
`

export const CREATE_GRADUATE_SCHOOL_STATEMENT_REVIEW = gql`
  mutation CreateGraduateSchoolStatementReview(
    $name: String!
    $university_and_course_applied_for: String!
    $summary_of_interest: String!
    $attached_file: String
    $package_id: ID!
    $assigned_associate_id: ID
    $user_id: ID!
    $status: PackageStatus!
  ) {
    CreateGraduateSchoolStatementReview(
      input: {
        name: $name
        university_and_course_applied_for: $university_and_course_applied_for
        summary_of_interest: $summary_of_interest
        attached_file: $attached_file
        package_id: $package_id
        assigned_associate_id: $assigned_associate_id
        user_id: $user_id
        status: $status
      }
    ) {
      id
    }
  }
`

export const CREATE_RESUME_REVIEW = gql`
  mutation CreateResumeReview(
    $name: String!
    $industry_applied_for: String!
    $summary_of_interest: String!
    $attached_file: String
    $assigned_associate_id: ID
    $user_id: ID!
    $package_id: ID!
    $status: PackageStatus!
  ) {
    CreateResumeReview(
      input: {
        name: $name
        industry_applied_for: $industry_applied_for
        summary_of_interest: $summary_of_interest
        attached_file: $attached_file
        assigned_associate_id: $assigned_associate_id
        user_id: $user_id
        package_id: $package_id
        status: $status
      }
    ) {
      id
    }
  }
`

export const CREATE_COVER_LETTTER_REVIEW = gql`
  mutation CreateCoverLetterReview(
    $name: String!
    $industry_applied_for: String!
    $summary_of_interest: String!
    $attached_file: String
    $assigned_associate_id: ID
    $user_id: ID!
    $package_id: ID!
    $status: PackageStatus!
  ) {
    CreateCoverLetterReview(
      input: {
        name: $name
        industry_applied_for: $industry_applied_for
        summary_of_interest: $summary_of_interest
        attached_file: $attached_file
        assigned_associate_id: $assigned_associate_id
        user_id: $user_id
        package_id: $package_id
        status: $status
      }
    ) {
      id
    }
  }
`

export const CREATE_COVER_LETTER_REDRAFT = gql`
  mutation CreateCoverLetterRedraft(
    $name: String!
    $address: String!
    $phone: String!
    $workplace_1: String!
    $workplace_1_roles: String
    $workplace_1_recognized_job: String
    $workplace_2: String
    $workplace_2_roles: String
    $workplace_2_recognized_job: String!
    $supervised_before: String!
    $supervised_workplace: String!
    $recent_tertiary_institute: String!
    $number_of_employee_supervised_workplace_1: Int
    $number_of_employee_supervised_workplace_2: Int
    $recent_tertiary_institute_name: String!
    $scholarship_and_awards: String!
    $final_grade_school_1: Float!
    $result_rank_school_1: String!
    $top_courses_school_1: String!
    $project_dissertation_name_school_1: String!
    $next_most_recent_tertiary_education: String!
    $final_grade_school_2: Float!
    $result_rank_school_2: String!
    $top_courses_school_2: String!
    $leadership_experience: String!
    $interpersonal_skills: Boolean!
    $presentation_skills: Boolean!
    $programming: Boolean!
    $microsoft_excel: Boolean!
    $java: Boolean!
    $other_skills: String
    $extracurricular_activities: String!
    $professional_workshops: String!
    $certification_dates: String!
    $organization_contacted_before_hand: String!
    $summary_of_interest: String
    $attached_file: String
    $assigned_associate_id: ID
    $user_id: ID!
    $package_id: ID!
    $status: PackageStatus!
  ) {
    CreateCoverLetterRedraft(
      input: {
        name: $name
        address: $address
        phone: $phone
        workplace_1: $workplace_1
        workplace_1_roles: $workplace_1_roles
        workplace_1_recognized_job: $workplace_1_recognized_job
        workplace_2: $workplace_2
        workplace_2_roles: $workplace_2_roles
        workplace_2_recognized_job: $workplace_2_recognized_job
        supervised_before: $supervised_before
        supervised_workplace: $supervised_workplace
        recent_tertiary_institute: $recent_tertiary_institute
        number_of_employee_supervised_workplace_1: $number_of_employee_supervised_workplace_1
        number_of_employee_supervised_workplace_2: $number_of_employee_supervised_workplace_2
        recent_tertiary_institute_name: $recent_tertiary_institute_name
        scholarship_and_awards: $scholarship_and_awards
        final_grade_school_1: $final_grade_school_1
        result_rank_school_1: $result_rank_school_1
        top_courses_school_1: $top_courses_school_1
        project_dissertation_name_school_1: $project_dissertation_name_school_1
        next_most_recent_tertiary_education: $next_most_recent_tertiary_education
        final_grade_school_2: $final_grade_school_2
        result_rank_school_2: $result_rank_school_2
        top_courses_school_2: $top_courses_school_2
        leadership_experience: $leadership_experience
        interpersonal_skills: $interpersonal_skills
        presentation_skills: $presentation_skills
        programming: $programming
        microsoft_excel: $microsoft_excel
        java: $java
        other_skills: $other_skills
        extracurricular_activities: $extracurricular_activities
        professional_workshops: $professional_workshops
        certification_dates: $certification_dates
        organization_contacted_before_hand: $organization_contacted_before_hand
        summary_of_interest: $summary_of_interest
        attached_file: $attached_file
        assigned_associate_id: $assigned_associate_id
        user_id: $user_id
        package_id: $package_id
        status: $status
      }
    ) {
      id
    }
  }
`

export const CREATE_GRADUATE_SCHOOL_ESSAY_REDRAFT = gql`
  mutation CreateGraduateSchoolEssayRedraft(
    $name: String!
    $phone: String!
    $employment_most_relevant_to_you_masters_application: String!
    $typical_achievements: String!
    $scholarships_and_award: String!
    $undergraduate_level_courses_master: String!
    $project_dissertation_name_master: String!
    $most_recent_undergraduate: String!
    $undergraduate_level_grade: String!
    $result_ranking: String!
    $undergraduate_level_courses_phd: String!
    $project_dissertation_name_phd: String!
    $leadership_experience: String!
    $interpersonal_skills: Boolean!
    $presentation_skills: Boolean!
    $programming: Boolean!
    $microsoft_excel: Boolean!
    $java: Boolean!
    $other_skills: String!
    $extracurricular_activities: String!
    $professional_workshops: String!
    $academic_conferences_attended: String!
    $certificate: String!
    $english: Boolean!
    $french: Boolean!
    $german: Boolean!
    $spanish: Boolean!
    $nigeria_languages: Boolean!
    $other_languages: String!
    $masters_intended_area_of_research: String!
    $university_of_choice_and_course: String!
    $modules_interested: String!
    $teaching_personnel_contacted: String!
    $summary_of_interest: String!
    $post_study_goal: String!
    $referee: String!
    $attached_file: String
    $assigned_associate_id: ID
    $user_id: ID!
    $package_id: ID!
    $status: PackageStatus!
  ) {
    CreateGraduateSchoolEssayRedraft(
      input: {
        name: $name
        phone: $phone
        employment_most_relevant_to_you_masters_application: $employment_most_relevant_to_you_masters_application
        typical_achievements: $typical_achievements
        scholarships_and_award: $scholarships_and_award
        undergraduate_level_courses_master: $undergraduate_level_courses_master
        project_dissertation_name_master: $project_dissertation_name_master
        most_recent_undergraduate: $most_recent_undergraduate
        undergraduate_level_grade: $undergraduate_level_grade
        result_ranking: $result_ranking
        undergraduate_level_courses_phd: $undergraduate_level_courses_phd
        project_dissertation_name_phd: $project_dissertation_name_phd
        leadership_experience: $leadership_experience
        interpersonal_skills: $interpersonal_skills
        presentation_skills: $presentation_skills
        programming: $programming
        microsoft_excel: $microsoft_excel
        java: $java
        other_skills: $other_skills
        extracurricular_activities: $extracurricular_activities
        professional_workshops: $professional_workshops
        academic_conferences_attended: $academic_conferences_attended
        certificate: $certificate
        english: $english
        french: $french
        german: $german
        spanish: $spanish
        nigeria_languages: $nigeria_languages
        other_languages: $other_languages
        masters_intended_area_of_research: $masters_intended_area_of_research
        university_of_choice_and_course: $university_of_choice_and_course
        modules_interested: $modules_interested
        teaching_personnel_contacted: $teaching_personnel_contacted
        summary_of_interest: $summary_of_interest
        post_study_goal: $post_study_goal
        referee: $referee
        attached_file: $attached_file
        assigned_associate_id: $assigned_associate_id
        user_id: $user_id
        package_id: $package_id
        status: $status
      }
    ) {
      id
    }
  }
`

// mutations to assign self an application

export const ASSIGN_SELF_RESUME_REVIEW = gql`
  mutation AssignSelfResumeReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignSelfResumeReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const ASSIGN_SELF_COVER_LETTER_REVIEW = gql`
  mutation AssignSelfCoverLetterReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignSelfCoverLetterReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const ASSIGN_SELF_COVER_LETTER_REDRAFT = gql`
  mutation AssignSelfCoverLetterRedraft(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignSelfCoverLetterRedraft(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const ASSIGN_SELF_GRADUATE_SCHOOL_STATEMENT_REVIEW = gql`
  mutation AssignSelfGraduateSchoolStatementReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignSelfGraduateSchoolStatementReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const ASSIGN_SELF_GRADUATE_SCHOOL_ESSAY_REDRAFT = gql`
  mutation AssignSelfGraduateSchoolEssayRedraft(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignSelfGraduateSchoolEssayRedraft(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

// mutation to for admin to assign an associate a package

export const ASSIGN_ASSOCIATE_RESUME_REVIEW = gql`
  mutation AssignAssociateResumeReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignAssociateResumeReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const ASSIGN_ASSOCIATE_COVER_LETTER_REVIEW = gql`
  mutation AssignAssociateCoverLetterReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignAssociateCoverLetterReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const ASSIGN_ASSOCIATE_COVER_LETTER_REDRAFT = gql`
  mutation AssignAssociateCoverLetterRedraft(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignAssociateCoverLetterRedraft(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const ASSIGN_ASSOCIATE_GRADUATE_SCHOOL_STATEMENT_REVIEW = gql`
  mutation AssignAssociateGraduateSchoolStatementReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignAssociateGraduateSchoolStatementReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const ASSIGN_ASSOCIATE_GRADUATE_SCHOOL_ESSAY_REDRAFT = gql`
  mutation AssignAssociateGraduateSchoolEssayRedraft(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    AssignAssociateGraduateSchoolEssayRedraft(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

// mutation to for admin to APPROVE an associate a package

export const APPROVE_RESUME_REVIEW = gql`
  mutation ApproveResumeReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    ApproveResumeReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const APPROVE_COVER_LETTER_REVIEW = gql`
  mutation ApproveCoverLetterReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    ApproveCoverLetterReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const APPROVE_COVER_LETTER_REDRAFT = gql`
  mutation ApproveCoverLetterRedraft(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    ApproveCoverLetterRedraft(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const APPROVE_GRADUATE_SCHOOL_STATEMENT_REVIEW = gql`
  mutation ApproveGraduateSchoolStatementReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    ApproveGraduateSchoolStatementReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const APPROVE_GRADUATE_SCHOOL_ESSAY_REDRAFT = gql`
  mutation ApproveGraduateSchoolEssayRedraft(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    ApproveGraduateSchoolEssayRedraft(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

// mutation to for admin to DECLINE an associate a package

export const DECLINE_RESUME_REVIEW = gql`
  mutation DeclineResumeReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    DeclineResumeReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const DECLINE_COVER_LETTER_REVIEW = gql`
  mutation DeclineCoverLetterReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    DeclineCoverLetterReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const DECLINE_COVER_LETTER_REDRAFT = gql`
  mutation DeclineCoverLetterRedraft(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    DeclineCoverLetterRedraft(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const DECLINE_GRADUATE_SCHOOL_STATEMENT_REVIEW = gql`
  mutation DeclineGraduateSchoolStatementReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    DeclineGraduateSchoolStatementReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const DECLINE_GRADUATE_SCHOOL_ESSAY_REDRAFT = gql`
  mutation DeclineGraduateSchoolEssayRedraft(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    DeclineGraduateSchoolEssayRedraft(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

// mutation to for client to review packages

export const MARK_RESUME_REVIEW_COMPLETED = gql`
  mutation ApproveResumeReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    ApproveResumeReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const MARK_COVER_LETTER_REVIEW_COMPLETED = gql`
  mutation MarkAssociateCoverLetterReviewCompleted(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    MarkAssociateCoverLetterReviewCompleted(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const MARK_GRADUATE_SCHOOL_ESSAY_REDRAFT_COMPLETED = gql`
  mutation ApproveCoverLetterRedraft(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    ApproveCoverLetterRedraft(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const MARK_GRADUATE_SCHOOL_STATEMENT_REVIEW_COMPLETED = gql`
  mutation ApproveGraduateSchoolStatementReview(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    ApproveGraduateSchoolStatementReview(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const MARK_COVER_LETTER_REDRAFT_COMPLETED = gql`
  mutation MarkAssociateCoverLetterRedraftCompleted(
    $id: ID!
    $associate_id: ID!
    $status: PackageStatus!
  ) {
    MarkAssociateCoverLetterRedraftCompleted(
      input: { id: $id, associate_id: $associate_id, status: $status }
    ) {
      id
    }
  }
`

export const SEND_ATTACHMENT = gql`
  mutation UpdateGraduateSchoolEssayRedraftForm(
    $id: ID!
    $assigned_associate: String
    $status: String
  ) {
    updateGraduateSchoolEssayRedraftForm(
      id: $id
      assigned_associate: $assigned_associate
      status: $status
    ) {
      user_id
    }
  }
`

export const ASSIGN_SELF_REQUEST = gql`
  mutation AssignRequest(
    $expert_id: String
    $user_id: String
    $package_id: String
  ) {
    assignRequest(
      expert_id: $expert_id
      user_id: $user_id
      package_id: $package_id
    ) {
      expert_id
      user_id
      package
      created_at
    }
  }
`

export const MARK_COMPLETE_RESUME_REVIEW_FORM = gql`
  mutation MarkCompleteResumeReviewForm($id: ID!, $completed: Boolean) {
    markCompleteResumeReviewForm(id: $id, completed: $completed) {
      name
    }
  }
`

export const MARK_COMPLETE_COVER_LETTER_REVIEW_FORM = gql`
  mutation MarkCompleteCoverLetterReviewForm($id: ID!, $completed: Boolean) {
    markCompleteCoverLetterReviewForm(id: $id, completed: $completed) {
      name
    }
  }
`
export const MARK_COMPLETE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM = gql`
  mutation MarkCompleteGraduateSchoolStatementReviewForm(
    $id: ID!
    $completed: Boolean
  ) {
    markCompleteGraduateSchoolStatementReviewForm(
      id: $id
      completed: $completed
    ) {
      name
    }
  }
`
export const MARK_COMPLETE_COVER_LETTER_REDRAFT = gql`
  mutation MarkCompleteCoverLetterRedraft($id: ID!, $completed: Boolean) {
    markCompleteCoverLetterRedraft(id: $id, completed: $completed) {
      name
    }
  }
`
export const MARK_COMPLETE_GRADUATE_SCHOOL_ESSAY_REDRAFT = gql`
  mutation MarkCompleteGraduateSchoolEssayRedraftForm(
    $id: ID!
    $completed: Boolean
  ) {
    markCompleteGraduateSchoolEssayRedraftForm(id: $id, completed: $completed) {
      name
    }
  }
`

export const UPDATE_PASSWORD = gql`
  mutation UpdateUserPassword($id: ID!, $password: String!) {
    UpdateUserPassword(id: $id, password: $password) {
      id
    }
  }
`
export const SAVE_MESSAGE = gql`
  mutation CreateMessages(
    $sender_id: ID!
    $recipient_id: ID!
    $message: String
    $attached_file: String
    $attached_file_type: MessageType!
    $attached_file_name: String
  ) {
    CreateMessage(
      input: {
        sender_id: $sender_id
        recipient_id: $recipient_id
        message: $message
        attached_file: $attached_file
        attached_file_type: $attached_file_type
        attached_file_name: $attached_file_name
      }
    ) {
      sender_id
      recipient_id
      message
      attached_file
      attached_file_name
      attached_file_type
      created_at
    }
  }
`

export default class Mutations extends Component {
  render() {
    return <div></div>
  }
}
