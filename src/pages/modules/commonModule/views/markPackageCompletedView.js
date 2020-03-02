import React, { Component } from "react"
import { Mutation } from "react-apollo"
import { Callout, Spinner, Button, Icon, Intent } from "@blueprintjs/core"
import { REVIEW_PACKAGE } from "../../../graphql/mutations"
import { navigate } from "gatsby"
import StarRatingComponent from "react-star-rating-component"

export default class MarkPackageCompletedView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: null,
      rating: 1,
    }
  }

  handleForm=(event)=> {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  onStarClick=(nextValue, prevValue, name) =>{
    this.setState({rating: nextValue});
  }


  render() {
    const { rating } = this.state
    return (
      <Mutation
        mutation={REVIEW_PACKAGE}
        onError={this.error}
        onCompleted={data => {
          this.props.markPackageCompleted()
        }}
      >
        {(reviewPackage, { data, loading, error }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault()
                reviewPackage({
                  variables: {
                    associate_id: this.props.data.assigned_associate_id,
                    user_id: this.props.user.id,
                    rating: this.state.rating,
                    comment: this.state.comment,
                  },
                })
              }}
              ref={form => (this.form = form)}
              className=""
              id="cartForm"
            >
              {error && (
                <Callout className="bp3-intent-danger" icon="error">
                  {error.graphQLErrors.map(({ message }, i) => (
                    <span key={i}>{message}</span>
                  ))}
                </Callout>
              )}

              <div className="rate-package">
                <div className="rate-package-top">
                  <Icon icon="thumbs-up" iconSize={35} color="white" />
                  <h3>What was your experience like ?</h3>
                </div>
                <div className="rate-package-inputs">
                  <div className="star-a">
                    <span>Star Associate: </span>
                    <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      value={rating}
                      onStarClick={this.onStarClick}
                    />
                  </div>
                  <textarea
                    type="text"
                    className="bp3-input bp3-large"
                    required
                    placeholder="Leave a comment"
                    onChange={this.handleForm}
                    id="comment"
                    name="comment"
                    value={this.state.comment}
                  />

                  <Button
                    type="submit"
                    className="bp3-intent-success bp3-large"
                    loading={loading}
                  >
                    Rate Package
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}
