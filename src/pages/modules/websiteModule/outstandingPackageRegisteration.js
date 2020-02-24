
import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import Modal from "react-awesome-modal"
import LoginForm from "./components/Forms/loginForm"
import { connect } from 'react-redux';
import { navigate } from 'gatsby';

 class OutstandingPackageRegisteration extends Component {
   constructor(props) {
     super(props)
     this.state = {
       showModal: false,
     }
   }
   handlePrevRequests= ()=> {
     if (this.props.user === null) {
         this.handleOpenModal();
     }else{
       navigate("/complete-package")
     }
   }
   handleOpenModal=()=> {
     this.setState({ showModal: true })
   }
   handleCloseModal= () => {
     this.setState({ showModal: false })
   }

   render() {
     return (
       <div>
         <Button onClick={this.handlePrevRequests}>
           Complete previous requests
         </Button>

         <Modal
           visible={this.state.showModal}
           effect="fadeInUp"
           className="modal"
           onClickAway={() => this.handleCloseModal()}
         >
           <LoginForm />
         </Modal>
       </div>
     )
   }
 }
 

function mapStateToProps(state) {
  return {
    packages: state.cart.paidPackageList,
    user: state.user,
  }
}


export default connect(
  mapStateToProps,
  null
)(OutstandingPackageRegisteration)
