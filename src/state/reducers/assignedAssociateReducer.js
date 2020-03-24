
const assignedAssociateReducer = (state, action) => {
  if (state === undefined) {
    return null
  }
  switch (action.type) {
    case "ADD_ASSIGNED_ASSOCIATE": {
      return {
        ...state,
        id: action.id,
      }
    }

    case "ADD_PASWORD": {
      return {
        ...state,
        password: action.data.password,
        user_id:action.data.user_id
      }
    }

    case "REMOVE_PASWORD": {
      return null
    }

    case "DELETE_ASSIGNED_ASSOCIATE": {
      return null
    }
    default: {
      return state
    }
  }
}

export default assignedAssociateReducer
