import React, { Component } from "react"
import { Link } from "gatsby"
import { Query } from "react-apollo"
import { ALL_ASSOCIATES } from "../../../graphql/queries"
 /* eslint-disable */
export default class FeaturedExperts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      expertID: "",
      showExpertDetail: false,
      profileImage: "",
    }
    this.getImageUrl = this.getImageUrl.bind(this)
  }

  getImageUrl() {
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
    var storageRef = firebase.storage().ref()

    this.state.allExpert.forEach((element, index) => {
      storageRef
        .child(element.profile_image_ref)
        .getDownloadURL()
        .then(url => {
          let el = {
            id: element.expert_id,
            user_name: element.user_name,
            bait: element.bio_bait,
            img_url: url,
          }
          if (this.state.displayExpertsInfo) {
            this.setState({
              displayExpertsInfo: [...this.state.displayExpertsInfo, el],
            })
          } else {
            this.setState({
              displayExpertsInfo: [el],
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  render() {
    return (
      <div>
        <Query
          query={ALL_ASSOCIATES}
          variables={{
            account_type: "Associate",
          }}
          onCompleted={data => {
            // this.setState({
            //   allExpert: data.allExpertDetail,
            // })
            // this.getImageUrl()
            console.log(data)
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>failed to load data</div>
            return (
              <div className="featured-experts">
                <h2>Meet Our Experts</h2>
                <div className="featured-experts-inner">
                  {data.getAllAssociates.map((associate, index) => (
                    <div className="featured-experts-single" key={index}>
                      <div className="img-div">
                        <img src={associate.details.profile_image_ref} />
                      </div>
                      <div className="summary-div">
                        <p>{associate.details.bio_bait}</p>
                        <Link
                          to="/request-associate-service"
                          state={{ associate: associate }}
                        >
                          Place an order with {associate.details.user_name}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }}
        </Query>
        
      </div>
    )
  }
}
