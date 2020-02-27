import React, { Component } from "react"
import { Link } from "gatsby"
import { Icon } from "@blueprintjs/core"
import logo from "../../../../images/logo2.png"
import UserHeaderCard from './../userHeaderCard';

export default class DashboardLayoutView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minimizeMenu: false,
    }
  }
  toggleMenu = () => {
    this.setState({
      minimizeMenu: !this.state.minimizeMenu,
    })
  }
  componentDidMount() {
    if (window.innerWidth <= 767) {
      this.setState({
        minimizeMenu: true,
      })
    }
  }

  render() {
    if (this.props.routes) {
      return (
        <div>
          <header
            className={
              " page-header " +
              (this.state.minimizeMenu ? "minimize-s-menu" : "")
            }
          >
            <div className="menu-image">
              <Link to="/">
                <img src={logo} alt="Gradsuccess" className="d-g-logo" />
              </Link>
              <Icon
                icon="cross"
                iconSize={20}
                color="white"
                className="m-icon-close"
                onClick={this.toggleMenu}
              />
            </div>

            <nav>
              <ul className="admin-menu">
                {this.props.routes.map((route, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={route.path}
                        activeClassName="currentMenu"
                        partiallyActive={true}
                      >
                        <Icon icon={route.icon} iconSize={15} color="black" className = "icon-dashboard"/>
                        <span>{route.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </header>

          <section
            className={
              " page-content " + (this.state.minimizeMenu ? "full-width" : "")
            }
          >
            <Icon
              icon="menu"
              className="h-menu"
              iconSize={25}
              color="black"
              onClick={this.toggleMenu}
            />
            <div className="d-nav-header">
              <div className="d-nav-header-inner">
                <Icon
                  icon="menu"
                  iconSize={20}
                  color="black"
                  className="m-icon"
                  onClick={this.toggleMenu}
                />
                <nav class="bp3-navbar .modifier">
                  <div class="bp3-navbar-group bp3-align-left">
                    <div class="bp3-navbar-heading">{this.props.title}</div>
                  </div>
                  <div class="bp3-navbar-group bp3-align-right">
                   <UserHeaderCard />

                    <button class="bp3-button bp3-minimal bp3-icon-home">
                      <Link to={this.props.routes[0].path}>Home</Link>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            <div className="page-content-inner">{this.props.body}</div>
            <footer className="page-footer">
              <small>
                Made with <span>❤</span> by{" "}
                <a
                  href="https:/phosmobile.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Phosmobile
                </a>
              </small>
            </footer>
          </section>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
