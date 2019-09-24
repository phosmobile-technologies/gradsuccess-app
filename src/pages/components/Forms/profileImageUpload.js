
import React from "react"
import { graphql } from "gatsby"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CREATE_CLIENT_ACCOUNT } from "../../graphql/mutations"
import loader from "../../../images/loader.gif"
import defaultImage from "../../../images/default_profile_img.png"


export default class resumeReviewForm extends React.Component {
  
                 render() {
                  const {
                    nextStep,
                    prevStep,
                    handleProfileFileUpload
                  } = this.props
                   return (
                     <div>
                       <h3 className="form-header expert-form-header">
                         Apply As Expert
                       </h3>
                       <div className="expert-form">
                         <form className="checkout-form-container">
                           <div className="multi-step-wrapper">
                             <ul>
                               <li className="first-step-filled">
                                 <h3>1</h3>
                                 <p>Associate Detail</p>
                               </li>

                               <li className="second-step-filled">
                                 <h3>2</h3>
                                 <p>Educational Background</p>
                               </li>
                               <li className="third-step">
                                 <h3>3</h3>
                                 <p>Profile Image</p>
                               </li>
                               <li>
                                 <h3>4</h3>
                                 <p>Summary</p>
                               </li>
                             </ul>
                           </div>
                           <input
                             type="file"
                             name="file"
                             id="file"
                             ref="uploadImg"
                             className="file_upload"
                             onChange={handleProfileFileUpload}
                           />

                           <div
                             className={
                               this.props.file !== ""
                                 ? "uploadImg"
                                 : "hide-upload-img"
                             }
                           >
                             <img src={this.props.file} />
                             <label htmlFor="file">change</label>
                           </div>
                           <div
                             className="p-image"
                             id={this.props.file !== "" ? "hide-d-img" : ""}
                           >
                             <div>
                               <img id="previewimg" src={defaultImage} />
                             </div>
                             <div className="p-image-trigger">
                               <p>
                                 Upload profile image <br />
                                 <label htmlFor="file">Browse File</label>
                               </p>
                             </div>
                           </div>
                           <div>
                             <input
                               type="button"
                               className="submit-details-next"
                               value="Previous"
                               onClick={prevStep}
                             />
                             <input
                               type="button"
                               className="submit-details-prev"
                               value="Save and Continue"
                               onClick={nextStep}
                               css={{
                                 opacity: this.props.file === ""
                                   ? "0.3"
                                   : "1",
                               }}
                               disabled={this.props.file === ""}
                             />
                           </div>
                         </form>
                       </div>
                     </div>
                   )
                 }
               }
