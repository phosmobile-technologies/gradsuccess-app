import React, { Component } from "react"
import StarRatingComponent from "react-star-rating-component"

export default class RatingCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ratingSum: null,
      totalRating: null,
    }
  }

  componentDidMount() {
    const totalRating = this.props.ratings.length
    let ratingSum = 0
    this.props.ratings.map(rate => {
      ratingSum = ratingSum + parseInt(rate.rating)
    })

    this.setState({
      ratingSum: ratingSum / totalRating,
      totalRating,
    })
  }
  render() {
    return (
      <div>
        {" "}
        <div className="bp3-callout .modifier rating">
          <h4 className="bp3-heading">Associate Rating </h4>
          <div className="rating-t">
            Total: <span>{this.state.totalRating}</span>
          </div>
          <span className="rating-s">
            Current Rating:{" "}
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={this.state.ratingSum}
            />
          </span>
        </div>{" "}
      </div>
    )
  }
}
