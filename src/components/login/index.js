import React, { Component } from 'react';
// import { Link } from "react-router-dom";
// import logo from '../../groupGuruLogo.jpg';
// import APIcalls from '../../modules/APIcalls';
// import formUser from "../create/NewUser";
import './LoginMain.css';
import NewUser from '../newUserForm';


class LoginMain extends Component {
  state = {
    landingPage: true,
    newUser: false,
    currentUser: false,
  }
  // constructor(props) {
  //   super(props);
    // this.state = {
    //   currentUser: false,
    //   newUser: false,
    //   landingPage: true,
    //   formNow: "",
    //   checkUserName: "",
    //   checkPassword: "",
    //   user: {
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     username: "",
    //     password: "",
    //     createUserStatus: 1
    //   },
    //   passwordCorrect: false,
    //   checkUserProcess: false,

    // }
  // }

  radio() {
    if (this.state.landingPage === true) {
      return (
        <div id="loginNavButtonContainer">
          <button value="Log In" onClick={this.printConsole} className="loginNavButton">Log In</button>
          <button value="Create Account" onClick={this.newUserForm} className="loginNavButton">Create New User</button>
          <div className="test"></div>
        </div>
      )
    } else if (this.state.newUser === true) {
      return <NewUser loginPage={this.reloadLogin} infoPage1={this.gatherInputValuesPage1} user={this.state}/>;
    } else if (this.props.currentUser === true) {
      console.log("Current User")
    }
  }

  addUser = (userInputs) => {
    console.log(userInputs);
  }

  reloadLogin = () => {
    console.log("reload")
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