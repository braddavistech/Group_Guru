import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../../groupGuruLogo.jpg';
import APIcalls from '../../modules/APIcalls';
import './LoginMain.css';


class LoginMain extends Component {
  state = {
    checkUserName: "",
    checkPassword: "",
    user: {},
    passwordCorrect: false,
    currentUser: false,
    checkUserProcess: false
  }

  checkUserExists = (tempName) => {
    this.checkUserProcess = false;
    let alreadyUser = false;
    APIcalls.getData().then(thisData => {
      thisData.forEach(existingUser => {
        if (existingUser.userName === tempName.userName) {
          if (existingUser.password === tempName.password) {
            this.setState({
              user: existingUser,
              currentUser: true,
              passwordCorrect: true
            })
          } else {
            alert(`${tempName.userName}, the password you entered is incorrect. Try again or click the link for forgot password.`)
          }
          alreadyUser = true;
          return alreadyUser;
        }
      })
    }).then(() => {
      if (!alreadyUser) {
        alert(`${this.state.checkUserName} does not exist. Try a different user name or create an account.`)
      } else if (alreadyUser && this.state.passwordCorrect) {
        console.log(this.state)
      } else {
        console.log("something went wrong")
      }
    }).then(() => this.setState({ checkUserProcess: false }))
  }

  userLogin = (event) => {
    if (this.userName.value === "" || this.password.value === "") {
      return alert("You must enter a username and a password.")
    } else {
      this.checkUserProcess = true;
      this.setState({
        checkUserName: this.userName.value,
        checkPassword: this.password.value,
        checkUserProcess: true,
        passwordCorrect: false,
        currentUser: false
      })
      let tempUser = {};
      tempUser.userName = this.userName.value;
      tempUser.password = this.password.value;
      this.checkUserExists(tempUser);
    }
  }



  displayUserName = () => {
    if (this.state.currentUser === false || this.state.userName === "" || this.state.checkUserProcess === true) {
      return null
    } else {
      return <h3>Welcome, {this.state.user.userName}, let's see what's going on.</h3>
    }
  }

  loadLogin = () => {
    return <section id="completeLogin">
      <img src={logo} className="Main-Logo" alt="Group Guru" />
      <p className="Main-Greeting">Welcome To Group Guru</p>
      <div className="Login">
        <h1 className="Login-Header">Existing User Login </h1>
        <section className="Login-Individual-Sections">
          <label className="Login-Labels">Username</label>
          <input type="text" id="userName" ref={input => this.userName = input} placeholder="Enter your username here" ></input>
        </section>
        <section className="Login-Individual-Sections">
          <label className="Login-Labels">Password</label>
          <input type="text" id="password" ref={password => this.password = password} placeholder="Enter your password"></input>
        </section>
        <section className="Login-Individual-Sections">
          <button className="submitButton" onClick={this.userLogin} id="loginSubmit">LOGIN</button>
          <Link to="./forgotPassword" id="forgotPassword">Forgot Password</Link>
          <Link to="./create" id="newUserLink">Don't have an accout? Create one.</Link>
        </section>
      </div>
    </section>
  }


  render() {
    const mainLogin = this.loadLogin();
    const username = this.displayUserName();

    return (
      <div className="Main">
        {username}
        {mainLogin}
      </div>

    );
  }
}

export default LoginMain;