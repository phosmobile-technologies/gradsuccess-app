import React, { Component } from "react"
import DashboardView from "../views/dashboardView"
import { connect } from "react-redux"
class userIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      packages: [],
    }
  }

  componentDidMount() {
    const allUserPackages = this.props.userPackages
    let newPackageList = this.state.packages
      .concat(
        allUserPackages.cover_letter_redrafts,
        allUserPackages.cover_letter_reviews,
        allUserPackages.graduate_school_essay_redrafts,
        allUserPackages.graduate_school_statement_review,
        allUserPackages.resume_reviews
      )
      .sort(function(a, b) {
        var created_at_a = a.created_at,
          created_at_b = b.created_at
        if (created_at_a < created_at_b)
          //sort string ascending
          return 1
        if (created_at_a > created_at_b) return 1 * -1
        return 0 //default return value (no sorting)
      })
    this.setState({
      packages: newPackageList,
    })
  }

  render() {
    return (
      <div>
        <DashboardView userPackages={this.state.packages} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userPackages: state.loggedInUser,
  }
}

export default connect(
  mapStateToProps,
  null
)(userIndex)
