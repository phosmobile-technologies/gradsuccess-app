import { React, Component } from "react"
import Modal from "react-modal"
import { Query } from "react-apollo";
import LoginForm from "../components/Forms/loginForm"
import Footer from '../components/Footer'
import RegisteredAccount from './registeredExperts'
import loader from "../../images/loader.gif"
import NewApplications from "./TableQueryData/newApplications"
import AssignedApplication from "./TableQueryData/assignedApplication"
import InProgressApplication from "./TableQueryData/inProgressApplication"
import CompletedApplication from "./TableQueryData/completedApplication"
import ExpertsComponent from "./registeredExperts"
import NotFoundPage from "../401"
import LogoutForm from "../components/Forms/logoutForm"
import MainLayout from "../components/ExpertAccountComponents/mainLayout"
import { LOGGED_IN_USER } from "../graphql/queries"
import ExpertClients from "./getExpertClients"
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

class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            NewApplications:true,
            AssignedApplication:false,
            InProgressApplication:false,
            CompletedApplication:false,
            ExpertsComponent:false,
            LeaveAMessageComponent:false,
            currentComponent:"New Applications",
            currentMenu:"NewApplications",
            loggedIn:"",
            client_id:null,
            toggle:true


            
        }
         this.handleDisplayComponent = this.handleDisplayComponent.bind(this);
         this.handleDisplayMessagingComponent = this.handleDisplayMessagingComponent.bind(this);
         this.toggleMenu = this.toggleMenu.bind(this);
    }
    componentDidMount(){
        this.setState({
            loggedIn:localStorage.getItem('auth-token') || ""
        })

        if (this.state.loggedIn === "") {
           this.setState({ showModal: true });
        }
    }
    handleDisplayMessagingComponent(client_id,client_name){
       this.setState({
            NewApplications:false,
            AssignedApplication:false,
            InProgressApplication:false,
            CompletedApplication:false,
            ExpertsComponent:false,
            LeaveAMessageComponent:false
        })

        this.setState({
            client_id:client_id,
            currentComponent:"Conversation with " + client_name,
            LeaveAMessageComponent:true,
            toggle:true
        })
    }


    handleDisplayComponent(event){
        let Component =  event.target.id;
        let currentComponent =  event.target.name;

        this.setState({
            NewApplications:false,
            AssignedApplication:false,
            InProgressApplication:false,
            CompletedApplication:false,
            ExpertsComponent:false,
            LeaveAMessageComponent:false
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
                                            className = {this.state.currentMenu === "ExpertsComponent" ? "currentMenu":""} 
                                            name = "Experts List" 
                                            id = "ExpertsComponent" 
                                            onClick = {this.handleDisplayComponent}>Experts
                                        </button>
                                        <LogoutForm />

                                          <ExpertClients expertID = {data.me.id} handleDisplayMessagingComponent = {this.handleDisplayMessagingComponent}/>
                                    </div>
                                </div>
                                <div>
                                    <MainLayout currentComponent = {this.state.currentComponent} toggleMenu = {this.toggleMenu}/>
                                    <div><h3 className = "form-header-main" >{this.state.currentComponent}</h3></div>
                                    <div className="client_main_area_content_area">
                                        {this.state.NewApplications && <NewApplications account_type = {data.me.account_type} expert_id = {data.me.id}/>}
                                        {this.state.AssignedApplication && <AssignedApplication account_type = {data.me.account_type} />}
                                        {this.state.InProgressApplication && <InProgressApplication account_type = {data.me.account_type} />}
                                        {this.state.CompletedApplication && <CompletedApplication account_type = {data.me.account_type} />}
                                        {this.state.ExpertsComponent && <ExpertsComponent />}
                                        {this.state.LeaveAMessageComponent && <LeaveAMessageForm  logged_in_user_id = {this.state.client_id} sender = {data.me.first_name +" "+ data.me.last_name} expert_id = {data.me.id}/>}
                                    </div>
                                     <Footer />
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