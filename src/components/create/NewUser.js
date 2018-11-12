import React, { Component } from "react";
import APIcalls from '../../modules/APIcalls';
import "./NewUser.css";
import "bootstrap/dist/css/bootstrap.min.css";

class CreateUser extends Component {

  state = {
    userName: "",
    password: "",
    newUser: true,
    checkUserProcess: false
  }

  checkUserExists = (tempName) => {
    // this.checkUserProcess = false;
    let alreadyUser = false;
    APIcalls.getData().then(thisData => {
      thisData.forEach(existingUser => {
        if (existingUser.userName === tempName.userName) {
          this.setState({ newUser: false })
          alreadyUser = true;
          return alreadyUser;
        }
      })
    }).then(() => {
      if (alreadyUser) {
        alert(`${this.state.userName} already exists. Enter a different username.`)
      } else {
        APIcalls.newUserData(tempName).then(() => {APIcalls.getData()})
      }
    }).then(() => this.setState({checkUserProcess: false}))
  }

  userCreate = (event) => {
    if (this.userName.value === "" || this.password.value === "") {
      return alert("You must enter a username and a password.")
    } else {
      this.setState({
        userName: this.userName.value,
        password: this.password.value,
        checkUserProcess: true
      })
      let tempUser = {};
      tempUser.userName = this.userName.value;
      tempUser.password = this.password.value;
      this.checkUserExists(tempUser);
    }
  }

  createUser = () => {
    return <section id="createUserForm">
      <h1 id="title">We are glad you are joining!</h1>
      <section className="Login-Individual-Sections">
          <label className="Login-Labels">Create Your Username</label>
          <input type="text" id="userName" ref={input => this.userName = input} placeholder="Enter Username Here"></input>
        </section>
        <section className="Login-Individual-Sections">
          <label className="Login-Labels">Create Your Password</label>
          <input type="text" id="password" ref={password => this.password = password} placeholder="Enter Password Here"></input>
        </section>
        <section className="Login-Individual-Sections">
          <button className="submitButton" onClick={this.userCreate} id="loginSubmit">Create Account</button>
        </section>
    </section>
  }

  render() {
    const form = this.createUser();

    return (
      <div className="Main">
        {form}
      </div>

    );
  }
}

export default CreateUser