import React, { Component } from "react"
import Layout from "./components/layout"
import { connect } from "react-redux"
import CoverLetterRedraft from "./components/Forms/coverLetterRedraft"
import GraduateSchoolEssayRedraft from "./components/Forms/graduateSchoolEssayRedraftForm"
import CoverLetterReview from "./components/Forms/coverLetterReviewForm"
import GraduateSchoolStatementReview from "./components/Forms/graduateSchoolStatementReviewForm"
import { navigate } from "gatsby"

class CompletePackageRegistration extends Component {
  constructor(props) {
    super()
    this.state = {
      packages: [],
      newPackageList: [],
      ePackage: {
        form: "",
        price: "",
        title: "",
      },
      user_id: null,
      numberOfPackages:0,
      currentFormNumber:1
    }
  }

  

  componentDidMount() {
    if (this.props.packages.length <= 0) {
      navigate("/")
    }
    if (!this.props.user) {
      this.setState({
        user_id: this.props.location.state.user_id,
      })
    } else {
      this.setState({
        user_id: this.props.user.id,
      })
    }
    var packageList = [...this.props.packages]
      var currentForm = packageList.shift()

      this.setState({
        ePackage: currentForm,
        newPackageList: packageList,
        packages: this.props.packages,
        numberOfPackages: this.props.packages.length,
      })
  }
  
  updatePackageList = () => {
    if (this.state.newPackageList.length > 0) {
      var packageList = this.state.newPackageList
      var currentForm = packageList.shift()

      this.setState({
        ePackage: currentForm,
        newPackageList: packageList,
        currentFormNumber:this.state.currentFormNumber+1
      })
      this.props.updateCart(this.state.newPackageList)
    } else {
      this.props.updateCart(this.state.newPackageList)
       navigate("/application-creation-success", {
         state: {
           password: this.props.location.state.password,
         },
       })
    }
  }
  render() {
    switch (this.state.ePackage.form) {
      case "redraft_one":
        return (
          <Layout>
            <div className="package-detail-wrapper">
              <CoverLetterRedraft
                packageDetail={this.state.ePackage}
                updatePackageList={() => this.updatePackageList()}
                user_id={this.state.user_id}
                numberOfPackages={this.state.numberOfPackages}
                currentFormNumber={this.state.currentFormNumber}
                assignedAssociate={this.props.assignedAssociate.id}
              />
            </div>
          </Layout>
        )
      case "redraft_two":
        return (
          <Layout>
            <div className="package-detail-wrapper">
              <GraduateSchoolEssayRedraft
                packageDetail={this.state.ePackage}
                updatePackageList={() => this.updatePackageList()}
                user_id={this.state.user_id}
                numberOfPackages={this.state.numberOfPackages}
                currentFormNumber={this.state.currentFormNumber}
                assignedAssociate={this.props.assignedAssociate.id}
              />
            </div>
          </Layout>
        )
      case "review_one":
        return (
          <Layout>
            <div className="package-detail-wrapper">
              <CoverLetterReview
                packageDetail={this.state.ePackage}
                updatePackageList={() => this.updatePackageList()}
                user_id={this.state.user_id}
                numberOfPackages={this.state.numberOfPackages}
                currentFormNumber={this.state.currentFormNumber}
                assignedAssociate={this.props.assignedAssociate.id}
              />
            </div>
          </Layout>
        )
      case "review_two":
        return (
          <Layout>
            <div className="package-detail-wrapper">
              <GraduateSchoolStatementReview
                packageDetail={this.state.ePackage}
                updatePackageList={() => this.updatePackageList()}
                user_id={this.state.user_id}
                numberOfPackages={this.state.numberOfPackages}
                currentFormNumber={this.state.currentFormNumber}
                assignedAssociate={this.props.assignedAssociate.id}
              />
            </div>
          </Layout>
        )
      default:
        return (
          <Layout>
            <div className="package-detail-wrapper">
              <h1>No Item</h1>
            </div>
          </Layout>
        )
    }
  }
}
function mapStateToProps(state) {
  return {
    packages: state.cart.paidPackageList,
    user: state.user,
    assignedAssociate:state.assignedAssociate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCart: cart => {
      dispatch({
        type: "UPDATE_CART",
        cart,
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletePackageRegistration)
