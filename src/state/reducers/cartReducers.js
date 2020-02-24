
const cartReducer = (state, action) => {
  if(state === undefined){
    return {
      cartItems:[],
      paidPackageList:[],
      total:0,
      subTotal:0
    }
  }
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        cartItems: [...state.cartItems, action.item],
        subTotal: calculateSubTotal(state.cartItems),
      }
    }
    case "SAVE_PAID_PACKAGE_LIST": {
      return {
        ...state,
        cartItems:[],
        paidPackageList: action.items,
        total: 0,
        subTotal: 0,
      }
    }
    case "REMOVE_FROM_CART": {
      const cartItems = [...state.cartItems]
      cartItems.splice(action.index, 1)
      return {
        ...state,
        cartItems: cartItems,
        subTotal: calculateSubTotal(cartItems),
      }
    }

    case "CALCULATE_SUB_TOTAL": {
      const cartItems = [...state.cartItems]
      return {
        ...state,
        subTotal: calculateSubTotal(cartItems),
      }
    }
    case "CALCULATE_TOTAL": {
      const cartItems = [...state.cartItems]
      return {
        ...state,
        total: calculateTotal(cartItems, action.amount),
      }
    }
    case "UPDATE_CART": {
      return {
        ...state,
        paidPackageList: action.cart,
      }
    }

    default: {
      return state
    }
  }
}

/* eslint-disable */

function calculateSubTotal(cartItems) {
  var subTotal = 0
  cartItems.map(item => {
    subTotal += parseInt(item.price)
  })

  return subTotal
}


function calculateTotal(cartItems, amount) {
  var subTotal = 0
  cartItems.map(item => {
    subTotal += parseInt(item.price)
  })

  return parseFloat(subTotal) - parseFloat(amount)
}


export default cartReducer;