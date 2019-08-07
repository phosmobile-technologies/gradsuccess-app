import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import {GET_ASSIGN_REGUEST} from "../graphql/queries"
import { Mutation } from 'react-apollo';

import {UPDATE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM} from '../graphql/mutations';



class GraduateSchoolEssayRedraftForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
           expert_id:"",
           form_id:""
        }
        this.setRequestData = this.setRequestData.bind(this);
}
  setRequestData(data){
    this.setState({
      expert_id:data.getAssignRequest.expert_id,
      form_id:data.getAssignRequest.form_id,
    })
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
                <div className="form_preview">
                    <div className="form_preview_inner">
                        <Mutation 
                            mutation={UPDATE_GRADUATE_SCHOOL_STATEMENT_REVIEW_FORM}
                            onError={this.error} 
                            onCompleted={data=>{
                                 this.formSubmitted(data)
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
                                            id: this.state.form_id,
                                            has_expert:this.state.expert_id,
                                            status:"Assigned"

                                          }
                                         });
                                     }}
                                  >
                                      <input type = "submit" className = "submit-details" value = "Approve" />         
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
                                 this.formSubmitted(data)
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
                                              id: this.state.form_id,
                                              has_expert:"0",
                                              status:"Vacant"

                                            }
                                         });
                                     }}
                                  >
                                      <input type = "submit" className = "submit-details" value = "Decline" />         
                                  </form>
                                  {loading && <div className = "loader"><img className="loader-img" src={loader} alt="gradsuccess" /></div>}
                                     {error && <div className="FailedTagForm"> Network problem, please try again</div>}
                            </div>
                             )}

                              </Mutation>


                    </div>
                </div>
              );
            }}
        </Query>


      </div>
    )
}
}
export default GraduateSchoolEssayRedraftForm