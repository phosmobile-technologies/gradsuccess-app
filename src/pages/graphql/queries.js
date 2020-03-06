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
