import React from "react"
import {
  packageSelectAdmission,
  packageSelectCareer,
  packageSelectScholarship,
} from "./../../package_list"
import { Callout, Button } from "@blueprintjs/core"
import PriceBoxWithDescription from './../priceBoxWithDescription';
import { Link } from 'gatsby';
import dan from '../../../../../images/dan.jpeg'

export default class ExpertSpecificRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: "",
      itemInCart: {},
      associateDetail:null,
    }

    this.getItem = this.getItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.submitRequest = this.submitRequest.bind(this)
  }

  componentDidMount() {
    this.setState({
      associateDetail:this.props.associate.details
    })
  }

  getItem = packageForm => {
    let p = this.state.packages[packageForm]
    let letExists = this.state.itemInCart[packageForm]

    if (letExists === undefined) {
      this.setState(prevState => ({
        itemInCart: {
          ...prevState.itemInCart,
          [packageForm]: p,
        },
      }))
    } else {
      let NewItemsList = this.state.itemInCart
      delete NewItemsList[packageForm]

      this.setState(
        {
          itemInCart: NewItemsList,
        },
        () => {}
      )
    }
  }

  removeItem = packageForm => {
    let NewItemsList = this.state.itemInCart
    delete NewItemsList[packageForm]

    this.setState(
      {
        itemInCart: NewItemsList,
      },
      () => {
        document.getElementById(packageForm).checked = false
      }
    )
  }

  submitRequest() {
    localStorage.removeItem("ItemsInCart")
    Object.entries(this.state.itemInCart).map(obj => {
      const value = obj[1]

      let list = localStorage.getItem("ItemsInCart")
      let itemArr = []
      if (list) {
        itemArr = JSON.parse(list)
        itemArr.push(value)

        itemArr = Array.from(new Set(itemArr))

        localStorage.setItem("ItemsInCart", JSON.stringify(itemArr))

        this.setState({
          addItem: true,
        })

        var counter = JSON.parse(localStorage.getItem("ItemsInCart")).length
        document.getElementById("counter").innerHTML = counter
      } else {
        itemArr = []
        itemArr.push(value)
        localStorage.setItem("ItemsInCart", JSON.stringify(itemArr))

        this.setState({
          addItem: true,
        })

        var cartCounter = JSON.parse(localStorage.getItem("ItemsInCart")).length

        document.getElementById("counter").innerHTML = cartCounter
      }
      return true
    })
    localStorage.setItem("targeted", this.props.id)
    window.location = "/Cart"
  }

  render() {
    if (this.state.associateDetail){
      return (
        <div>
          <div className="expert-specific-wrapper">
            <div className=" expert-spe">
              <div className="img-wrapper">
                <div className="img-circle">
                  <img
                    // src={this.state.associateDetail.profile_image_ref}
                    src={dan}
                    alt="expert Specific"
                  />
                </div>
              </div>
              <div className="summary-div">
                <h2>{this.state.associateDetail.user_name}</h2>
                <p>{this.state.associateDetail.bio_bait}</p>
              </div>
            </div>

            <h2>How Can {this.state.associateDetail.user_name} Help You?</h2>

            <div className="package-options">
              <Callout className="bp3-intent-primary">
                <span>
                  {this.state.associateDetail.user_name}, will be pleased to
                  Help you <br />
                  - Have the best application that will make you easily
                  noticeable from the rest of the competition.
                  <br />- achieve their long and short term academic and
                  professional goals
                  <br />- One more step closer to the funding you need
                </span>
                <p className="note">
                  <strong>Note:</strong> You can select multiple package.
                </p>
              </Callout>
              <br />
              <br />

              <div className="e-s-package-container">
                <h1>Choose from our Admission Packages</h1>
                <div className="e-s-packages">
                  {packageSelectAdmission.map(packageItem => {
                    return (
                      <PriceBoxWithDescription
                        text={packageItem.value.title}
                        turnArroundTime={packageItem.value.turnAroundTime.toUpperCase()}
                        price={packageItem.label}
                        packageDetail={packageItem.value}
                        assignAssociate={this.props.associate.id}
                      />
                    )
                  })}
                </div>
              </div>

              <div className="e-s-package-container">
                <h1>Choose from our Career Packages</h1>
                <div className="e-s-packages">
                  {packageSelectCareer.map(packageItem => {
                    return (
                      <PriceBoxWithDescription
                        text={packageItem.value.title}
                        turnArroundTime={packageItem.value.turnAroundTime.toUpperCase()}
                        price={packageItem.label}
                        packageDetail={packageItem.value}
                        assignAssociate={this.props.associate.id}
                      />
                    )
                  })}
                </div>
              </div>

              <div className="e-s-package-container">
                <h1>Choose from our Scholarship Packages</h1>
                <div className="e-s-packages">
                  {packageSelectScholarship.map(packageItem => {
                    return (
                      <PriceBoxWithDescription
                        text={packageItem.value.title}
                        turnArroundTime={packageItem.value.turnAroundTime.toUpperCase()}
                        price={packageItem.label}
                        packageDetail={packageItem.value}
                        assignAssociate={this.props.associate.id}
                      />
                    )
                  })}
                </div>
              </div>
              <Link to="cart">
                <Button className="bp3-intent-success bp3-large e-s-btn">
                  Proceed
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )
    }else{
     return  <div></div>
    }
      
  }
}
