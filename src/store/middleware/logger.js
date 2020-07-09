function createLoggerMiddleware() {
  return ({ getState }) => (next) => (action) => {
    console.log("Dispatching action: ", action)

    // next() call's other middleware in the chain and return
    // action or updated action if any changes made by other middlewares.
    const updatedAction = next(action)

    console.log("New state: ", getState())
    return updatedAction
  }
}

const logger = createLoggerMiddleware()

export default logger
