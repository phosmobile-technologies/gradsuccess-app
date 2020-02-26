
const assignedAssociateReducer = (state, action) => {
  if (state === undefined) {
    return null
  }
  switch (action.type) {
    case "ADD_ASSIGNED_ASSOCIATE": {
      return {
        ...state,
        id:action.id,
      }
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
