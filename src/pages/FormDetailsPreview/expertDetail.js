import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import { GET_USER } from "../graphql/queries"
import { GET_EXPERT_DETAIL} from "../graphql/queries"
import {EXPERT_AVERAGE_RATING} from "../../api/sendMailEndpoint"
import StarRatingComponent from 'react-star-rating-component';

class ExpertDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expertRating:0,
            user:{
                first_name:"",
                last_name:"",
                phone:"",
                email:"",
            },
            userDetail:{
                expert_id:"",
                highest_ranked_university_attended:"",
                qualification_at_university:"",
                employment:"",
                scholarships_and_awards:"",
                graduating_grade:"",
                gre_score:"",
                gmat_score:"",
                ielts:"",
                university_transcripts:"",
                curriculum_vitae:""
            },
            university_transcripts:"",
            curriculum_vitae:""
        }

        this.downloadUploadedFile = this.downloadUploadedFile.bind(this)
    }


componentDidMount(){
    let url = EXPERT_AVERAGE_RATING
    let data = {
        expert_id: this.props.expertID,
        
    }
    fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
       },
        method: "post",
        body: JSON.stringify(data)
    }).then(function(response){
        return response.text()
    }).then((text)=>{
        this.setState({
            expertRating:text
        })
    }).catch(function(error){
    })
}

onStarClick(nextValue, prevValue, name) {
}


    downloadUploadedFile(target, downloadRef) {
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

        storageRef.getDownloadURL().then((url) => {
            this.setState({
                [target]: url
            })
        }).catch((error) => {

        });
    }

render() {
    return (
      <div>
        <Query
          query={GET_USER}
          variables={{ id: this.props.expertID }}
          onCompleted={data => {
            this.setState({
              user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                phone: data.user.phone,
                email: data.user.email,
              },
            })
          }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div className="loader">
                  <div className="loader_main_content">
                    <img src={loader} alt="gradsuccess" />
                    <h1>just a moment...</h1>
                  </div>
                </div>
              )
            if (error) return <div>failed to load data</div>
            return <div></div>
          }}
        </Query>
        <Query
          query={GET_EXPERT_DETAIL}
          variables={{ expert_id: this.props.expertID }}
          onCompleted={data => {
            this.setState({
              userDetail: {
                expert_id: data.getExpertDetail.expert_id,
                highest_ranked_university_attended:
                  data.getExpertDetail.highest_ranked_university_attended,
                qualification_at_university:
                  data.getExpertDetail.qualification_at_university,
                employment: data.getExpertDetail.employment,
                scholarships_and_awards:
                  data.getExpertDetail.scholarships_and_awards,
                graduating_grade: data.getExpertDetail.graduating_grade,
                gre_score: data.getExpertDetail.gre_score,
                gmat_score: data.getExpertDetail.gmat_score,
                ielts: data.getExpertDetail.ielts,
                university_transcripts:
                  data.getExpertDetail.university_transcripts,
                curriculum_vitae: data.getExpertDetail.curriculum_vitae,
                bio_bait: data.getExpertDetail.bio_bait,
                where_client_from: data.getExpertDetail.where_client_from,
                what_jobs_client: data.getExpertDetail.what_jobs_client,
                client_reach_you_for: data.getExpertDetail.client_reach_you_for,
                profile_image_ref: data.getExpertDetail.profile_image_ref,
                user_name: data.getExpertDetail.user_name,
              },
            })

            this.downloadUploadedFile(
              "university_transcripts",
              data.getExpertDetail.university_transcripts
            )
            this.downloadUploadedFile(
              "curriculum_vitae",
              data.getExpertDetail.curriculum_vitae
            )
          }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div className="loader">
                  <div className="loader_main_content">
                    <img src={loader} alt="gradsuccess" />
                    <h1>just a moment...</h1>
                  </div>
                </div>
              )
            if (error) return <div>failed to load data</div>
            return <div></div>
          }}
        </Query>
        <div className="form_preview form_preview_solid_bg">
          <div className="form_preview_inner">
            <h3 className="form-header">Details </h3>
            <div className="form-div">
              <div>
                <img src={this.props.imgUrl} />

                <div className="form_preview_fields form_preview_fields-large">
                  <small>Bio Bait:</small>
                  <p>{this.state.userDetail.bio_bait}</p>
                </div>
                <div className="form_preview_fields form_preview_fields-large">
                  <small>Where clients have come from:</small>
                  <p>{this.state.userDetail.where_client_from}</p>
                </div>
                <div className="form_preview_fields form_preview_fields-large">
                  <small>
                    What jobs or opportunities have clients secured::
                  </small>
                  <p>{this.state.userDetail.what_jobs_client}</p>
                </div>
                <div className="form_preview_fields form_preview_fields-large">
                  <small>What should clients reach you for:</small>
                  <p>{this.state.userDetail.client_reach_you_for}</p>
                </div>
                <div className="detail_rating">
                  <p>
                    <span>{this.state.expertRating}</span> star rating:
                  </p>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={Number(this.state.expertRating)}
                    onStarClick={this.onStarClick.bind(this)}
                  />
                </div>
              </div>
              <div className="form_preview_col_1">
                <div className="form_preview_fields">
                  <small>Name:</small>
                  <p>
                    {this.state.user.first_name +
                      " " +
                      this.state.user.last_name}
                  </p>
                </div>
                <div className="form_preview_fields">
                  <small>Phone:</small>
                  <p>{this.state.user.phone}</p>
                </div>
                <div className="form_preview_fields">
                  <small>Email:</small>
                  <p>{this.state.user.email}</p>
                </div>
                <div className="form_preview_fields">
                  <small>Highest Ranked University Attended:</small>
                  <p>
                    {this.state.userDetail.highest_ranked_university_attended}
                  </p>
                </div>
                <div className="form_preview_fields">
                  <small>University Qualification:</small>
                  <p>{this.state.userDetail.qualification_at_university}</p>
                </div>
                <div className="form_preview_fields">
                  <small>Employment:</small>
                  <p>{this.state.userDetail.employment}</p>
                </div>
                <div className="form_preview_fields">
                  <small>Scholarships and Awards:</small>
                  <p>{this.state.userDetail.scholarships_and_awards}</p>
                </div>

                <div className="form_preview_fields">
                  <small>Graduating Grade:</small>
                  <p>{this.state.userDetail.graduating_grade}</p>
                </div>
                <div className="form_preview_fields">
                  <small>GRE Score:</small>
                  <p>{this.state.userDetail.gre_score}</p>
                </div>
                <div className="form_preview_fields">
                  <small>GMAT score:</small>
                  <p>{this.state.userDetail.gmat_score}</p>
                </div>
                <div className="form_preview_fields">
                  <small>IELTs:</small>
                  <p>{this.state.userDetail.ielts}</p>
                </div>
                <div className="form_preview_fields">
                  <small>University Trabscript:</small>
                  <a href={this.state.university_transcripts}>Download</a>
                </div>
                <div className="form_preview_fields">
                  <small>Curricullum Vitae:</small>
                  <a href={this.state.curriculum_vitae}>Download</a>
                </div>

                <br />
                <div className="spacing"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
}
export default ExpertDetail;
