import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import {GET_EXPERT_CLIENTS_COVER_LETTER_REVIEW} from "../graphql/queries"
import {GET_EXPERT_CLIENTS_RESUME_REVIEW_FORM} from "../graphql/queries"
import {GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM} from "../graphql/queries"
import { GET_EXPERT_CLIENTS_COVER_LETTER_REDRAFT } from "../graphql/queries"
import {GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM} from "../graphql/queries"


class ExpertClients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientList:[]
        }

        this.updateClientList = this.updateClientList.bind(this)
    }

    updateClientList(data){
        data.map(value => {
            this.setState({
                clientList:[...this.state.clientList,value]
            })
        })
    }


render() {
    return(  
        <div>
            <Query 
        query={GET_EXPERT_CLIENTS_COVER_LETTER_REVIEW}
        variables={{ has_expert: this.props.expertID }}
        onCompleted={data => this.updateClientList(data.getExpertClientsCoverLetterReview)}
        >
            {({ loading, error, data }) => {
             if (loading) return (<div ></div>)
              if (error) return <div>failed to load data</div>
              return (
                <div>
                </div>
              );
            }}
        </Query>
        <Query 
        query={GET_EXPERT_CLIENTS_RESUME_REVIEW_FORM}
        variables={{ has_expert: this.props.expertID }}
        onCompleted={data => this.updateClientList(data.getExpertClientsResumeReviewForm)}
        >
            {({ loading, error, data }) => {
             if (loading) return (<div></div>)
              if (error) return <div>failed to load data</div>
              return (
                <div >
                </div>
              );
            }}
        </Query>
        <Query 
        query={GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM}
        variables={{ has_expert: this.props.expertID }}
        onCompleted={data => this.updateClientList(data.getExpertClientsGraduateSchoolStatementReviewForm)}
        >
            {({ loading, error, data }) => {
             if (loading) return (<div></div>)
              if (error) return <div>failed to load data</div>
              return (
                <div >
                    
                </div>
              );
            }}
        </Query>
        <Query 
        query={GET_EXPERT_CLIENTS_COVER_LETTER_REDRAFT}
        variables={{ has_expert: this.props.expertID }}
        onCompleted={data => this.updateClientList(data.getExpertClientsCoverLetterRedraft)}
        >
            {({ loading, error, data }) => {
             if (loading) return (<div></div>)
              if (error) return <div>failed to load data</div>
              return (
                <div>
                </div>
              );
            }}
        </Query>
        <Query 
        query={GET_EXPERT_CLIENTS_GRADUATE_SCHOOL_ESSAY_REDRAFT_FORM}
        variables={{ has_expert: this.props.expertID }}
        onCompleted={data => this.updateClientList(data.getExpertClientsGraduateSchoolEssayRedraftForm)}
        >
            {({ loading, error, data }) => {
             if (loading) return (<div></div>)
              if (error) return <div>failed to load data</div>
              return (
                <div >
                   
                </div>
              );
            }}
        </Query>
        <div className = "assigned_application_board">
            <h5>Assigned application</h5>
          {this.state.clientList.map(client=>{
              return(
                <div>
                  <button className = "clientItem"><p >{client.name}</p></button>
                </div>
              )
            })}
        </div>
                </div>
    )
}
}
export default ExpertClients