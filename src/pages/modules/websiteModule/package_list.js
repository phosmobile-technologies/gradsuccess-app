import React, { Component } from "react"
//redraft_two packages will fill the graduate redraft form
//review_two packages will fill the graduate review form
//redraft_one packages will fill the Cover Letter redraft form
//review_one packages will fill the Cover Letter review form

export default class PAckageList extends Component {
  render(){
    return <div></div>
  }
}

export const packages = {
  // Addmission Packages
  admission_grad_sch_essay_redraft_reg: {
    form: "redraft_two",
    title: "Admission Essay Redraft",
    turnAroundTime: "Regular",
    price: "20000",
  },
  admission_grad_sch_essay_redraft_fla: {
    form: "redraft_two",
    title: "Admission Essay Redraft",
    turnAroundTime: "Flash",
    price: "30000",
  },
  admission_grad_sch_essay_review_reg: {
    form: "review_two",
    title: "Admission Essay Review",
    turnAroundTime: "Regular",
    price: "18500",
  },
  admission_grad_sch_essay_review_fla: {
    form: "review_two",
    title: "Admission Essay Review",
    turnAroundTime: "Flash",
    price: "25000",
  },
  admission_resume_redraft_reg: {
    form: "redraft_two",
    title: "Admission Resume Redraft",
    turnAroundTime: "Regular",
    price: "20000",
  },
  admission_resume_redraft_fla: {
    form: "redraft_two",
    title: "Admission Resume Redraft",
    turnAroundTime: "Flash",
    price: "30000",
  },
  admission_resume_review_reg: {
    form: "review_two",
    title: "Admission Resume Review",
    turnAroundTime: "Regular",
    price: "10000",
  },
  admission_resume_review_fla: {
    form: "review_two",
    title: "Admission Resume Review",
    turnAroundTime: "Flash",
    price: "15000",
  },

  // Career Packages

  career_essay_redraft_reg: {
    form: "redraft_one",
    title: "Career Essay Redraft",
    turnAroundTime: "Regular",
    price: "20000",
  },
  career_essay_redraft_fla: {
    form: "redraft_one",
    title: "Career Essay Redraft",
    turnAroundTime: "Flash",
    price: "30000",
  },
  career_essay_review_reg: {
    form: "review_one",
    title: "Career Essay Review",
    turnAroundTime: "Regular",
    price: "18500",
  },
  career_essay_review_fla: {
    form: "review_one",
    title: "Career Essay Review",
    turnAroundTime: "Flash",
    price: "25000",
  },
  career_resume_redraft_reg: {
    form: "redraft_one",
    title: "Career Resume Redraft",
    turnAroundTime: "Regular",
    price: "20000",
  },
  career_resume_redraft_fla: {
    form: "redraft_one",
    title: "Career Resume Redraft",
    turnAroundTime: "Flash",
    price: "30000",
  },
  career_resume_review_reg: {
    form: "review_one",
    title: "Career Resume Review",
    turnAroundTime: "Regular",
    price: "10000",
  },
  career_resume_review_fla: {
    form: "review_one",
    title: "Career Resume Review",
    turnAroundTime: "Flash",
    price: "15000",
  },

  //  Scholarships Packages

  scholarship_essay_redraft_reg: {
    form: "redraft_two",
    title: "Scholarships Essay Redraft",
    turnAroundTime: "Regular",
    price: "20000",
  },
  scholarship_essay_redraft_fla: {
    form: "redraft_two",
    title: "Scholarships Essay Redraft",
    turnAroundTime: "Flash",
    price: "30000",
  },
  scholarship_essay_review_reg: {
    form: "review_two",
    title: "Scholarships Essay Review",
    turnAroundTime: "Regular",
    price: "18500",
  },
  scholarship_essay_review_fla: {
    form: "review_two",
    title: "Scholarships Essay Review",
    turnAroundTime: "Flash",
    price: "25000",
  },
  scholarship_resume_redraft_reg: {
    form: "redraft_two",
    title: "Scholarships Resume Redraft",
    turnAroundTime: "Regular",
    price: "20000",
  },
  scholarship_resume_redraft_fla: {
    form: "redraft_two",
    title: "Scholarships Resume Redraft",
    turnAroundTime: "Flash",
    price: "30000",
  },
  scholarship_resume_review_reg: {
    form: "review_two",
    title: "Scholarships Resume Review",
    turnAroundTime: "Regular",
    price: "10000",
  },
  scholarship_resume_review_fla: {
    form: "review_two",
    title: "Scholarships Resume Review",
    turnAroundTime: "Flash",
    price: "15000",
  },
}

