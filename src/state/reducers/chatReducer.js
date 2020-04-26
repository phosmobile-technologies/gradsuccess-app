const chatReducer = (state, action) => {
  if (state === undefined) {
    return null
  }
  switch (action.type) {
    case "SAVE_CHAT_HISTORY": {
      var messages = []
      messages = [...action.chats]
      return {
        ...state,
        messages,
      }
    }
    case "ADD_NEW_MESSAGE": {
      return {
        ...state,
        messages: [...state.messages, action.message],
      }
    }
    case "POP_MESSAGE": {
      var message = state.messages.filter(
        message => message.message !== action.message.message
      )
      return {
        ...state,
        messages: [...message],
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

export default chatReducer
