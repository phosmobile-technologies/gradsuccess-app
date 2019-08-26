import { React, Component } from "react"
import { Query } from "react-apollo";
import loader from "../../images/loader.gif"
import {GET_USER} from "../graphql/queries"
import {EXPERT_AVERAGE_RATING} from "../../api/sendMailEndpoint"
import StarRatingComponent from 'react-star-rating-component';

class ExpertDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expertRating:0
        }
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
        console.log(error);
    })
}

onStarClick(nextValue, prevValue, name) {
}

render() {
    return(  
        <div>
        <Query 
        query={GET_USER}
        variables={{id:this.props.expertID }}
        
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
                <div className="form_preview form_preview_solid_bg">
                    <div className="form_preview_inner">
                        <h3 className = "form-header" >Details </h3>
                        <div className = "form-div">
	                        <div>
	                        	<img src = {this.props.imgUrl} />
                                <div className = "detail_rating">
                                    <p><span>{this.state.expertRating}</span> star rating:</p>
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
	                                <p>{data.user.first_name + " " + data.user.last_name}</p>
	                            </div>
	                             <div className="form_preview_fields"> 
	                                <small>Phone:</small>
	                                <p>{data.user.phone}</p>
	                            </div>
	                            <div className="form_preview_fields"> 
	                                <small>Email:</small>
	                                <p>{data.user.email}</p>
	                            </div>
	                             <br />
	                            <div className = "spacing">
	                                
	                            </div>
	                        </div>
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
export default ExpertDetail;
