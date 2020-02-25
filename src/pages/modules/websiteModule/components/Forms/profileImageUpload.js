
import React from "react"
import defaultImage from "../../../../../images/default_profile_img.png"
import { Button } from '@blueprintjs/core';


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
                                 <p>Bio Format</p>
                               </li>
                               <li>
                                 <h3>5</h3>
                                 <p>Summary</p>
                               </li>
                             </ul>
                           </div>
                           <input
                             type="file"
                             name="file"
                             id="file"
                             accept=".png,.jpg,.jpeg,.JPEG,.svg"
                             ref="uploadImg"
                             className="file_upload"
                             onChange={handleProfileFileUpload}
                           />

                           <div
                             className={
                               this.props.file !== null
                                 ? "uploadImg"
                                 : "hide-upload-img"
                             }
                           >
                             <img src={this.props.file} alt="upload profile" />
                             <label htmlFor="file">change</label>
                           </div>
                           <div
                             className="p-image"
                             id={this.props.file !== null ? "hide-d-img" : ""}
                           >
                             <div>
                               <img
                                 id="previewimg"
                                 src={defaultImage}
                                 alt="upload profile"
                               />
                             </div>
                             <div className="p-image-trigger">
                               <label htmlFor="file">
                                 Upload Profile Image
                               </label>
                             </div>
                           </div>
                           <div className="layout-btn">
                             <Button
                               type="button"
                               className="bp3-button bp3-intent-danger n-btn"
                               onClick={prevStep}
                               large={true}
                             >
                               Previous
                             </Button>
                             <Button
                               type="button"
                               className="bp3-button bp3-intent-success n-btn"
                               onClick={nextStep}
                               large={true}
                             >
                               Next
                             </Button>
                           </div>
                         </form>
                       </div>
                     </div>
                   )
                 }
               }
