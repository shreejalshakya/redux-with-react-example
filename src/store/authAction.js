import Axios from "axios"

// Action Types
const LOGIN_START = "LOGIN_START"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_FAIL = "LOGIN_FAIL"
const LOGOUT = "LOGOUT"

// Action Creators
export function loginStart() {
  // Action Object
  return {
    type: LOGIN_START,
    isLoading: true,
    token: null,
    error: null,
    isAuthenticated: false,
    alert: null,
  }
}

export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    isLoading: false,
    token: token,
    error: null,
    isAuthenticated: true,
    alert: null,
  }
}

export function loginFail(error) {
  return {
    type: LOGIN_FAIL,
    isLoading: false,
    token: null,
    error: error,
    isAuthenticated: false,
    alert: {
      type: "ERROR",
      message: error.message,
    },
  }
}

export function logout() {
  localStorage.removeItem("token")
  return {
    type: LOGOUT,
    isLoading: false,
    token: null,
    error: null,
    isAuthenticated: false,
    alert: null,
  }
}

// Action with dispatch
export function login(username, password) {
  let payload = {
    username: username,
    password: password,
  }
  return (dispatch) => {
    dispatch(loginStart())
    // API call
    Axios.post("http://127.0.0.1:8000/api/login/", payload)
      .then((res) => {
        const token = res.data.token
        localStorage.setItem("token", token)
        setTimeout(() => {
          dispatch(loginSuccess(token))
          console.log("Success: ", token)
        }, 2000)
      })
      .catch((error) => {
        dispatch(loginFail(error.response.data))
        console.log("Error: ", error.response.status)
        console.log("Error: ", error.response.statusText)
        console.log("Error: ", error.response.data)
        console.log("Error: ", error.response.headers)
        console.log("Error: ", error.response.config)
        console.log("Error: ", error.response.request)
      })
  }
}

export function isAuthenticate() {
  const token = localStorage.getItem("token")
  const isAuthenticated =
    token && "YXV0aG9yOiBTaHJlZWphbCBTaGFreWE=" === token ? true : false
  return isAuthenticated
}
