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
      numberOfPackages: 0,
      currentFormNumber: 1,
      assignedAssociateId:null
    }
  }

  

  componentDidMount() {
    if (this.props.packages.length <= 0) {
      navigate("/")
    }
    
    var packageList = [...this.props.packages]
      var currentForm = packageList.shift()

      this.setState({
        ePackage: currentForm,
        newPackageList: packageList,
        packages: this.props.packages,
        numberOfPackages: this.props.packages.length,
      })

    if(this.props.assignedAssociate){
      this.setState({
        assignedAssociateId: this.props.assignedAssociate.id
      })
    }
    if (this.props.location.state){
        
        if ({
          password:this.props.location.state.password,
          
        }) {
          let data = {
            password:this.props.location.state.password,
            user_id:this.props.location.state.user_id
          }
          this.props.addPassword(data)
        }
      
    }
      
    if (!this.props.user) {
      if (this.props.assignedAssociate) { 
        this.setState({
          user_id: this.props.assignedAssociate.user_id,
        })
      }else{
        this.setState({
          user_id: this.props.location.state.user_id,
        })
      }
    } else {
      this.setState({
        user_id: this.props.user.id,
      })
    }
  }
  
  updatePackageList = () => {
    if (this.state.newPackageList.length > 0) {
      this.props.updateCart(this.state.newPackageList)
      window.location.reload();
    } else {
      this.props.updateCart(this.state.newPackageList)
       navigate("/application-creation-success")
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
                assignedAssociate={this.state.assignedAssociateId}
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
                assignedAssociate={this.state.assignedAssociateId}
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
                assignedAssociate={this.state.assignedAssociateId}
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
                assignedAssociate={this.state.assignedAssociateId}
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
    addPassword: data => {
      dispatch({
        type: "ADD_PASWORD",
        data,
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletePackageRegistration)
