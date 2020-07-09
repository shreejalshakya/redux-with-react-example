import { isAuthenticate } from "./authAction"

// Action Types
const LOGIN_START = "LOGIN_START"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_FAIL = "LOGIN_FAIL"
const LOGOUT = "LOGOUT"

// if no inital state is set then redux reducer will return undefined state.
const initialState = {
  isLoading: false,
  token: localStorage.getItem("token"),
  error: null,
  isAuthenticated: isAuthenticate(),
  alert: null,
}

const loginStart = (state, action) => {
  // update properties of state
  let nextState = {
    isLoading: action.isLoading,
    isAuthenticated: action.isAuthenticated,
  }
  // return {...state, ...nextState}
  return Object.assign({}, state, nextState)
}

const loginSuccess = (state, action) => {
  let nextState = {
    isLoading: action.isLoading,
    token: action.token,
    isAuthenticated: action.isAuthenticated,
    alert: action.alert,
  }
  return Object.assign({}, state, nextState)
}

const loginFail = (state, action) => {
  let nextState = {
    isLoading: action.isLoading,
    error: action.error,
    isAuthenticated: action.isAuthenticated,
    alert: action.alert,
  }
  return Object.assign({}, state, nextState)
}

const logout = (state, action) => {
  let nextState = {
    token: action.token,
    isAuthenticated: action.isAuthenticated,
    alert: action.alert,
  }
  return Object.assign({}, state, nextState)
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return loginStart(state, action)
    case LOGIN_SUCCESS:
      return loginSuccess(state, action)
    case LOGIN_FAIL:
      return loginFail(state, action)
    case LOGOUT:
      return logout(state, action)
    default:
      return state
  }
}

export default authReducer
