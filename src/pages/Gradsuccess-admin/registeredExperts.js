import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import Modal from "react-modal"
import {GET_ALL_EXPERTS} from "../graphql/queries"
import ExpertDetail from "../FormDetailsPreview/expertDetail"
import {PROFILE_IMAGE_REF} from "../../api/sendMailEndpoint"

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
        expertID:"",
        showExpertDetail:false,
        profileImage:""
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.downloadUploadedFile = this.downloadUploadedFile.bind(this);
    this.displayProfleImage = this.displayProfleImage.bind(this);
    }

    handleOpenModal(id){
        this.setState({
            expertID:id,
            showExpertDetail:true
        })
    }
    handleCloseModal(){
        this.setState({
            showExpertDetail:false
        })
    }

    displayProfleImage(id){
        let url = PROFILE_IMAGE_REF
        let data = {
            expert_id: id,
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
            this.downloadUploadedFile(id,text)
        }).catch(function(error){
            console.log(error);
        })
    }

    downloadUploadedFile(id,downloadRef){
        const firebase = require("firebase")
        const config = {
          apiKey: 'AIzaSyB9uwinxn9jEKUmcz0_7rxgLDycAeGO2Fk',
          authDomain: 'gradsuccess-6c883.firebaseapp.com',
          databaseURL: 'https://gradsuccess-6c883.firebaseio.com',
          projectId: 'gradsuccess-6c883',
          storageBucket: 'gs://gradsuccess-6c883.appspot.com/',
          messagingSenderId: '153907721792',
          appID:"1:153907721792:web:ff681e47886cdbb7"
        }
        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }
        var storageRef = firebase.storage().ref(downloadRef)

       storageRef.getDownloadURL().then((url) =>{
          this.setState({
              [id]:url
          })
        }).catch((error) => {
         switch (error.code) {
            case 'storage/object-not-found':
             this.setState({
                  fileNotAvailable:true
              })
              break;

            case 'storage/unauthorized':
               this.setState({
                  fileNotAvailable:true
              })
              break;

            case 'storage/canceled':
               this.setState({
                  fileNotAvailable:true
              })
              break;

            case 'storage/unknown':
               this.setState({
                  fileNotAvailable:true
              })
              break;
         }

         console.log(error)
        });
    }


    render() {
        return(
            <div>
                <Query 
                query={GET_ALL_EXPERTS}
                variables={{ account_type:"Expert" }}
                >
                    {({ loading, error, data }) => {
                     if (loading) return (
                        <div className = "loader">
                            <div className="loader_main_content">
                                <img  src={loader} alt="gradsuccess" />
                                <h1>Loading...</h1>
                            </div>
                        </div>
                        )
                      if (error) return <div>failed to load data</div>
                      return (
                    
                            <div className="form_preview_inner">
                                <div className="form_preview_col_1">

                                    {data.getExperts === null ?
                                            <div className = "client_expert_listing_main_expert">
                                                <h4>No Item Available</h4>
                                            </div>:
                                            <div className = "client_expert_listing_main_wrapper">
                                            {data.getExperts.map((Expert,index) =>
                                                <div key = {index} className = "client_expert_listing_main_inner">
                                                {this.displayProfleImage(Expert.id)}
                                                <div className = "profile-hover-overleaf">
                                                    <button className = "declineBtn" onClick = {()=>this.handleOpenModal(Expert.id)}>View</button>
                                                </div>
                                                    <div className = "client_expert_listing_main_expert" >
                                                        <div>
                                                            <div className = "profile-wrapper">
                                                                <img  src = {this.state[Expert.id]} />
                                                            </div>
                                                            <div className = "profile-detail">
                                                                <h4>{Expert.first_name + " " + Expert.last_name}</h4>
                                                                <p>{Expert.phone}</p>
                                                                <p>{Expert.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            </div>
                                        }
                                    
                                </div>
                            </div>
                      
                      );
                    }}
                </Query>

                <Modal 
                   isOpen={this.state.showExpertDetail}
                   contentLabel="Minimal Modal Example"
                   style={defaultStyles}
                   ariaHideApp={false}
                >
                    <div className = "detail_preview_modal_container">
                        <div className = "detail_preview_modal_container_inner">
                              <ExpertDetail expertID = {this.state.expertID} imgUrl = {this.state[this.state.expertID]}/>
                        </div>
                    </div>
                    <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
                </Modal>
            </div>

        )
    }

}
export default registeredExperts