import { React, Component } from "react"
import Modal from "react-modal"
import Footer from '../components/Footer'
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import { LOGGED_IN_USER } from "../graphql/queries"
import { MARK_COMPLETE_RESUME_REVIEW_FORM } from "../graphql/mutations"
import loader from "../../images/loader.gif"
import MainLayout from "../components/ClientAccountComponents/mainLayout"
import AccountInfo from "./account"
import LoginForm from "../components/Forms/loginForm"
import LogoutForm from "../components/Forms/logoutForm"

import NotFoundPage from "../401"

import LeaveAMessageForm from "../components/Forms/leaveAMessageForm"

import discouted from "../../images/logo.png"



const customStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(255,255,255,0.3)'
  }
};

const defaultStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(17, 153, 146, 0.3)'
  }
};

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: "",
            leaveAMessage:false,
            leaveAComplain:false,
            changePassword:false,
            changeCV:false,
            accountInfo:true,
            showModal:false,
            currentMenu:"accountInfo",
            toggle:true,
            data:{
                email:"",
                new_password:""
            }

        }
        this.handleDisplayComponent = this.handleDisplayComponent.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
         this.handleCloseModal = this.handleCloseModal.bind(this)
         this.handleFormInput = this.handleFormInput.bind(this)
    }
    componentDidMount(){
        this.setState({
            loggedIn:localStorage.getItem('auth-token') || ""
        })

        if (this.state.loggedIn === "") {
           this.setState({ showModal: true });
        }
    }
     handleCloseModal () {
          this.setState({ 
              showModal: false,
              changePassword:false
          });
    }

    handleDisplayComponent(event){
       let Component =  event.target.id;

       this.setState({
            leaveAMessage:false,
            leaveAComplain:false,
            changeCV:false,
            accountInfo:false,
            changePassword:false
       })

       this.setState({
            [Component]:true,
            currentMenu:Component,
            toggle:true
       })
    }

    toggleMenu(){
        this.setState({
            toggle:!this.state.toggle
        })
    
    }


     handleFormInput(event){
    const {name,value} = event.target;
    this.setState(prevState =>({
      data:{
        ...prevState.data,
        [name]:value
      }
    }))
}

    render() {
        if (this.state.loggedIn != "") {
            return (
                <Query query={LOGGED_IN_USER}>
                    {({ loading, error, data }) => {
                    if (loading) return (
                    <div className = "loader">
                        <div className="loader_client_account">
                            <img  src={loader} alt="gradsuccess" />
                            <h1>Just a moment...</h1>
                        </div>
                    </div>
                    )
                if (error) return `Error! ${error.message}`;
                return (
                <div>
                    {data.me.account_type === "Expert"?
                        <NotFoundPage />
                        :<div>
                        


                            <div className = "main-content">
                                <div className = "client_main_area">
                                    <div className = "fixedHeader">
                                        <div className = "client_main_area_menu" id  = {this.state.toggle?"toggle_menu":""}>
                                            <div className = "logo-image"><img  src={discouted} alt="Logo" /></div>
                                            <button 
                                            className = {this.state.currentMenu === "accountInfo"? "currentMenu":""} 
                                            id = "accountInfo" 
                                            onClick = {this.handleDisplayComponent}>Uploaded Info
                                            </button>
                                            <button 
                                            className = {this.state.currentMenu === "leaveAMessage"? "currentMenu":""}
                                            id = "changePassword" 
                                            onClick = {this.handleDisplayComponent}>Change Password
                                            </button>
                                            <button 
                                            className = {this.state.currentMenu === "leaveAMessage"? "currentMenu":""}
                                            id = "leaveAMessage" 
                                            onClick = {this.handleDisplayComponent}>Leave a Message
                                            </button>
                                            <LogoutForm />
                                        </div>
                                        <div className = "hamburger-menu" onClick = {this.toggleMenu}>
                                          <div className = "stroke-1"></div>
                                          <div className = "stroke-2"></div>
                                          <div className = "stroke-3"></div>
                                    </div>
                                    </div>

                                    <div>
                                        <MainLayout  currentComponent = {this.state.currentMenu} toggleMenu = {this.toggleMenu}/>
                                        <div className="client_main_area_content_area">
                                            {this.state.accountInfo && <AccountInfo table = {data.me.package} userID = {data.me.form_id} account_type = {data.me.account_type}/>}
                                            {this.state.leaveAMessage && <LeaveAMessageForm  logged_in_user_id = {data.me.form_id} sender = {data.me.first_name +" "+ data.me.last_name}/>}
                                        </div>
                                        <Footer />
                                    </div>
                                </div>
                            </div>
                            <div>
                        <Modal 
                           isOpen={this.state.changePassword}
                           contentLabel="Minimal Modal Example"
                           style={defaultStyles}
                           ariaHideApp={false}
                        >
                            <div className = "detail_preview_modal_container">
                                <div className = "detail_preview_modal_container_inner">
                                      <Mutation 
                                            mutation={MARK_COMPLETE_RESUME_REVIEW_FORM}
                                            onError={this.error} 
                                            >        
                                        {(asignSelfRequest, { data,loading, error}) => (        
                                            <div className = "loader-wrapper">
                                                <div id="submittedSucces" className="SuccessTagForm-d">
                                                    Success! Redirecting...
                                                </div>
                                                <form 
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    asignSelfRequest({ 
                                                      variables: {
                                                        id: this.props.applicationID,
                                                        completed:true

                                                      }
                                                 })}}
                                                 className = "confirm_form">
                                                 <h4 className = "completeAppMTitle">Change Password</h4>
                                                 <br />
                                                    <div className="row-full comment_input">
                                                      <input 
                                                      type="text"  
                                                      placeholder="Email Address"   
                                                      id = "email"
                                                      name = "email"
                                                      onChange = {this.handleFormInput}
                                                      required />
                                                    </div>
                                                    <br />
                                                    <div className="row-full comment_input">
                                                      <input 
                                                      type="text"  
                                                      placeholder="New Password"   
                                                      id = "new_password"
                                                      name = "new_password"
                                                      onChange = {this.handleFormInput}
                                                      required />
                                                    </div>

                                                <button  type = "submit" >Change</button> 
                                                             
                                                </form>
                                                {loading && <img className="loader-img" src={loader} alt="gradsuccess" />}
                                                 {error && <div className="FailedTagForm-d"> Something went wrong, pease try again.</div>}
                                        </div>
                                         )}

                                        </Mutation>  
                                </div>
                            </div>
                            <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
                        </Modal>

                </div>
                        </div>
                    }

                   
                </div>
                    );
                    }}
                </Query>
            );
        } else {
            return (
                 <div>
                        <Modal 
                           isOpen={this.state.showModal}
                           contentLabel="Minimal Modal Example"
                           style={customStyles}
                           ariaHideApp={false}
                        >
                          <LoginForm />
                          <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
                        </Modal>
                    </div>
            )
        }
    }
}
export default IndexPage