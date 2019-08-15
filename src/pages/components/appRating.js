import React, { Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';


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
	      <div className = "ratingDiv">
	        <p>Rating:</p>
	        <StarRatingComponent 
	          name="rate1" 
	          starCount={5}
	          value={this.state.rating}
	          onStarClick={this.onStarClick.bind(this)}
	        />
	      </div>
	    );
	    }
}

export default AppRating;
