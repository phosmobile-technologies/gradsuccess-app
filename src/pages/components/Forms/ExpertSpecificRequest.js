import React from "react"
import ThankYou from "../formCompletePage"
import img1 from "../../../images/dan.jpeg"

export default class resumeReviewForm extends React.Component {
                 constructor(props) {
                   super(props)
                   this.state = {
                     itemInCart: {},
                     packages: {
                       AdmissionResumeReviewStandard: {
                         IitemDescription: "Admission Resume Review (STANDARD)",
                         Price: "N10,000",
                         form: "graduateSchoolStatementReviewForm",
                       },
                       AdmissionResumeReviewFlash: {
                         IitemDescription: "Admission Resume Review (FLASH)",
                         Price: "N15,000",
                         form: "graduateSchoolStatementReviewForm",
                       },
                       AdmissionEssayReviewStandard: {
                         IitemDescription: "Admission Essay review (STANDARD)",
                         Price: "N18,500",
                         form: "graduateSchoolStatementReviewForm",
                       },
                       AdmissionEssayReviewFlash: {
                         IitemDescription: "Admission Essay Review (FLASH)",
                         Price: "N25,000",
                         form: "graduateSchoolStatementReviewForm",
                       },
                       CoverLetterResumeReviewStandard: {
                         IitemDescription:
                           "Jobs / Careers Resume Review (STANDARD)",
                         Price: "N10,000",
                         form: "coverLetterReviewForm",
                       },
                       CoverLetterResumeReviewFlash: {
                         IitemDescription:
                           "Jobs / Careers Resume Review (FLASH)",
                         Price: "N15,000",
                         form: "coverLetterReviewForm",
                       },
                       CoverLetterEssayReviewStandard: {
                         IitemDescription:
                           "Jobs / Careers Essay Review (STANDARD)",
                         Price: "N18,500",
                         form: "coverLetterReviewForm",
                       },
                       CoverLetterEssayReviewFlash: {
                         IitemDescription:
                           "Jobs / Careers Essay Reviev (FLASH)",
                         Price: "N25,000",
                         form: "coverLetterReviewForm",
                       },
                       ScholarshipResumeReviewStandard: {
                         IitemDescription:
                           " Scholarship Resume Review (STANDARD)",
                         Price: "N10,000",
                         form: "graduateSchoolStatementReviewForm",
                       },
                       ScholarshipResumeReviewFlash: {
                         IitemDescription: " Scholarship Resume Review (FLASH)",
                         Price: "N15,000",
                         form: "graduateSchoolStatementReviewForm",
                       },
                       ScholarshipEssayReviewStandard: {
                         IitemDescription:
                           " Scholarship Essay review (STANDARD)",
                         Price: "N18,500",
                         form: "graduateSchoolStatementReviewForm",
                       },
                       ScholarshipEssayReviewFlash: {
                         IitemDescription: " Scholarship Essay Review (FLASH)",
                         Price: "N25,000",
                         form: "graduateSchoolStatementReviewForm",
                       },
                     },
                   }

                   this.getItem = this.getItem.bind(this)
                   this.removeItem = this.removeItem.bind(this)
                   this.submitRequest = this.submitRequest.bind(this)
                 }

                 componentDidMount() {
                   if (localStorage.hasOwnProperty("ItemsInCart")) {
                     localStorage.removeItem("ItemsInCart")
                     document.getElementById("counter").innerHTML = ""
                   }
                 }

                 getItem = packageForm => {
                   let p = this.state.packages[packageForm]
                   let letExists = this.state.itemInCart[packageForm]

                   if (letExists === undefined) {
                     this.setState(prevState => ({
                       itemInCart: {
                         ...prevState.itemInCart,
                         [packageForm]: p,
                       },
                     }))
                   } else {
                     let NewItemsList = this.state.itemInCart
                     delete NewItemsList[packageForm]

                     this.setState(
                       {
                         itemInCart: NewItemsList,
                       },
                       () => {}
                     )
                   }
                 }

                 removeItem = packageForm => {
                   let p = this.state.packages[packageForm]
                   let letExists = this.state.itemInCart[packageForm]

                     let NewItemsList = this.state.itemInCart
                     delete NewItemsList[packageForm]

                     this.setState(
                       {
                         itemInCart: NewItemsList,
                       },
                       () => {
                         document.getElementById(packageForm).checked = false
                       }
                     )
                   
                 }

