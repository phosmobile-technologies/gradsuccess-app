const userReducer = (state, action) => {
  if (state === undefined) {
    return null
  }
  switch (action.type) {
    case "SAVE_USER_DETAILS": {
      return {
        ...state,
        ...action.data
      }
    }
    case "RESET_USER": {
      return null
    }
    default: {
      return state
    }
  }
}

export default userReducer
