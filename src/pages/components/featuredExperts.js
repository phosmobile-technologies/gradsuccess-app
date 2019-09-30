import React, { Component } from 'react';
import {Link} from 'gatsby';
import { Query } from "react-apollo"
import {GET_EXPERT_DETAIL_BAIT} from "../graphql/queries"
import loader from "../../images/loader.gif"


export default class FeaturedExperts extends Component {
                 constructor(props) {
                   super(props)
                   this.state = {
                     open: false,
                     expertID: "",
                     showExpertDetail: false,
                     profileImage: "",
                   }
                   this.downloadUploadedFile = this.downloadUploadedFile.bind(
                     this
                   )
                 }


                 downloadUploadedFile(id, downloadRef) {
                   const firebase = require("firebase")
                   const config = {
                     apiKey: "AIzaSyC26CrW2BGh2lXXDK0Gkcl4gCIPccHvW6s",
                     authDomain: "gradsuccess.firebaseapp.com",
                     databaseURL: "https://gradsuccess.firebaseio.com",
                     projectId: "gradsuccess",
                     storageBucket: "gradsuccess.appspot.com",
                     messagingSenderId: "1038128602103",
                     appId: "1:1038128602103:web:55d1ab3ffe5b02bf222cf2",
                   }
                   if (!firebase.apps.length) {
                     firebase.initializeApp(config)
                   }
                   var storageRef = firebase.storage().ref(downloadRef)

                   storageRef
                     .getDownloadURL()
                     .then(url => {
                       this.setState({
                         [id]: url,
                       })
                     })
                     .catch(error => {
                       switch (error.code) {
                         case "storage/object-not-found":
                           this.setState({
                             fileNotAvailable: true,
                           })
                           break

                         case "storage/unauthorized":
                           this.setState({
                             fileNotAvailable: true,
                           })
                           break

                         case "storage/canceled":
                           this.setState({
                             fileNotAvailable: true,
                           })
                           break

                         case "storage/unknown":
                           this.setState({
                             fileNotAvailable: true,
                           })
                           break
                       }
                     })
                 }
                 render() {
                   const id = 20
                   return (
                     <Query query={GET_EXPERT_DETAIL_BAIT}>
                       {({ loading, error, data }) => {
                         if (loading)
                           return (
                             <div></div>
                           )
                         if (error) return <div>failed to load data</div>
                         return (
                           <div>
                             {data.allExpertDetail === null ? (
                               <div className="client_expert_listing_main_expert">
                                 <h4>No Item Available</h4>
                               </div>
                             ) : (
                               <div className="featured-experts">
                                 <h2>Meet Our Experts</h2>
                                 <div className="featured-experts-inner">
                                   {data.allExpertDetail.map(
                                     (Expert, index) => (
                                       <div className="featured-experts-single" key = {index}>
                                         {this.downloadUploadedFile(
                                           Expert.id,
                                           Expert.profile_image_ref
                                         )}
                                         <div className="img-div">
                                           <img src={this.state[Expert.id]} />
                                         </div>
                                         <div className="summary-div">
                                           <p>{Expert.bio_bait}</p>
                                          <Link
                                             to="/request-associate-service"
                                             state={{ id: Expert.expert_id }}
                                           >
                                              Place an order with {" "}
                                             {Expert.user_name.split(" ").pop()}
                                           </Link>
                                         </div>
                                       </div>
                                     )
                                   )}
                                 </div>
                               </div>
                             )}
                           </div>
                         )
                       }}
                     </Query>
                   )
                 }
               }


   
    
