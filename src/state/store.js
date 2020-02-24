import { createStore, combineReducers, compose } from "redux"
import cart from "./reducers/cartReducers"
import user from "./reducers/authReducer"
import loggedInUser from "./reducers/userReducer"
import chat from "./reducers/chatReducer"

export const initialState = {}

function saveToLocalStorage(state) {
  try {
    const serializeState = JSON.stringify(state)
    localStorage.setItem("state", serializeState)
  } catch (error) {
    console.log(error)
  }
}

function loadFromLocalStorage() {
  try {
    const serializeState = localStorage.getItem("state")
    if (serializeState === null) {
      return initialState
    } else {
      return JSON.parse(serializeState)
    }
  } catch (error) {
    console.log(error)
    return initialState
  }
}
// combining other reducers into a single reducer
const rootReducer = combineReducers({
  cart,
  user,
  loggedInUser,
  chat,
})

const persistedState = loadFromLocalStorage()
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers()

export const store = createStore(rootReducer, persistedState, enhancer)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
