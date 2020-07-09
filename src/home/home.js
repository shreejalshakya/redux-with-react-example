import React, { Component } from "react"
import { connect } from "react-redux"

import { logout as logoutAction } from "../store/authAction"
import Spinner from "../spinner/spinner"

class Home extends Component {
  componentDidMount() {
    this.redirectIfNotAuthenticated(this.props)
  }
  componentWillReceiveProps(newProps) {
    this.redirectIfNotAuthenticated(newProps)
  }

  redirectIfNotAuthenticated(props) {
    if (!props.isAuthenticated) {
      props.history.push({
        pathname: "/login",
        state: { from: { pathname: "/" } },
      })
    }
  }

  // componentWillUpdate (nextProps, nextState) {
  //     console.log("componentWillUpdate:", nextProps)
  //     if (!nextProps.isAuthenticated) {
  //         this.props.history.push({
  //             pathname: "/login",
  //             state: { from: {pathname: "/"}}
  //         })
  //     }
  // }

  logout = (event) => {
    this.props.logout()
  }

  render() {
    return (
      <div id="page-content" className="animate-bottom">
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
              <button
                type="button"
                className="cancelbtn"
                onClickCapture={(event) => this.logout(event)}
              >
                Logout
              </button>
            </div>
            <h2>Hey! you are logged in.</h2>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToPros = (state) => {
  // console.log('Home state', state)
  return {
    isLoading: state.authReducer.isLoading,
    error: state.authReducer.error,
    token: state.authReducer.token,
    isAuthenticated: state.authReducer.isAuthenticated,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  }
}
export default connect(mapStateToPros, mapDispatchToProps)(Home)
