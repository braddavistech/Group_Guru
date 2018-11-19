import React, { Component } from "react"
import { Link } from "react-router-dom"
import apiData from "../../modules/APIcalls"
import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css"
// import TestPrint from "./test";
// import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    loggedIn: false,
    profileLoaded: false
  }


  grabProfileInfo = () => {
    let userId = sessionStorage.getItem("currentUserId")
    apiData.getSingleType("users", `id=${userId}`).then(user => {
      let newUser = user[0];
      this.setState({ currentUser: newUser, profileLoaded: true})
    })
  }

  render() {
    if (this.props.loggedInStatus) {
      if (this.state.profileLoaded) {
      return (
        <nav className="navbar fixed-top flex-md-nowrap p-0 shadow">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="/GroupGuru">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/GroupGuru">Groups-Set to Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/GroupGuru">Logout-Set to Home</Link>
            </li>
            <p className="nav-link" id="loggedInButton">Logged in as {this.state.currentUser.firstName}.</p>
          </ul>
        </nav>
        )
      } else {
        this.grabProfileInfo();
        return (<div><h1>Loading</h1></div>)}
    } else {
      return (
        <nav className="navbar fixed-top flex-md-nowrap p-0 shadow">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Login</Link>
            </li>
          </ul>
        </nav>
      )
    }

  }
}

export default NavBar