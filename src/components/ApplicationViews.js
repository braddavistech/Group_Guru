// import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login";
// import APIcalls from "../modules/APIcalls"



export default class ApplicationViews extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <Login />
        {/* Need a load main page */}
      </React.Fragment>
    )
  }


}