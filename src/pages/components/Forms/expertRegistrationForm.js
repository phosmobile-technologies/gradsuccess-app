import React from "react"
import { graphql } from "gatsby"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CREATE_CLIENT_ACCOUNT } from "../../graphql/mutations"
import loader from "../../../images/loader.gif"

export default class ExpertBasicInfo extends React.Component {
                
                 render() {
                   const {
                     values,
                     handleFormInput,
                     nextStep,
                     verifyPassword,
                     verifyConfirmPassword,
                     storePassword,
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
                               <li className="first-step">
                                 <h3>1</h3>
                                 <p>Associate Detail</p>
                               </li>

                               <li>
                                 <h3>2</h3>
                                 <p>Educational Background</p>
                               </li>
                               <li>
                                 <h3>3</h3>
                                 <p>Profile Image</p>
                               </li>
                               <li>
                                 <h3>4</h3>
                                 <p>Summary</p>
                               </li>
                             </ul>
                           </div>
                           <div className="row-full">
                             <div className="row">
                               <div className="col">
                                 <input
                                   type="text"
                                   required
                                   placeholder="First name"
                                   onChange={handleFormInput}
                                   id="first_name"
                                   autoComplete="false"
                                   name="first_name"
                                   value={values.first_name}
                                 />
                               </div>
                               <div className="col">
                                 <input
                                   type="text"
                                   required
                                   placeholder="Last name"
                                   onChange={handleFormInput}
                                   id="last_name"
                                   autoComplete="false"
                                   name="last_name"
                                   value={values.last_name}
                                 />
                               </div>
                             </div>

                             <div className="row">
                               <input
                                 type="email"
                                 placeholder="Email Address"
                                 id="email"
                                 name="email"
                                 required
                                 autoComplete="false"
                                 onChange={handleFormInput}
                                 value={values.email}
                               />

                               <div className="col">
                                 <input
                                   type="text"
                                   required
                                   placeholder="Phone"
                                   onChange={handleFormInput}
                                   id="phone"
                                   name="phone"
                                   value={values.phone}
                                 />
                               </div>
                             </div>
                             <input
                               type="password"
                               placeholder="Password"
                               id="password"
                               name="password"
                               autoComplete="false"
                               onChange={verifyPassword}
                               required
                               onBlur={storePassword}
                             />
                             <span id="password_info" className="password_info">
                               provide atleast 8 character password e.g
                               ERe203_sj
                             </span>

                             <input
                               type="password"
                               placeholder="Comfirm Password"
                               id="confirm_password"
                               autoComplete="false"
                               name="confirm_password"
                               required
                               onChange={verifyConfirmPassword}
                               value={values.confirm_password}
                             />
                             <span
                               id="password_info_c"
                               className="password_info"
                             >
                               password mismatch!
                             </span>
                           </div>

                           <br />
                           <div>
                             {/* <input
                               type="button"
                               className="submit-details-next"
                               value="Previous"
                               onClick = {values.next}
                             /> */}
                             <input
                               type="button"
                               className="submit-details-prev"
                               value="Next"
                               //  css={{
                               //    opacity: this.state.password_verified
                               //      ? "0.3"
                               //      : "1",
                               //  }}
                               //  disabled={this.state.password_verified}
                               onClick={nextStep}
                             />
                           </div>
                         </form>
                       </div>
                     </div>
                   )
                 }
               }
