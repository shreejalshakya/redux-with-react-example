import React, { Component } from "react"
import { connect } from "react-redux"

import "./login.css"
import avatar from "./img_avatar2.png"
import { login as loginAction } from "../store/authAction"
import Spinner from "../spinner/spinner"
import Alert from "../alert/alert"

class Login extends Component {
  componentDidMount() {
    this.redirectIfAuthenticated(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.redirectIfAuthenticated(newProps)
  }

  redirectIfAuthenticated(props) {
    if (props.isAuthenticated) {
      this.props.history.push({
        pathname: "/",
        state: { from: { pathname: "/login" } },
      })
    }
  }

  submit = (event) => {
    event.preventDefault()
    let uname = event.target.elements.uname.value
    let psw = event.target.elements.psw.value
    console.log(uname, psw)
    this.props.login(uname, psw)
  }

  render() {
    let alert_box =
      this.props.error !== null ? (
        <Alert type={this.props.alert.type} message={this.props.alert.message} />
      ) : null

    return (
      <div id="page-content" className="animate-bottom">
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <div style={{ margin: "0px auto", marginTop: "40px", width: "500px" }}>
            {alert_box}
            <form onSubmitCapture={(event) => this.submit(event)}>
              <div className="imgcontainer">
                <img src={avatar} alt="Avatar" className="avatar" />
              </div>

              <div className="container">
                <label htmlFor="uname">
                  <b>Username</b>
                </label>
                <input type="text" placeholder="Enter Username" name="uname" required />

                <label htmlFor="psw">
                  <b>Password</b>
                </label>
                <input type="password" placeholder="Enter Password" name="psw" required />

                <button type="submit">Login</button>
              </div>

              <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
                <button type="button" className="cancelbtn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('Login state', state)
  return {
    isLoading: state.authReducer.isLoading,
    token: state.authReducer.token,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.isAuthenticated,
    alert: state.authReducer.alert,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(loginAction(username, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
