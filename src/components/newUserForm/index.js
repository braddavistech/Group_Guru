import React, { Component } from 'react';
import "./NewUser.css"

export default class NewUser extends Component {
  state = {
    landingPage: true,
    newUser: false,
    currentUser: false,
    currentPage: 1,
    firstName: "Enter First Name",
    lastName: "Enter Last Name",
    email: "Enter Email Address",
    username: "Enter Username (@ is not an allowed character)",
    password: "Enter Password",
    groupStatus: "",
    streetAdd: "Enter Your Street Address",
    city: "Enter City",
    stateId: "Enter State (TN, OH, etc)",
    zip: "Enter Zip Code",
    phone: "Enter Phone Number",
    preferredContact: ""
  }

  nextPage = () => {
    let tempNumber = this.state.currentPage + 1;
    this.setState({
      currentPage: tempNumber
    })
    this.forceUpdate();
  }

  previousPage = () => {
    let tempNumber = this.state.currentPage - 1;
    this.setState({
      currentPage: tempNumber
    })
    this.forceUpdate();
  }

  gatherInputValuesPage1 = () => {
    if (this.password.value === this.confirmPassword.value) {
    this.setState({
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        username: this.username.value,
        password: this.password.value,
        groupStatus: ""
      })
      this.nextPage();
    } else { console.log("Didn't match") }
    console.log(this.state);
  }

  testConsoleLog = () => {
    console.log(this.state)
  }

  gatherInputValuesPage2 = () => {
    this.setState({
      streetAdd: this.streetAdd.value,
      city: this.city.value,
      stateId: this.stateId.value,
      zip: this.zip.value,
      phone: this.phone.value,
      preferredContact: ""
    })
    console.log(this.state)
  }

  newUserPage1 = (
    <article id="newUserForm">
      <section className="newUserInputSection">
        <label htmlFor="firstName" className="newUserLabel">First Name</label>
        <input type="textArea" name="firstName" ref={(userInput) => this.firstName =
          userInput} className="newUserInput" placeholder={this.state.firstName}></input>
      </section>
      <section className="newUserInputSection">
        <label htmlFor="lastName" className="newUserLabel">Last Name</label>
        <input name="lastName" ref={(userInput) => this.lastName =
          userInput} className="newUserInput" placeholder={this.state.lastName}></input>
      </section>
      <section className="newUserInputSection">
        <label htmlFor="email" className="newUserLabel">Primary Email</label>
        <input name="email" ref={(userInput) => this.email =
          userInput} className="newUserInput" placeholder={this.state.email}></input>
      </section>
      <section className="newUserInputSection">
        <label htmlFor="username" className="newUserLabel">Username</label>
        <input name="username" ref={(userInput) => this.username =
          userInput} className="newUserInput" placeholder={this.state.username}></input>
      </section>
      <section className="newUserInputSection">
        <label htmlFor="password" className="newUserLabel">Password</label>
        <input name="password" ref={(userInput) => this.password =
          userInput} className="newUserInput" placeholder={this.state.password}></input>
      </section>
      <section className="newUserInputSection">
        <label htmlFor="confirmPassword" className="newUserLabel">Confirm Password</label>
        <input name="confirmPassword" ref={(userInput) => this.confirmPassword =
          userInput} className="newUserInput" placeholder="Re-Enter Password"></input>
      </section>
      <section id="newUserGroupRadioSection">
        <label htmlFor="groupStatus" className="newUserRadioLabel">Create a Group
            <input type="radio" name="groupStatus" className="newUserRadioBtn" value="new" /></label>
        <label htmlFor="groupStatus" className="newUserRadioLabel">Join a Group
            <input type="radio" name="groupStatus" className="newUserRadioBtn" value="join" /></label>
      </section>
      <section className="newUserDualButton">
        <button onClick={this.props.loginPage} id="newUserBtn">Back</button>
        <button onClick={this.gatherInputValuesPage1} id="newUserBtn">Continue</button>
      </section>
    </article>
  )

  newUserPage2 = (
    <div id="newUserForm">
      <section className="newUserInputSection">
        <label htmlFor="streetAdd" className="newUserLabel">Address</label>
        <input name="streetAdd" ref={(userInput) => this.streetAdd =
          userInput} className="newUserInput" placeholder={this.state.streetAdd}></input>
      </section>
      <section className="newUserInputSection">
        <label htmlFor="city" className="newUserLabel">City</label>
        <input name="city" ref={(userInput) => this.city =
          userInput} className="newUserInput" placeholder={this.state.city}></input>
      </section>
      <section className="newUserInputSection">
        <label htmlFor="stateId" className="newUserLabel">State</label>
        <input name="stateId" ref={(userInput) => this.stateId =
          userInput} className="newUserInput" placeholder={this.state.stateId}></input>
      </section>
      <section className="newUserInputSection">
        <label htmlFor="zip" className="newUserLabel">Zip</label>
        <input name="zip" ref={(userInput) => this.zip =
          userInput} className="newUserInput" placeholder={this.state.zip}></input>
      </section>
      <section className="newUserInputSection">
        <label htmlFor="phone" className="newUserLabel">Phone</label>
        <input name="phone" ref={(userInput) => this.phone =
          userInput} className="newUserInput" placeholder={this.state.phone}></input>
      </section>
      <p id="alertPreference">Select Perferred Communication</p>
      <section id="newUserGroupRadioSection">
        <label htmlFor="preferredContact" className="newUserRadioLabel">Text
            <input type="radio" name="preferredContact" className="newUserRadioBtn" value="phone" /></label>
        <label htmlFor="groupStatus" className="newUserRadioLabel">Email
            <input type="radio" name="preferredContact" className="newUserRadioBtn" value="email" /></label>
        <label htmlFor="groupStatus" className="newUserRadioLabel">None
            <input type="radio" name="preferredContact" className="newUserRadioBtn" value="none" /></label>
      </section>
      <section className="newUserDualButton">
        <button onClick={this.previousPage} id="newUserBtn">Back</button>
        <button onClick={this.gatherInputValuesPage2} id="newUserBtn">Continue</button>
      </section>
    </div>
  )


  render () {
    if (this.state.currentPage === 1) {
      return (
        <React.Fragment>
          {this.newUserPage1}
        </React.Fragment>
      )
    } else if (this.state.currentPage === 2) {
      return (
        <React.Fragment>
          {this.newUserPage2}
        </React.Fragment>
      )
    }
  }


}