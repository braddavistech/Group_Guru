import React, { Component } from 'react';
import apiData from "../../modules/APIcalls";
import "./MainPage.css";


export default class MainPage extends Component {
  state = {
    profileLoaded: false
  }

  componentDidMount = () => {
    let userId = sessionStorage.getItem("currentUserId");
    apiData.getSingleType("users", `id=${userId}`).then(user => {
      console.log(user);
      let newUser = user[0];
      this.setState({ currentUser: newUser, profileLoaded: true})
    })
    console.log(this.state)
  }

  render() {
    if (this.state.profileLoaded) {
      return (
        <div className="groupMain">
          <article id="newUserForm">
            <h1 className="mainTitle">Welcome to Group Guru, {this.state.currentUser.firstName}.</h1>
            <h1 className="mainTitle">This is the main landing page.</h1>
            <h3 className="subTitle">Need to create fuctionality here.</h3>
          </article>
        </div>
      )
    } else {
      return (
        <div className="groupMain">
          <article id="newUserForm">
            <h1 className="mainTitle">Welcome to Group Guru. We are loading your profile.</h1>
          </article>
        </div>
      )
    }
  }
}