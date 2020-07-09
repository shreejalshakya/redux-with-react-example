import React from "react"

import "./alert.css"

export const ALERT_ERROR = "ERROR"
export const ALERT_SUCCESS = "SUCCESS"
export const ALERT_INFO = "INFO"
export const ALERT_WARNING = "WARNING"

function Alert(props) {
  //   console.log("Alert: ", props)
  const type = props.type || ALERT_ERROR
  const className = `alert ${type.toLowerCase()}`
  const message = props.message
  return (
    <div className={className}>
      <span
        className="closebtn"
        onClickCapture={(event) => (event.target.parentElement.style.display = "none")}
      >
        &times;
      </span>
      <strong>{type.toLowerCase()}!</strong> {message}
    </div>
  )
}

export default Alert
