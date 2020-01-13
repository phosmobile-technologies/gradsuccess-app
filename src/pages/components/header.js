import React from "react"
import { Link } from "gatsby"
import { jsx, css } from "@emotion/core"
import "./toggle.css"
import Image from "./logoImage"
import cartImage from "../../images/cart.png"
import Modal from "react-modal"
import LoginForm from "./Forms/loginForm"
import PromotionBanner from "./promotionBanner"

const breakpoints = [375, 576, 768]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const customStyles = {
  content: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      showModal: false,
      cartCounter: "",
    }

    this.toggleIcon = this.toggleIcon.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.getStoreCount = this.getStoreCount.bind(this)
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

  componentDidMount() {
    this.getStoreCount()
  }

  getStoreCount() {
    if (typeof window !== `undefined`) {
      if (localStorage.getItem("ItemsInCart") !== null) {
        var list = JSON.parse(localStorage.getItem("ItemsInCart"))

        if (list.length === 0 || list.length === null) {
          this.setState({
            cartCounter: "",
          })
        } else {
          this.setState({
            cartCounter: list.length,
          })
        }
      }
    }
  }

  render() {
    // let name = this.state.isToggle ? "mkRed" : null;
    return (
      <header>
        {/* Logo Area */}
        <div>
          <Modal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            style={customStyles}
            className="modelStyling"
            ariaHideApp={false}
          >
            <LoginForm />
            <a className="ModalCloseBut" onClick={this.handleCloseModal}>
              x
            </a>
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
                top: "70px",
              },
            }}
            onClick={this.toggleIcon}
          >
            &#9776;
          </span>
          <PromotionBanner />
          <div className="top_coupon">
<<<<<<< HEAD
            We've <strong>Launched!</strong> Get 50% off your order with the
            coupon code<span>LAUNCH50</span>
=======
            Happy <strong>New Year!</strong> Get 10% off your order with the
            coupon code<span>NEWYEAR10</span>
>>>>>>> refs/remotes/origin/master
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
            margin: "0px",
            [mq[2]]: {
              display: "none",
            },
          }}
          id={this.state.toggle ? "toggle" : "null"}
        >
          <Link
            to="/Admissions"
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
          <Link to="/Careers" activeStyle={{ color: "white" }} className="pad">
            Job/Careers
          </Link>
          <Link
            to="/Scholarships"
            activeStyle={{ color: "white" }}
            className="pad"
          >
            Scholarships
          </Link>
          <Link to="/about-us" activeStyle={{ color: "white" }} className="pad">
            About Us
          </Link>
          <Link to="/blog" activeStyle={{ color: "white" }} className="pad">
            Blog
          </Link>
          <Link to="/Contact" activeStyle={{ color: "white" }} className="pad">
            Contact
          </Link>
        </ul>

        <div className="cart_wrapper">
          <Link to="Cart" activeStyle={{ color: "white" }} className="pad">
            <div className="cart">
              <div>
                <span id="counter" className="cart_indicator">
                  {this.state.cartCounter}
                </span>
                <img src={cartImage} />
              </div>
            </div>
          </Link>
          <button className="loginBtn" onClick={this.handleOpenModal}>
            login
          </button>
        </div>
      </header>
    )
  }
}

export default Header
