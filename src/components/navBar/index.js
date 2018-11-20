import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
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
    this.props.logOut();
    sessionStorage.removeItem("currentUserId");
    sessionStorage.removeItem("groupId");
    sessionStorage.removeItem("inGroup");
    this.setState({ currentUser: {}, profileLoaded: false})
    return <Redirect to="/"/>;
  }


  grabProfileInfo = () => {
    let userId = sessionStorage.getItem("currentUserId")
    apiData.getSingleType("users", `id=${userId}`).then(user => {
      let newUser = user[0];
      this.setState({ currentUser: newUser, profileLoaded: true })
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
                <Link className="nav-link" to="/GroupGuru">*Groups*</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/GroupGuru">*Logout*</Link>
              </li>
            </ul>
            <section id="logOutDropdown">
              <li className="nav-link" onClick={() => { $(".-toggle").toggle() }} id="loggedInButton">{this.state.currentUser.username}</li>
              <p className="nav-link -toggle hide" >Edit Profile</p>
              <p className="nav-link -toggle hide" >Settings Preferences</p>
              <p className="nav-link -toggle hide" onClick={this.logOut}><Link className="nav-link" to="/">Log Out</Link></p>
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