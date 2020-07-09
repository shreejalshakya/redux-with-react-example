import React from "react"
import { Route } from "react-router-dom"

import Login from "./login/login"
import Home from "./home/home"

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/login/" component={Login} />
  </div>
)

export default BaseRouter
