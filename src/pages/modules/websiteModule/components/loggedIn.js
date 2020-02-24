import React, { Component } from "react"
import { Link } from "gatsby"
import { Button } from "@blueprintjs/core"

class LoggedIn extends Component {
  render() {
    return (
      <div>
        <Link to="/auth.user">
          <Button
            className="bp3-small logged-in-indicator"
            icon="dashboard"
            minimal={true}
          >
            Dashboard
          </Button>
        </Link>
      </div>
    )
  }
}



export default LoggedIn
