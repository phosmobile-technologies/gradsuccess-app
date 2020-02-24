import React from "react"
import { connect } from "react-redux"
import swal from "sweetalert"

class PryButton extends React.Component {
  render() {
    return (
      <div>
        <button
          className={this.props.small ? "SmallButtonStyles" : "BigButtonStyles"}
          onClick={() => {
            this.props.addToCart(this.props.packageDetail)
            swal(
              this.props.packageDetail.title + " (" +  this.props.packageDetail.turnAroundTime + ") " +
                " Added to Cart continue to checkout or select another service THANK YOU ",
              "",
              "success",
              {
                button:"Continue",
                timer: 3000,
              }
            )
          }}
        >
          {this.props.text}
        </button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: item => {
      dispatch({
        type: "ADD_TO_CART",
        item,
      })
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PryButton)
