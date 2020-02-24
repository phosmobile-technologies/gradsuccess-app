import gql from "graphql-tag"
import React, { Component } from "react"

export const PackageFields = {
  cover_letter_redraft: gql`
    fragment coverLetterRedraftField on CoverLetterRedraft {
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
      attached_file
      assigned_associate_id
      user_id
      package_id
      package {
        id
        package_name
        turn_around_time
        amount
        form_type
        created_at
        updated_at
      }
      status
      created_at
      updated_at
    }
  `,
  cover_letter_review: gql`
    fragment coverLetterReviewField on CoverLetterReview {
      id
      name
      industry_applied_for
      summary_of_interest
      attached_file
      assigned_associate_id
      user_id
      package_id
      package {
        id
        package_name
        turn_around_time
        amount
        form_type
        created_at
        updated_at
      }
      status
      created_at
      updated_at
    }
  `,
  graduate_school_essay_redrafts: gql`
    fragment graduateSchoolEssayRedraftField on GraduateSchoolEssayRedraft {
      id
      name
      phone
      employment_most_relevant_to_you_masters_application
      typical_achievements
      scholarships_and_award
      undergraduate_level_courses_master
      project_dissertation_name_master
      most_recent_undergraduate
      undergraduate_level_grade
      result_ranking
      undergraduate_level_courses_phd
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
      teaching_personnel_contacted
      summary_of_interest
      post_study_goal
      referee
      attached_file
      package {
        id
        package_name
        turn_around_time
        amount
        form_type
        created_at
        updated_at
      }
      assigned_associate_id
      user_id
      package_id
      status
      created_at
      updated_at
    }
  `,
  graduate_school_statement_review: gql`
    fragment graduateSchoolStatementReviewField on GraduateSchoolStatementReview {
      id
      name
      university_and_course_applied_for
      summary_of_interest
      attached_file
      assigned_associate_id
      user_id
      package_id
      package {
        id
        package_name
        turn_around_time
        amount
        form_type
        created_at
        updated_at
      }
      status
      created_at
      updated_at
    }
  `,
  resume_reviews: gql`
    fragment resumeReviewField on ResumeReview {
      id
      name
      industry_applied_for
      summary_of_interest
      attached_file
      assigned_associate_id
      user_id
      package_id
      package {
        id
        package_name
        turn_around_time
        amount
        form_type
        created_at
        updated_at
      }
      status
      created_at
      updated_at
    }
  `,
  associate: gql`
    fragment associateField on User {
      id
      name
      industry_applied_for
      summary_of_interest
      attached_file
      assigned_associate_id
      user_id
      package_id
      package {
        id
        package_name
        turn_around_time
        amount
        form_type
        created_at
        updated_at
      }
      status
      created_at
      updated_at
    }
  `,
}

export const AssociateFields = {
         associate: gql`
           fragment associateField on User {
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
         `,
         user_full: gql`
           fragment UserFullField on User {
             id
             first_name
             last_name
             phone
             email
             details {
               id
               bio_bait
               profile_image_ref
               user_name
               bank_account_number
             }
           }
         `,
       }


       export const Messages = {
         message: gql`
           fragment MessageField on Messages {
            sender_id
             recipient_id
             message
             attached_file
             attached_file_name
             attached_file_type
             created_at
             }
         `,
       }


export default class GraphqlFragments extends Component {
  render() {
    return (
      <dv></dv>
    );
  }
}
