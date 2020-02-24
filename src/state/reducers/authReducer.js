const authReducer = (state, action) => {
  if (state === undefined) {
    return null
  }
  switch (action.type) {
    case "SAVE_LOGGEDIN_USER": {
      return {
        ...state,
        ...action.user,
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

export default authReducer
