import React, { Component } from 'react';
import apiData from "../../modules/APIcalls";
import "./MainPage.css";
import CreateNewGroup from "../createObjects/group";



export default class MainPage extends Component {
  state = {
    profileLoaded: false,
    closeGroup: false,
    sendToGroup: false,
    inGroup: false,
    groupId: 0
  }

  componentDidMount = () => {
    let userId = sessionStorage.getItem("currentUserId");
    apiData.getSingleType("users", `id=${userId}`).then(user => {
      let newUser = user[0];
      this.setState({ currentUser: newUser, profileLoaded: true, inGroup: newUser.inGroup })
    })
  }

  stayAtMain = () => {
    let newGroup = sessionStorage.getItem("groupId");
    let groupChange = sessionStorage.getItem("inGroup")
    this.setState({ sendToGroup: false, groupId: newGroup, inGroup: groupChange });
  }

  closeGroupMessage = () => {
    this.setState({ closeGroup: true })
  }

  createJoinGroup = () => {
    this.setState({ sendToGroup: true, closeGroup: false })
  }

  render() {
    if (this.state.sendToGroup) {
      return <CreateNewGroup mainPage={this.stayAtMain} />;
    } else if (this.state.profileLoaded) {
      if (!this.state.inGroup) {
        return (
          <React.Fragment>
            <div className="topLeft">Test Area</div>
            <div className="topRight">Test</div>
            <div className="middleRow">
            </div>
            <div className="alertBottom">
              <article id="noGroupAlert">
                <h1 className="mainTitle">Welcome {this.state.currentUser.firstName}!</h1>
                <div id="groupOptions">
                  <section>
                    <h2 className="subTitle">You are not in any groups currently.</h2>
                    <h3 className="subTitle">Would you like to create or join a group?</h3>
                  </section>
                  <article id="loginNavButtonContainer">
                    <button value="noGroup" onClick={this.closeGroupMessage} className="loginNavButton">Not Now</button>
                    <button value="createGroup" onClick={this.createJoinGroup} className="loginNavButton">Let's Do It</button>
                  </article>
                </div>
              </article>
            </div>
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
            <div className="topLeft">Test Area</div>
            <div className="topRight">Test</div>
            <div className="middleRow"></div>
            <div className="alertBottom">
              <article id="noGroupAlert">
                <h1>This is where info on events for this group since last login will appear.</h1>
              </article>
            </div>
          </React.Fragment>
        )
      }
    } else {
      return (
        <React.Fragment>
          <div className="topLeft">Test Area</div>
          <div className="topRight">Test</div>
          <div className="middleRow">
            <h1 className="mainTitle">Welcome to Group Guru. We are loading your profile.</h1>
          </div>
          <div className="alertBottom">
            {this.noGroupAlert}
          </div>
        </React.Fragment>
      )
    }
  }
}