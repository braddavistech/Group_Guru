import React, { Component } from "react"
import NavBar from "./extras/nav"
import ApplicationViews from "./ApplicationViews"
import "./GroupGuru.css";
import "bootstrap/dist/css/bootstrap.min.css"

class GroupGuru extends Component {


  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    )
  }
}

export default GroupGuru