import { React, Component } from "react"
import Modal from "react-modal"
import { Query } from "react-apollo";
import LoginForm from "../components/Forms/loginForm"
import Footer from '../components/Footer'
import loader from "../../images/loader.gif"
import NewApplications from "./TableQueryData/newApplications"
import AssignedApplication from "./TableQueryData/assignedApplication"
import InProgressApplication from "./TableQueryData/inProgressApplication"
import CompletedApplication from "./TableQueryData/completedApplication"
import NotFoundPage from "../401"
import LogoutForm from "../components/Forms/logoutForm"
import MainLayout from "../components/ExpertAccountComponents/mainLayout"
import { LOGGED_IN_USER } from "../graphql/queries"
import ExpertClients from "./getExpertClients"
import ChangePassword from "../components/Forms/changePassword"
import EditProfile from "../components/Forms/editProfile"
import UpdateProfileImage from "../components/Forms/updateProfileImage"

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
            NewApplications:true,
            AssignedApplication:false,
            InProgressApplication:false,
            changePassword:false,
            CompletedApplication:false,
            LeaveAMessageComponent:false,
            currentComponent:"New Applications",
            currentMenu:"NewApplications",
            loggedIn:"",
            client_id:null,
            toggle:true,
            changePassword:false,
            editProfile:false,
            updateProfileImage:false


            
        }
         this.handleDisplayComponent = this.handleDisplayComponent.bind(this);
         this.handleDisplayMessagingComponent = this.handleDisplayMessagingComponent.bind(this);
         this.toggleMenu = this.toggleMenu.bind(this);
         this.handleCloseModal = this.handleCloseModal.bind(this);
         this.showEditComponent = this.showEditComponent.bind(this);
    }
    componentDidMount(){
        this.setState({
            loggedIn:localStorage.getItem('auth-token') || ""
        })

        if (this.state.loggedIn === "") {
           this.setState({ showModal: true });
        }

        const currentc = localStorage.getItem('currentC')
        if(localStorage.hasOwnProperty('currentC')){
            if(currentc === "LeaveAMessageComponent"){
                this.handleDisplayMessagingComponent(localStorage.getItem('clientI'),localStorage.getItem('clientN'));
            }else{
            this.setState({
                NewApplications:false,
                AssignedApplication:false,
                InProgressApplication:false,
                CompletedApplication:false,
                LeaveAMessageComponent:false,
                changePassword:false,
                editProfile:false,
                updateProfileImage:false,
                currentMenu:currentc,
                [currentc]:true
            })
            }

            switch(currentc){
                case "NewApplications":{
                    this.setState({
                        currentComponent:"New Applications"
                    })
                    break
                }
                case "AssignedApplication":{
                    this.setState({
                        currentComponent:"Assigned Applications"
                    })
                    break
                }
                case "InProgressApplication":{
                    this.setState({
                        currentComponent:"Applications in Progress"
                    })
                    break
                }
                case "CompletedApplication":{
                    this.setState({
                        currentComponent:"Completed Application"
                    })
                    break
                }
                case "LeaveAMessageComponent":{
                    this.setState({
                        currentComponent:"Message"
                    })
                    break
                }
                default:{
                    this.setState({
                        currentComponent:"New Applications"
                    })
                }
            }
        }else{
            this.setState({
                NewApplications:true,
            })
        }


    }
    handleDisplayMessagingComponent(client_id,client_name){
        localStorage.setItem("currentC","LeaveAMessageComponent");
        localStorage.setItem("clientI",client_id);
        localStorage.setItem("clientN",client_name);
       this.setState({
            NewApplications:false,
            AssignedApplication:false,
            InProgressApplication:false,
            CompletedApplication:false,
            LeaveAMessageComponent:false,
            changePassword:false,
            editProfile:false,
            updateProfileImage:false,
        })

        this.setState({
            client_id:client_id,
            currentComponent:"Conversation with " + client_name,
            LeaveAMessageComponent:true,
            toggle:true
        })
    }

    handleCloseModal () {
          this.setState({ 
              showModal: false,
              changePassword:false,
              NewApplications:true,
          });
    }

    handleDisplayComponent(event){
        let Component =  event.target.id;
        let currentComponent =  event.target.name;

        localStorage.setItem("currentC",Component);

        this.setState({
            NewApplications:false,
            AssignedApplication:false,
            InProgressApplication:false,
            CompletedApplication:false,
            LeaveAMessageComponent:false,
            changePassword:false,
            editProfile:false,
            updateProfileImage:false,
        })

        this.setState({
            [Component]:true,
            currentComponent:currentComponent,
            currentMenu:Component,
            toggle:true
        })
    }

    toggleMenu(){
        this.setState({
            toggle:!this.state.toggle
        })
    
    }

    showEditComponent(func){
        localStorage.setItem("currentC",func);
        this.setState({
            NewApplications:false,
            AssignedApplication:false,
            InProgressApplication:false,
            CompletedApplication:false,
            changePassword:false,
            LeaveAMessageComponent:false,
            editProfile:false,
            updateProfileImage:false,
            [func]:true,
        })
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
                    {data.me.account_type === "Client"?
                        <NotFoundPage />
                        :<div>
                    
                    <div className = "main-content">
                            <div className = "client_main_area">
                                <div className = "fixedHeader">
                                    <div className = "client_main_area_menu" id  = {this.state.toggle?"toggle_menu":""}>
                                        <div className = "logo-image"><img  src={discouted} alt="Logo" /></div>
                                        <button 
                                            className = {this.state.currentMenu === "NewApplications"? "currentMenu":""} 
                                            name = "New Applications" 
                                            id = "NewApplications" 
                                            onClick = {this.handleDisplayComponent}>New Applications
                                        </button>

                                        <button 
                                            className = {this.state.currentMenu === "AssignedApplication" ? "currentMenu":""} 
                                            name = "Assigned Applications" 
                                            id = "AssignedApplication" 
                                            onClick = {this.handleDisplayComponent}>Assigned Applications
                                        </button>

                                        <button 
                                            className = {this.state.currentMenu === "InProgressApplication" ? "currentMenu":""} 
                                            name = "In Progress Applications" 
                                            id = "InProgressApplication" 
                                            onClick = {this.handleDisplayComponent}>In Progress Applications
                                        </button>

                                        <button 
                                            className = {this.state.currentMenu === "CompletedApplication" ? "currentMenu":""} 
                                            name = "Completed Applications" 
                                            id = "CompletedApplication" 
                                            onClick = {this.handleDisplayComponent}>Completed Applications
                                        </button>
                                        <button 
                                            className = {this.state.currentMenu === "changePassword"? "currentMenu":""}
                                            id = "changePassword" 
                                            onClick = {this.handleDisplayComponent}>Change Password
                                        </button>
                                        <LogoutForm />
                                    </div>
                                </div>
                                <div>
                                    <MainLayout  currentComponent = {this.state.currentComponent} toggleMenu = {this.toggleMenu} id  = {data.me.id} accountName = {data.me.first_name + " " + data.me.last_name} email = {data.me.email} showEditComponent = {this.showEditComponent}/>
                                    <div className="client_main_area_content_area">
                                        {this.state.NewApplications && <NewApplications  expert_id = {data.me.id}  account_type = {data.me.account_type}/>}
                                        {this.state.AssignedApplication && <AssignedApplication expert_id = {data.me.id} account_type = {data.me.account_type} handleDisplayMessagingComponent = {this.handleDisplayMessagingComponent}/>}
                                        {this.state.InProgressApplication && <InProgressApplication expert_id = {data.me.id} account_type = {data.me.account_type} handleDisplayMessagingComponent = {this.handleDisplayMessagingComponent}/>}
                                        {this.state.CompletedApplication && <CompletedApplication expert_id = {data.me.id} account_type = {data.me.account_type}/>}
                                        {this.state.LeaveAMessageComponent && <LeaveAMessageForm  logged_in_user_id = {this.state.client_id} sender = {data.me.first_name +" "+ data.me.last_name} expert_id = {data.me.id}/>}
                                        {this.state.changePassword && <ChangePassword  id = {data.me.id} email = {data.me.email} closeModal = {this.handleCloseModal}/>}

                                        {this.state.editProfile && <EditProfile  
                                            first_name = {data.me.first_name}
                                            last_name = {data.me.last_name}
                                            email = {data.me.email}
                                            phone = {data.me.phone}
                                            id = {data.me.id}
                                            />}

                                        {this.state.updateProfileImage && <UpdateProfileImage  id = {data.me.id}/>}
                                    </div>
                                    <div className = "footer-hide">
                                     <Footer />
                                     </div>
                                </div>
                            </div>
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
                        </Modal>
                </div>
            )
        }
    }
}
export default IndexPage