import React, { Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {GET_APPLICATION_REVIEW} from '../graphql/queries';
import { Query } from "react-apollo";


class AppRating extends Component {

    constructor(props) {
    super(props);
 
    this.state = {
      rating: this.props.ratingValue
    };
  }
  onStarClick(nextValue, prevValue, name) {
  }
    render() {
	    return (   

	    <Query 
        query={GET_APPLICATION_REVIEW}
        variables={{form_id:this.props.form_id }}
        
        >
            {({ loading, error, data }) => {
              if (loading) return (<div></div>
                )
              if (error) return <div>failed to load data</div>
              return (
              	<div className = "applicationReview" >
                  <h3>Application Review</h3>
                  <hr />
                	<div className = "ratingDiv">
      			        <h4>Rating:</h4>
      			        <StarRatingComponent 
      			          name="rate1" 
      			          starCount={5}
      			          value={Number(data.applicationReview.rating)}
      			          onStarClick={this.onStarClick.bind(this)}
      			        />
    			      	</div>
    			      	<div>
    			      		  <h4>Comment:</h4>
    			      		  <p>{data.applicationReview.comment}</p>
    			      	</div>
			          </div>
              );
            }}
        </Query>


	      
	    );
	    }
}

export default AppRating;
