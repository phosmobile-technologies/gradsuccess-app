import { React, Component } from "react"
import { connect } from 'react-redux';
import defaultImage from "../../../images/default_profile_img.png"

 class UserHeaderCard extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    if(this.props.user){
        return (
          <div className="d-h-account">
            {this.props.user.details && (
              <div className="d-h-profile-img-wapper">
                <div className="d-h-profile-img">
                  {this.props.user.detailsprofile_image_ref ? (
                    <img src={this.props.user.detailsprofile_image_ref} />
                  ) : (
                    <img src={defaultImage} />
                  )}
                </div>

                <span><strong>Welcome,</strong> {this.props.user.first_name}</span>
              </div>
            )}
          </div>
        )
    }else{
        return <div></div>
    }
  }
}


function mapStateToProps(state) {
  return {
    user: state.loggedInUser,
    outstandingRequestReg: state.cart.paidPackageList,
  }
}


export default connect(
  mapStateToProps,
  null
)(UserHeaderCard)