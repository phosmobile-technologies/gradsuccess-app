import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import Modal from "react-modal"
import { GET_EXPERT_DETAIL_BAIT } from "../graphql/queries"
import ExpertDetail from "../FormDetailsPreview/expertDetail"
import { PROFILE_IMAGE_REF } from "../../api/sendMailEndpoint"

const defaultStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(17, 153, 146, 0.3)'
  }
};

class registeredExperts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      expertID: "",
      showExpertDetail: false,
      profileImage: "",
      selectedExpertImageurl:""
    }

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal(id,url) {
    this.setState({
      expertID: id,
      showExpertDetail: true,
      selectedExpertImageurl:url
    })
  }
  handleCloseModal() {
    this.setState({
      showExpertDetail: false,
    })
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
            where_client_from:element.where_client_from,
            ielts:element.ielts,
          }
          if (this.state.displayExpertsInfo) {
            this.setState(
              {
                displayExpertsInfo: [...this.state.displayExpertsInfo, el],
              },
              () => {
                console.log(this.state)
              }
            )
          } else {
            this.setState(
              {
                displayExpertsInfo: [el],
              },
              () => {
                console.log(this.state)
              }
            )
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
          query={GET_EXPERT_DETAIL_BAIT}
          onCompleted={data => {
            this.setState({
              allExpert: data.allExpertDetail,
            })
            this.getImageUrl()
          }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div className="loader">
                  <div className="loader_main_content">
                    <img src={loader} alt="gradsuccess" />
                    <h1>Loading...</h1>
                  </div>
                </div>
              )
            if (error) return <div>failed to load data</div>
            return (
              <div className="form_preview_inner">
                <div className="form_preview_col_1">
                  {data.allExpertDetail === null ? (
                    <div className="client_expert_listing_main_expert">
                      <h4>No Item Available</h4>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            )
          }}
        </Query>
        {this.state.displayExpertsInfo ? (
          <div className="client_expert_listing_main_wrapper">
            {this.state.displayExpertsInfo.map((Expert, index) => (
              <div key={index} className="client_expert_listing_main_inner">
                <div className="profile-hover-overleaf">
                  <button
                    className="declineBtn"
                    onClick={() =>
                      this.handleOpenModal(Expert.id, Expert.img_url)
                    }
                  >
                    View
                  </button>
                </div>
                <div className="client_expert_listing_main_expert">
                  <div>
                    <div className="profile-wrapper">
                      <img src={Expert.img_url} />
                    </div>
                    <div className="profile-detail">
                      <h4>{Expert.user_name}</h4>
                      <p>{Expert.where_client_from}</p>
                      <p>{Expert.ielts}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="show-box">
            <div className="show-box-inner"></div>
            <div className="show-box-inner"></div>
          </div>
        )}
        <Modal
          isOpen={this.state.showExpertDetail}
          contentLabel="Minimal Modal Example"
          style={defaultStyles}
          ariaHideApp={false}
        >
          <div className="detail_preview_modal_container">
            <div className="detail_preview_modal_container_inner">
              <ExpertDetail
                expertID={this.state.expertID}
                imgUrl={this.state.selectedExpertImageurl}
              />
            </div>
          </div>
          <a className="ModalCloseBut" onClick={this.handleCloseModal}>
            x
          </a>
        </Modal>
      </div>
    )
  }
}
export default registeredExperts