export const packageSelectAdmission = [
         // Addmission Packages
         {
           value: {
             form: "redraft_two",
             title: "Admission Essay Redraft",
             turnAroundTime: "Regular",
             price: "20000",
           },
           label: "₦20,000",
         },
         {
           value: {
             form: "redraft_two",
             title: "Admission Essay Redraft",
             turnAroundTime: "Flash",
             price: "30000",
           },
           label: "₦30,000",
         },
         {
           value: {
             form: "review_two",
             title: "Admission Essay Review",
             turnAroundTime: "Regular",
             price: "18500",
           },
           label: "₦18,500",
         },
         {
           value: {
             form: "review_two",
             title: "Admission Essay Review",
             turnAroundTime: "Flash",
             price: "25000",
           },
           label: "₦25,000",
         },
         {
           value: {
             form: "redraft_two",
             title: "Admission Resume Redraft",
             turnAroundTime: "Regular",
             price: "20000",
           },
           label: "₦20,000",
         },
         {
           value: {
             form: "redraft_two",
             title: "Admission Resume Redraft",
             turnAroundTime: "Flash",
             price: "30000",
           },
           label: "₦30,000",
         },
         {
           value: {
             form: "review_two",
             title: "Admission Resume Review",
             turnAroundTime: "Regular",
             price: "10000",
           },
           label: "₦10,000",
         },
         {
           value: {
             form: "review_two",
             title: "Admission Resume Review",
             turnAroundTime: "Flash",
             price: "15000",
           },
           label: "₦15,000",
         },
       ]

export const packageSelectCareer = [
         {
           value: {
             form: "redraft_one",
             title: "Career Essay Redraft",
             turnAroundTime: "Regular",
             price: "20000",
           },
           label: "₦20,000",
         },
         {
           value: {
             form: "redraft_one",
             title: "Career Essay Redraft",
             turnAroundTime: "Flash",
             price: "30000",
           },
           label: "₦30,000",
         },
         {
           value: {
             form: "review_one",
             title: "Career Essay Review",
             turnAroundTime: "Regular",
             price: "18500",
           },
           label: "₦18,500",
         },
         {
           value: {
             form: "review_one",
             title: "Career Essay Review",
             turnAroundTime: "Flash",
             price: "25000",
           },
           label: "₦25,000",
         },
         {
           value: {
             form: "redraft_one",
             title: "Career Resume Redraft",
             turnAroundTime: "Regular",
             price: "20000",
           },
           label: "₦20,000",
         },
         {
           value: {
             form: "redraft_one",
             title: "Career Resume Redraft",
             turnAroundTime: "Flash",
             price: "30000",
           },
           label: "₦30,000",
         },
         {
           value: {
             form: "review_one",
             title: "Career Resume Review",
             turnAroundTime: "Regular",
             price: "10000",
           },
           label: "₦10,000",
         },
         {
           value: {
             form: "review_one",
             title: "Career Resume Review",
             turnAroundTime: "Flash",
             price: "15000",
           },
           label: "₦15,000",
         },
       ]

export const packageSelectScholarship = [
         {
           value: {
             form: "redraft_two",
             title: "Scholarships Essay Redraft",
             turnAroundTime: "Regular",
             price: "20000",
           },
           label: "₦20,000",
         },
         {
           value: {
             form: "redraft_two",
             title: "Scholarships Essay Redraft",
             turnAroundTime: "Flash",
             price: "30000",
           },
           label: "₦30,000",
         },
         {
           value: {
             form: "review_two",
             title: "Scholarships Essay Review",
             turnAroundTime: "Regular",
             price: "18500",
           },
           label: "₦18,500",
         },
         {
           value: {
             form: "review_two",
             title: "Scholarships Essay Review",
             turnAroundTime: "Flash",
             price: "25000",
           },
           label: "₦25,000",
         },
         {
           value: {
             form: "redraft_two",
             title: "Scholarships Resume Redraft",
             turnAroundTime: "Regular",
             price: "20000",
           },
           label: "₦20,000",
         },
         {
           value: {
             form: "redraft_two",
             title: "Scholarships Resume Redraft",
             turnAroundTime: "Flash",
             price: "30000",
           },
           label: "₦30,000",
         },
         {
           value: {
             form: "review_two",
             title: "Scholarships Resume Review",
             turnAroundTime: "Regular",
             price: "10000",
           },
           label: "₦10,000",
         },
         {
           value: {
             form: "review_two",
             title: "Scholarships Resume Review",
             turnAroundTime: "Flash",
             price: "15000",
           },
           label: "₦15,000",
         },
       ]
