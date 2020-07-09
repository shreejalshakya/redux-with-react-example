import React, { Component } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import logo from "./logo.svg"
import "./App.css"

import BaseRouter from "./routes"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <BaseRouter />
        </Router>
      </div>
    )
  }
}

export default App
