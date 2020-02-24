import React from "react"
import Select from "react-select"
import {
  packageSelectAdmission,
  packageSelectCareer,
  packageSelectScholarship,
} from "./../../package_list"
import chroma from "chroma-js"
import { Callout } from "@blueprintjs/core"

export default class ExpertSpecificRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: "",
      itemInCart: {},
      associateDetail:null
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
            <div>
              <div className="featured-experts-single expert-spe ">
                <div className="img-div">
                  <img
                    src={this.state.associateDetail.profile_image_ref}
                    alt="expert Specific"
                  />
                </div>
                <div className="summary-div">
                  <h2>{this.state.associateDetail.user_name}</h2>
                  <p>{this.state.associateDetail.bio_bait}</p>
                </div>
              </div>
            </div>

            <h2>How Can {this.state.associateDetail.user_name} Help You?</h2>

            <div className="package-options">
              <Callout className="bp3-intent-success" icon="insert">
                <span>Welcome,</span> <br />
                <h3>{this.state.associateDetail.user_name}</h3>
                <span>
                  will be pleased to Help you <br />
                  - Have the best application that will make you easily
                  noticeable from the rest of the competition.
                  <br />- achieve their long and short term academic and
                  professional goals
                  <br />- One more step closer to the funding you need
                </span>
                <p>
                  <span>Note:</span> You can select multiple package.
                </p>
              </Callout>
              <br />
              <br />

              <div>
                Choose from our Admission Packages
                <Select
                  options={packageSelectAdmission}
                  styles={customStyles}
                  label="Single select"
                />
              </div>

              <div>
                Choose from our Career Packages
                <Select options={packageSelectCareer} styles={customStyles} />
              </div>

              <div>
                Choose from our Scholarship Packages
                <Select
                  options={packageSelectScholarship}
                  styles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }else{
     return  <div></div>
    }
      
  }
}

const customStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: "white",
    width: "500px",
    padding: "10px",
    marginTop: "10px",
  }),
  option: (styles, { data }) => {
    return {
      ...styles,
    }
  },
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
}

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
})
