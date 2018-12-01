import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import apiData from "../../modules/APIcalls";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";

class NavBar extends Component {
  state = {
    loggedIn: false,
    profileLoaded: false
  }

  logOut = () => {
    let newLoginDate = {
      lastLogin: new Date()
    }
    let userId = sessionStorage.getItem("currentUserId");
    apiData.updateItem("users", userId, newLoginDate).then(() => {
    this.props.logOut();
    sessionStorage.removeItem("currentUserId");
    sessionStorage.removeItem("lastLogin");
    sessionStorage.removeItem("groupId");
    sessionStorage.removeItem("inGroup");
    this.props.openGroup();
    this.setState({ currentUser: {}, profileLoaded: false})
    })
  }

  goHome = () => {
    $(".-toggle").hide();
    this.props.stayAtMain();
  }

  addGroup = () => {
    $(".-toggle").hide()
    this.props.joinGroup();
  }

  grabProfileInfo = () => {
    let userId = sessionStorage.getItem("currentUserId")
    apiData.getSingleType("users", `id=${userId}`).then(user => {
      let newUser = user[0];
      this.setState({ currentUser: newUser, profileLoaded: true })
    })
    this.props.refresh()
  }

  render() {
    if (this.props.loggedInStatus) {
      if (this.state.profileLoaded) {
        return (
          <nav className="navbar fixed-top flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link className="navLink" onClick={() => { this.goHome()}} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="navLink" onClick={() => { $(".-toggle").hide() }} to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="navLink" onClick={() => { this.addGroup() }} to="/joinGroup">Groups</Link>
              </li>
              <li className="nav-item">
                <Link className="navLink" onClick={() => { $(".-toggle").hide() }} to="/GroupGuru">*Logout*</Link>
              </li>
            </ul>
            <section id="logOutDropdown">
              <li className="navLink" onClick={() => { $(".-toggle").toggle() }} id="loggedInButton">{this.state.currentUser.username}</li>
              <p className="navLinkP -toggle hide" >Edit Profile</p>
              <p className="navLinkP -toggle hide" >Settings Preferences</p>
              <Link className="navLink -toggle hide" id="logOutBtn" onClick={this.logOut} to="/">Log Out</Link>
            </section>

          </nav>
        )
      } else {
        this.grabProfileInfo();
        return (<div><h1>Loading</h1></div>)
      }
    } else {
      return (
        <nav className="navbar fixed-top flex-md-nowrap p-0 shadow">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="navLink" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/">Login</Link>
            </li>
          </ul>
        </nav>
      )
    }

  }
}

export default NavBar