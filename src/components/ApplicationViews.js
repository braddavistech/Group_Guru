import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login/LoginMain";
// import APIcalls from "../modules/APIcalls"



export default class ApplicationViews extends Component {

  state = {

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
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <Login  />
        }} />
      </React.Fragment>
    )
  }


}