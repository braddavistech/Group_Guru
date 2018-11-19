import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import testing from "../../modules/dataFunctions";
import $ from 'jquery';
import './ExistingUserLogin.css';
import apiData from "../../modules/APIcalls";


export default class LoginMain extends Component {
  state = {
    newUser: false
  }

  authenticateUser = () => {
    $(".alert").hide();
    let temp = {
      usernameOrEmail: this.usernameOrEmail.value,
      password: this.password.value
    }
    if (temp.usernameOrEmail.length < 6) {
      $("#invalidEmailAlert").show();
    } else if (temp.password.length < 6) {
      $("#passwordLengthAlert").show();
    } else if (testing.emailAndUsernameValidation(temp.usernameOrEmail)) {
      apiData.getSingleType('users', `email=${temp.usernameOrEmail}`).then(email => {
        if (email.length === 0) {
          $("#noEmailFoundAlert").show();
        } else if (email[0].password === temp.password) {
          sessionStorage.setItem("currentUserId", email[0].id);
          this.props.loggedIn();
        } else { $("#wrongPasswordAlert").show(); }
      })
    } else {
      apiData.getSingleType('users', `username=${temp.usernameOrEmail}`).then(username => {
        if (username.length === 0) {
          $("#noUsernameFoundAlert").show();
        } else if (username[0].password === temp.password) {
          sessionStorage.setItem("currentUserId", username[0].id);
          this.props.loggedIn();
        } else {
          $("#worngPasswordAlert").show();
        }
      })
    }
  }


  newUserForm = (event) => {
    this.setState({
      newUser: true
    })
  }

  render() {
    if (this.state.newUser) {
      return <Redirect to="/newUser" />
    } else {
      return (
        <div id="existingUserForm">
          <section id="logoContainer">
            <img src="../../groupGuruLogo.jpg" id="logoForLogin" alt="Group Guru Logo" />
            <article id="welcomeLoginMessage">
              <p id="welcome">Welcome</p>
              <p id="to">Let's Get Started</p>
            </article>
          </section>
          <section className="userLoginSection">
            <label htmlFor="usernameOrEmail" className="newUserLabel">Enter Username or Email<p id="noEmailFoundAlert" className="alert hide">The email you entered is not registered.</p><p id="noUsernameFoundAlert" className="alert hide">The username you entered is not registered.</p><p id="invalidEmailAlert" className="alert hide">Please enter a valid email address.</p><p id="invalidUsernameAlert" className="alert hide">Please enter a valid username.</p></label>
            <input name="usernameOrEmail" ref={(userInput) => this.usernameOrEmail =
              userInput} className="newUserInput" placeholder="Enter Username/Email"></input>
          </section>
          <section className="userLoginSection">
            <label htmlFor="password" className="newUserLabel">Enter Your Password<p id="wrongPasswordAlert" className="alert hide">The password entered is incorrect.</p><p id="passwordLengthAlert" className="alert hide">The password entered is too short. Please try again.</p></label>
            <input name="password" ref={(userInput) => this.password =
              userInput} className="newUserInput" placeholder="Enter Password"></input>
          </section>
          <article id="loginNavButtonContainer">
            <button value="Log In" onClick={this.authenticateUser} className="loginNavButton">Log In</button>
          </article>
        </div>
      )
    }
  }
}