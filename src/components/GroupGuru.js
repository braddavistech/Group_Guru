import React, { Component } from "react";
import NavBar from "./navBar";
import ApplicationViews from "./ApplicationViews";
import apiData from "../modules/APIcalls"
import "./GroupGuru.css";
import "bootstrap/dist/css/bootstrap.min.css"

class GroupGuru extends Component {
  state = {
    loggedIn: false
  }

  checkUserState = () => {
    const userId = sessionStorage.getItem("currentUserId");
    if (userId !== null) {
      apiData.getSingleType("users", `id=${userId}`).then(user => {
        let newUser = user[0];
        this.setState({ currentUser: newUser, profileLoaded: true, loggedIn: true })
      })
    }
  }

  componentDidMount = () => {
    this.checkUserState()
  }

  // componentDidUpdate = () => {
  //   this.checkUserState()
  // }

  toggleLogin = () => {
    this.setState({ loggedIn: true })
  }


  render() {
    return (
      <React.Fragment>
        <NavBar loggedInStatus={this.state.loggedIn} />
        <ApplicationViews loggedIn={this.toggleLogin} />
      </React.Fragment>
    )
  }
}

export default GroupGuru