                 submitRequest() {
                   localStorage.removeItem("ItemsInCart")
                   Object.entries(this.state.itemInCart).map(obj => {
                     const value = obj[1]

                     let list = localStorage.getItem("ItemsInCart")
                     let itemArr = []
                     if (list) {
                       itemArr = JSON.parse(list)
                       itemArr.push(value)

                       itemArr = Array.from(new Set(itemArr))

                       localStorage.setItem(
                         "ItemsInCart",
                         JSON.stringify(itemArr)
                       )

                       this.setState({
                         addItem: true,
                       })

                       var counter = JSON.parse(
                         localStorage.getItem("ItemsInCart")
                       ).length
                       document.getElementById("counter").innerHTML = counter
                     } else {
                       itemArr = []
                       itemArr.push(value)
                       localStorage.setItem(
                         "ItemsInCart",
                         JSON.stringify(itemArr)
                       )

                       this.setState({
                         addItem: true,
                       })

                       var counter = JSON.parse(
                         localStorage.getItem("ItemsInCart")
                       ).length

                       document.getElementById("counter").innerHTML = counter
                     }
                   })
                   window.location = "/Cart"
                 }

                 render() {
                   if (!this.state.form_submit_success) {
                     return (
                       <div>
                         <div className="expert-specific-wrapper">
                           <div className="featured-experts-single expert-spe ">
                             <div className="img-div">
                               <img src={img1} />
                             </div>
                             <div className="summary-div">
                               <p>
                                 {" "}
                                 Try to imagine this: your company has an
                                 innovative product for the market, surrounded
                                 by your company are clients, surrounded by
                                 these clients are competitors, let’s assume a
                                 reasonable percentage of these clients are not
                                 satisfied by competitors’ products;{" "}
                               </p>
                             </div>
                           </div>

                           <h2>
                             How Can John Phillips Help You? 
                           </h2>
                           <div className="expert-specific-request">
                             <form className="form">
                               <div className="admission-listing">
                                 <h3>Admision</h3>
                                 <div className="admission-listing-inner">
                                   <div className="listing-grouping">
                                     <h4>CV/Resume Review</h4>
                                     <div className="inputGroup">
                                       <input
                                         id="AdmissionResumeReviewStandard"
                                         name="admission-cv"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="AdmissionResumeReviewStandard"
                                         onClick={() =>
                                           this.getItem(
                                             "AdmissionResumeReviewStandard"
                                           )
                                         }
                                       >
                                         Standard (N10,000)
                                       </label>
                                       <small></small>
                                     </div>

                                     <div className="inputGroup">
                                       <input
                                         id="AdmissionResumeReviewFlash"
                                         name="admission-cv"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="AdmissionResumeReviewFlash"
                                         onClick={() =>
                                           this.getItem(
                                             "AdmissionResumeReviewFlash"
                                           )
                                         }
                                       >
                                         Flash Price (15,000)
                                       </label>
                                     </div>
                                   </div>
                                   <div className="listing-grouping">
                                     <h4>Essay Review</h4>
                                     <div className="inputGroup">
                                       <input
                                         id="AdmissionEssayReviewStandard"
                                         name="admission-essay"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="AdmissionEssayReviewStandard"
                                         onClick={() =>
                                           this.getItem(
                                             "AdmissionEssayReviewStandard"
                                           )
                                         }
                                       >
                                         Standard (N18,500)
                                       </label>
                                     </div>

                                     <div className="inputGroup">
                                       <input
                                         id="AdmissionEssayReviewFlash"
                                         name="admission-essay"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="AdmissionEssayReviewFlash"
                                         onClick={() =>
                                           this.getItem(
                                             "AdmissionEssayReviewFlash"
                                           )
                                         }
                                       >
                                         Flash Price(N20,000)
                                       </label>
                                     </div>
                                   </div>
                                 </div>
                               </div>

                               <div className="career-listing">
                                 <h3>Jobs / Careers</h3>
                                 <div className="career-listing-inner">
                                   <div className="listing-grouping">
                                     <h4>CV/Resume Review</h4>
                                     <div className="inputGroup">
                                       <input
                                         id="CoverLetterResumeReviewStandard"
                                         name="career-cv"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="CoverLetterResumeReviewStandard"
                                         onClick={() =>
                                           this.getItem(
                                             "CoverLetterResumeReviewStandard"
                                           )
                                         }
                                       >
                                         Standard (N10,000)
                                       </label>
                                     </div>
                                     <div className="inputGroup">
                                       <input
                                         id="CoverLetterResumeReviewFlash"
                                         name="career-cv"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="CoverLetterResumeReviewFlash"
                                         onClick={() =>
                                           this.getItem(
                                             "CoverLetterResumeReviewFlash"
                                           )
                                         }
                                       >
                                         Flash Price(N15,000)
                                       </label>
                                     </div>
                                   </div>
                                   <div className="listing-grouping">
                                     <h4>Essay Review</h4>
                                     <div className="inputGroup">
                                       <input
                                         id="CoverLetterEssayReviewStandard"
                                         name="career-essay"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="CoverLetterEssayReviewStandard"
                                         onClick={() =>
                                           this.getItem(
                                             "CoverLetterEssayReviewStandard"
                                           )
                                         }
                                       >
                                         Standard (N18,500)
                                       </label>
                                     </div>
                                     <div className="inputGroup">
                                       <input
                                         id="CoverLetterEssayReviewFlash"
                                         name="career-essay"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="CoverLetterEssayReviewFlash"
                                         onClick={() =>
                                           this.getItem(
                                             "CoverLetterEssayReviewFlash"
                                           )
                                         }
                                       >
                                         Flash Price(N20,000)
                                       </label>
                                     </div>
                                   </div>
                                 </div>
                               </div>

                               <div className="scholarships-listing">
                                 <h3>Scholarships</h3>
                                 <div className="scholarships-listing-inner">
                                   <div className="listing-grouping">
                                     <h4>CV/Resume Review</h4>
                                     <div className="inputGroup">
                                       <input
                                         id="ScholarshipResumeReviewStandard"
                                         name="scholarships-cv"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="ScholarshipResumeReviewStandard"
                                         onClick={() =>
                                           this.getItem(
                                             "ScholarshipResumeReviewStandard"
                                           )
                                         }
                                       >
                                         Standard (N10,000)
                                       </label>
                                     </div>
                                     <div className="inputGroup">
                                       <input
                                         id="ScholarshipResumeReviewFlash"
                                         name="scholarships-cv"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="ScholarshipResumeReviewFlash"
                                         onClick={() =>
                                           this.getItem(
                                             "ScholarshipResumeReviewFlash"
                                           )
                                         }
                                       >
                                         Flash Price(N15,000)
                                       </label>
                                     </div>
                                   </div>
                                   <div className="listing-grouping">
                                     <h4>Essay Review</h4>
                                     <div className="inputGroup">
                                       <input
                                         id="ScholarshipEssayReviewStandard"
                                         name="scholarships-essay"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="ScholarshipEssayReviewStandard"
                                         onClick={() =>
                                           this.getItem(
                                             "ScholarshipEssayReviewStandard"
                                           )
                                         }
                                       >
                                         Standard (N18,500)
                                       </label>
                                     </div>
                                     <div className="inputGroup">
                                       <input
                                         id="ScholarshipEssayReviewFlash"
                                         name="scholarships-essay"
                                         type="checkbox"
                                       />
                                       <label
                                         htmlFor="ScholarshipEssayReviewFlash"
                                         onClick={() =>
                                           this.getItem(
                                             "ScholarshipEssayReviewFlash"
                                           )
                                         }
                                       >
                                         Flash Price(N20,000)
                                       </label>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </form>
                           </div>
                         </div>
                         <div className="selectItems-wrapper">
                           <h4>Select Application(s)</h4>
                           {Object.entries(this.state.itemInCart).map(obj => {
                             const key = obj[0]
                             const value = obj[1]
                             return (
                               <div key={key} className="selectItems">
                                 <div className="inputGroup">
                                   <input
                                     id="scholarships-essay-flash-review"
                                     name="scholarships-essay"
                                     type="checkbox"
                                   />
                                   <label
                                     htmlFor="scholarships-essay-flash-review"
                                     onClick={() => this.removeItem(key)}
                                   >
                                     {value.IitemDescription}
                                   </label>
                                 </div>
                               </div>
                             )
                           })}
                           <button
                             onClick={() => this.submitRequest()}
                             className="selectItemsBtn"
                             disabled={
                               Object.entries(this.state.itemInCart).length ===
                               0
                             }
                           >
                             Proceed
                           </button>
                         </div>
                       </div>
                     )
                   } else {
                     return <ThankYou />
                   }
                 }
               }
