// import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login";
// import APIcalls from "../modules/APIcalls"



export default class ApplicationViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
      newUser: false,
      landingPage: true,
      formNow: "",
      checkUserName: "",
      checkPassword: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        createUserStatus: 1
      },
      passwordCorrect: false,
      checkUserProcess: false,
    }
  }

  componentDidMount() {
    // const newState = {}
    // APITools.getAllAnimals().then(animals => newState.animals = animals)
    // .then(() => APITools.getAllOwners()).then(owners => newState.owners = owners)
    // .then(() => APITools.getAllEmployees()).then(employees => newState.employees = employees)
    // .then(() => APITools.getAllLocations()).then(locations => newState.locations = locations)
    // .then(() => {
    //   this.setState(newState)
    // })
  }

  render () {
    console.log(this.props)
    return (
    <React.Fragment>
      <Login  currentUser={this.state}/>
    </React.Fragment>
    )
  }


}