import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import {GET_ASSIGN_REGUEST} from "../graphql/queries"
import { Mutation } from 'react-apollo';

import {UPDATE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM} from '../graphql/mutations';
import {GET_EXPERT} from '../graphql/queries';

import { APPROVED_MAIL } from "../../api/sendMailEndpoint"
import { DECLINE_EMAIL } from "../../api/sendMailEndpoint"



class approveDeclineApplicationGraduateReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
           expert_id:"",
           form_id:"",

        }
        this.setRequestData = this.setRequestData.bind(this);
}
  setRequestData(data){
    let dataObj = data.getAssignRequest[0]
    this.setState({
      expert_id:dataObj.expert_id,
      form_id:dataObj.form_id,
    })
  }
  
sendNotification(appStatus){

  if(appStatus === "Application Declined"){

    let url = DECLINE_EMAIL
    let data = {
        expert_id: this.state.expert_id
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
      window.location.reload();
    }).catch(function(error){
       alert("Networks Error please try again, Later!");
    })


  }else if(appStatus === "Application Approved"){

    let url = APPROVED_MAIL
    let data = {
        expert_id: this.state.expert_id,
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
      window.location.reload();
    }).catch(function(error){
       alert("Networks Error please try again, Later!");
    })

  }else{
    alert("Networks Error please try again, Later!");
  }

}




render() {
    return(  
        <div>
        <Query 
        query={GET_ASSIGN_REGUEST}
        fetchPolicy = "no-cache"
        variables={{form_id:this.props.form_id }}
        onCompleted={(data)=>{
          this.setRequestData(data);
        }}
        >
            {({ loading, error, data }) => {
              if (loading) return (
                <div className = "loader">
                    <div className="loader_main_content">
                        <img  src={loader} alt="gradsuccess" />
                        <h1>preparing...</h1>
                    </div>
                </div>
                )
              if (error) return <div>failed to load data</div>
              return (
                <div className="approve_wrapper">
                    <div className="approve_wrapper_inner">
                        <Query 
                            query={GET_EXPERT}
                            variables={{ 
                                id:this.state.expert_id || '100000000000000'}}
                            >
                                {({ loading, error, data }) => {
                                  if (loading) return (
                                    <div></div>
                                    )
                                  if (error) return <div></div>
                                  return (
                                    <div className="form_preview">
                                      <p>Assign Application to <strong>{data.getExpert.first_name + " " + data.getExpert.last_name}</strong></p>
                                    </div>
                                  );
                                }}
                            </Query>

                             


                         <div className = "approve_decline_forms">
                        <Mutation 
                            mutation={UPDATE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM}
                            onError={this.error} 
                            onCompleted={data=>{
                                this.sendNotification("Application Approved");
                            }}>    
                        {(approveRequest, { data,loading, error}) => (    
                              <div className = "loader-wrapper">
                                <div id="submittedSucces" className="SuccessTagForm">
                                      Success! Redirecting...
                                  </div>
                                  <form 
                                  onSubmit={e => {
                                        e.preventDefault();
                                        approveRequest({ 
                                          variables: {
                                            id: this.props.id,
                                            has_expert:this.state.expert_id,
                                            status:"Assigned"

                                          }
                                         });
                                     }}
                                  >
                                      <input type = "submit"  value = "Approve" className = "approveBtn"/>         
                                  </form>
                                  {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                     {error && <div className="FailedTagForm"> Network problem, please try again</div>}
                            </div>
                             )}
                              </Mutation>
                              <Mutation 
                            mutation={UPDATE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM}
                            onError={this.error} 
                            onCompleted={data=>{
                                this.sendNotification("Application Declined");
                            }}>    
                        {(declineRequest, { data,loading, error}) => (    
                              <div className = "loader-wrapper">
                                <div id="submittedSucces" className="SuccessTagForm">
                                      Success! Redirecting...
                                  </div>
                                  <form 
                                  onSubmit={e => {
                                        e.preventDefault();
                                        declineRequest({ 
                                          variables: {
                                              id: this.props.id,
                                              has_expert:"0",
                                              status:"Vacant"

                                            }
                                         });
                                     }}
                                  >
                                      <input type = "submit"  value = "Decline" className = "declineBtn"/>         
                                  </form>
                                  {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                     {error && <div className="FailedTagForm"> Network problem, please try again</div>}
                            </div>
                             )}

                              </Mutation>

                              </div>
                    </div>
                </div>
              );
            }}
        </Query>



      </div>
    )
}
}
export default approveDeclineApplicationGraduateReview