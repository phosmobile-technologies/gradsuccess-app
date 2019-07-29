import React from 'react';
import LoginForm from "../components/Forms/loginForm";
import Modal from "react-modal"

const customStyles = {
  content : {
    top                   : '0%',
    left                  : '0%',
    width                 : '100%',
    height                : '100%',
    backgroundColor       : 'rgba(255,255,255,0.3)'
  }
};

export default class formCompletePage extends React.Component {


	constructor(props) {
		super(props);
		this.state= {
			password:null,
			showModal:false
		}
	this.handleModal = this.handleModal.bind(this);
	this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	componentDidMount(){
		this.setState({
			password:localStorage.getItem("yshKSMCis129_#&NISis")
		})
	}
	handleModal(){
		this.setState({
			showModal:true
		})
	}
	handleCloseModal () {
        this.setState({ showModal: false });
    }

	render() {
		return (
			<div>
			 <div className = 'thank-you'>
			 	<div className = "thank-you-inner-left">
			 		<h1>Thank You <i>!</i></h1>
	            	<div>
	            		<p>Your Application was successfully Submitted, </p>
	            		<p>Our team of expert will contact via any means of communication provided in form.</p>
	            		<br />
	            		<p>the code provided below is your login password to dashboard, if there is any additional infomation  or correction to the 
	            		information provided previously leave a message on your page </p>
	            	</div>
			 	</div>
            	
            	<div>
            		<div className = "passwordCard"><p>This is your login password: </p><h1>{this.state.password}</h1></div>
            		<div className = "cartStyle">
            		<button onClick = {this.handleModal}>Login</button>
            		</div>
            	</div>
            </div>
             <div>
                <Modal 
                   isOpen={this.state.showModal}
                   contentLabel="Minimal Modal Example"
                   style={customStyles}
                   ariaHideApp={false}
                >
                  <LoginForm />
                  <a className = "ModalCloseBut" onClick={this.handleCloseModal}>x</a>
                </Modal>
            </div>

            </div>
		);
	}
}
