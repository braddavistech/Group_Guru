import React, { Component } from 'react';
import "./NewUserCreate.css";
import apiData from "../../../modules/APIcalls";
import testing from "../../../modules/dataFunctions";

export default class CreateNewUser extends Component {
  state = {
    groupStatus: "new",
    uniqueEmail: false,
    emailFormat: false,
    uniqueUsername: false,
    usernameFormat: false
  }

  gatherInputValues = () => {
    if (this.password.value === this.confirmPassword.value) {
      let temp = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        username: this.username.value,
        password: this.password.value
      }
      this.checkAndSave(temp);
    } else { alert("The passwords that you entered do not match. Please try again.") }
  }

  checkAndSave = (temp) => {
    if (temp.firstName === "") {
      alert("You must enter a first name.");
    } else if (temp.lastName === "") {
      alert("You must enter your last name.");
    } else if (temp.email === "") {
      alert("You must enter your email address.");
    } else if (this.state.emailFormat === false) {
      alert("You must enter a valid email address. Please try again.");
    } else if (this.state.uniqueEmail === false) {
      alert("This email address is already registered. Please try again.");
    } else if (temp.username === "") {
      alert("You must enter a username.");
    } else if (temp.username.length < 6) {
      alert("Your username must be at least 6 characters. Please try again.");
    } else if (this.state.usernameFormat === false) {
      alert("The username you entered is not valid in a valid format. Please try again.");
    } else if (this.state.uniqueUsername === false) {
      alert("This username is already registered. Please try again.");
    } else if (temp.password.length < 6) {
      alert("Your password must be at least 6 characters. Please try again.");
    } else if (this.state.uniqueUsername === true && this.state.uniqueEmail === true) {
      apiData.newDataPost(temp, "users").then(currentUser => {
        this.props.groupStatus(currentUser, this.state.groupStatus)
      })
    }
  }

  // check for duplicate email once RegEx format requirements are met and before saving
  checkForDupEmail = () => {
    let thisEmail = this.email.value;
    if (testing.emailAndUsernameValidation(thisEmail)) {
      this.setState({ emailFormat: true })
      apiData.getSingleType('users', `email=${thisEmail}`).then(email => {
        if (email.length === 0) {
          this.setState({ uniqueEmail: true })
        } else { this.setState({ uniqueEmail: false }) };
      })
    } else { this.setState({ emailFormat: false, uniqueEmail: false }) }
  }

  // check for duplicate username on keystrokes before saving and after length is met
  checkForDupUsername = () => {
    let thisUsername = this.username.value;
    if (thisUsername.length >= 6) {
      if (!testing.emailAndUsernameValidation(thisUsername)) {
        this.setState({usernameFormat: true})
        apiData.getSingleType('users', `username=${thisUsername}`).then(username => {
          if (username.length === 0) {
            this.setState({ uniqueUsername: true })
          } else { this.setState({ uniqueUsername: false }) };
        })
      } else { this.setState({ usernameFormat: false }) };
    } else { this.setState({ uniqueUsername: false, usernameFormat: false}) }
  }

  // handles changing state when different radio buttons are selected
  handleOptionChange = (changeEvent) => {
    this.setState({
      groupStatus: changeEvent.target.value
    });
  }


  render() {
    return (
      <article id="newUserForm">
        <section className="newUserInputSection">
          <label htmlFor="firstName" className="newUserLabel">First Name</label>
          <input name="firstName" ref={(userInput) => this.firstName =
            userInput} className="newUserInput" placeholder="Enter First Name"></input>
        </section>
        <section className="newUserInputSection">
          <label htmlFor="lastName" className="newUserLabel">Last Name</label>
          <input name="lastName" ref={(userInput) => this.lastName =
            userInput} className="newUserInput" placeholder="Enter Last Name"></input>
        </section>
        <section className="newUserInputSection">
          <label htmlFor="email" className="newUserLabel">Primary Email</label>
          <input name="email" ref={(userInput) => this.email =
            userInput} className="newUserInput" onChange={this.checkForDupEmail} placeholder="Enter Email Address"></input>
        </section>
        <section className="newUserInputSection">
          <label htmlFor="username" className="newUserLabel">Username</label>
          <input name="username" ref={(userInput) => this.username =
            userInput} className="newUserInput" onChange={this.checkForDupUsername} placeholder="Enter Username (@ is not an allowed character)"></input>
        </section>
        <section className="newUserInputSection">
          <label htmlFor="password" className="newUserLabel">Password</label>
          <input name="password" ref={(userInput) => this.password =
            userInput} className="newUserInput" placeholder="Enter Password"></input>
        </section>
        <section className="newUserInputSection">
          <label htmlFor="confirmPassword" className="newUserLabel">Confirm Password</label>
          <input name="confirmPassword" ref={(userInput) => this.confirmPassword =
            userInput} className="newUserInput" placeholder="Re-Enter Password"></input>
        </section>
        <section id="newUserGroupRadioSection">
          <label htmlFor="groupStatus" className="newUserRadioLabel">Create a Group
            <input type="radio" name="groupStatus" className="newUserRadioBtn" checked={this.state.groupStatus === "new"} onChange={this.handleOptionChange} value="new" /></label>
          <label htmlFor="groupStatus" className="newUserRadioLabel">Join a Group
            <input type="radio" name="groupStatus" className="newUserRadioBtn" checked={this.state.groupStatus === "join"} onChange={this.handleOptionChange} value="join" /></label>
        </section>
        <section className="newUserDualButton">
          <button onClick={this.props.loadLogin} id="newUserBtn">Back</button>
          <button onClick={this.gatherInputValues} id="newUserBtn">Continue</button>
        </section>
      </article>
    )
  }
}

