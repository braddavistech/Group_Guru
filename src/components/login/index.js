import React, { Component } from 'react';
import './LoginMain.css';
import NewUserNav from "../newUserNav";


class LoginMain extends Component {
  state = {
    landingPage: true,
    newUser: false,
    currentUser: false,
  }

  radio() {
    if (this.state.landingPage === true) {
      return (
        <div id="loginNavButtonContainer">
          <button value="Log In" onClick={this.printConsole} className="loginNavButton">Log In</button>
          <button value="Create Account" onClick={this.newUserForm} className="loginNavButton">Create New User</button>
        </div>
      )
    } else if (this.state.newUser === true) {
      return <NewUserNav backToLogin={this.reloadLogin}/>;
    } else if (this.props.currentUser === true) {
      console.log("Current User")
    }
  }

  printConsole = () => {
    console.log("Need login function.");
  }

  reloadLogin = () => {
    this.setState({
      landingPage: true,
      newUser: false
    })
  }

  newUserForm = (event) => {
    this.setState({
      landingPage: false,
      newUser: true
    })
  }

  render() {
    let rdBtn = this.radio();

    return (
      <div className="Main">
        {rdBtn}
      </div>

    );
  }
}

export default LoginMain;