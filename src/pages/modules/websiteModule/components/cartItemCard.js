import { Button, Card, Elevation, Divider } from "@blueprintjs/core"
import React, { Component } from "react"  
import CurrencyFormat from "react-currency-format"
import { connect } from "react-redux"

 class CartItemCard extends Component {
   constructor(props) {
     super(props)
     this.state = {
       details:{}
     }
   }
   
   componentDidMount(){
    this.setState({
      details: this.props.details,
    })
   }
   render() {
     return (
       <div className="cart-item-card-container">
         {" "}
         <Card interactive={true} elevation={Elevation.ONE}>
           <h3 className="cart-item-title">
             {this.state.details.title}
             <span>
               <i> ( {this.state.details.turnAroundTime} ) </i>
             </span>
           </h3>
           <CurrencyFormat
             value={this.state.details.price}
             displayType={"text"}
             thousandSeparator={true}
             prefix={"₦"}
             renderText={value => (
               <div className="cart-item-price">{value}</div>
             )}
           />
           <Divider />
           <Button
             onClick={() => {
               this.props.removeFromCart(this.props.index)
               window.location.reload()
             }}
             className="bp3-intent-danger bp3-minimal"
           >
             Remove
           </Button>
         </Card>{" "}
       </div>
     )
   }
 }

function mapDispatchToProps(dispatch) {
  return {
    removeFromCart: index => {
      dispatch({
        type: "REMOVE_FROM_CART",
        index,
      })
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CartItemCard)
