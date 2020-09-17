import React from "react"
import { Link } from "gatsby"
import Image from "./logoImage"
import Modal from "react-awesome-modal"
import LoginForm from "./Forms/loginForm"
import CartItemIndicator from './cartItemIndicator';
import { connect } from "react-redux"
import LoggedIn from "./loggedIn"
import OutstandingPackageRegisteration from "../outstandingPackageRegisteration"
 /* eslint-disable */

 const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      showModal: false,
    }

    this.toggleIcon = this.toggleIcon.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  toggleIcon() {
    this.setState({
      toggle: !this.state.toggle,
    })
  }

  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <header>
        {/* Logo Area */}
        <div>
          <Modal
            visible={this.state.showModal}
            effect="fadeInUp"
            className="modal"
            onClickAway={() => this.handleCloseModal()}
          >
            <LoginForm />
          </Modal>
          <span
            css={{
              display: "none",
              [mq[2]]: {
                display: "block",
                fontSize: "40px",
                position: "absolute",
                padding: "20px",
                cursor: "pointer",
                top: "30px",
              },
            }}
            onClick={this.toggleIcon}
          >
            &#9776;
          </span>
          {/* <PromotionBanner /> */}
          <div className="top_coupon">
            Get 50% off your order with the coupon code<span>GSDISCOUNT50</span>
          </div>
          <div
            css={{
              width: "150px",
              margin: ".5em auto .1em",
            }}
          >
            {" "}
            <Link to="/">
              <Image />{" "}
            </Link>
            <CartItemIndicator />
          </div>
        </div>
        <ul
          css={{
            display: "flex",
            listStyle: "none",
            background: "#4A4A4A",
            justifyContent: "space-around",
            padding: ".5em 8em",
            textTransform: "uppercase",
            fontWeight: "700",
            fontSize: ".9em",
            color: "#47dcbc",
            margin: "0px",
            [mq[2]]: {
              display: "none",
            },
          }}
          id={this.state.toggle ? "toggle" : "null"}
        >
          <Link
            to="/admissions"
            activeStyle={{ color: "white" }}
            className="pad"
            id="one"
            css={{
              [mq[2]]: {
                marginTop: "5px",
              },
            }}
          >
            Admissions
          </Link>
          <Link
            to="/careers"
            activeStyle={{ color: "white" }}
            className="pad"
            partiallyActive={true}
          >
            Job/Careers
          </Link>
          <Link
            to="/scholarships"
            activeStyle={{ color: "white" }}
            className="pad"
            partiallyActive={true}
          >
            Scholarships
          </Link>
          <Link
            to="/about-us"
            activeStyle={{ color: "white" }}
            className="pad"
            partiallyActive={true}
          >
            About Us
          </Link>
          <Link
            to="/blog"
            activeStyle={{ color: "white" }}
            className="pad"
            partiallyActive={true}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            activeStyle={{ color: "white" }}
            className="pad"
            partiallyActive={true}
          >
            Contact
          </Link>
          {this.props.user === null ? (
            <button
              className="loginBtn"
              onClick={this.handleOpenModal}
              css={{
                color: "black",
              }}
            >
              login
            </button>
          ) : (
            <LoggedIn />
          )}

          {this.props.outstandingRequestReg && (
            <>
              {this.props.outstandingRequestReg.length > 0 && (
                <OutstandingPackageRegisteration />
              )}
            </>
          )}
        </ul>
      </header>
    )
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
)(Header)