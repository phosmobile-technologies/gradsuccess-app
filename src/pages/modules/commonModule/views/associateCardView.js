import React, { Component } from "react"
import { Button } from "@blueprintjs/core"
import { navigate } from "gatsby"

export default class AssociateCardView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      associate: null,
    }
  }
  componentDidMount() {
    this.setState({
      associate: this.props.associate,
    })
  }

  render() {
    if (this.state.associate) {
      return (
        <div className="associate_card">
          <span>Associate: </span>
          <p>
            {this.state.associate.first_name +
              " " +
              this.state.associate.last_name}
          </p>
          <Button
            className="bp3-small bp3-intent-primary bp3-minimal"
            onClick={() => {
              navigate("/admin/account/dashboard/profile", {
                state: {
                  id: this.state.associate.id,
                },
              })
            }}
          >
            more details about associate
          </Button>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
