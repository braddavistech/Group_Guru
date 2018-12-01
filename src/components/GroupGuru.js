import React, { Component } from "react";
import NavBar from "./navBar";
import ApplicationViews from "./ApplicationViews";
import apiData from "../modules/APIcalls"
import "./GroupGuru.css";
import "bootstrap/dist/css/bootstrap.min.css"

class GroupGuru extends Component {
  state = {
    loggedIn: false,
    inGroup: false,
    joinGroup: false,
    closeGroup: false,
    groupId: 0,
    sendToGroup: false,
    groupMessages: [],
    groupPhotos: [],
    profileLoaded: false
  }

  componentDidMount = () => {
    this.checkUserState()
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

  refreshData = () => {
    let userId = sessionStorage.getItem("currentUserId");
    apiData.getSingleType("users", `id=${userId}`).then(user => {
      let newUser = user[0];
      return newUser;
    })
      .then(newUser => {
        apiData.getSingleType("messages", `_expand=user&groupId=${newUser.groupId}`).then(messages => {
          messages.map(message => {
            message.user.password = "HIDDEN";
            message.user.securityAnswer = "HIDDEN";
            message.user.securityQuestionId = "HIDDEN";
            return messages;
          })
          this.setState({ groupMessages: messages, currentUser: newUser, groupId: newUser.groupId, profileLoaded: true, inGroup: newUser.inGroup })
        })
          .then(() => {
            apiData.getSingleType("photos", `_expand=user&groupId=${newUser.groupId}`).then(photos => {
              photos.map(photo => {
                photo.user.password = "HIDDEN";
                photo.user.securityAnswer = "HIDDEN";
                photo.user.securityQuestionId = "HIDDEN";
                return photos;
              })
              this.setState({ groupPhotos: photos })
            })
          })
      })
  }


  grabMessages = () => {

  }


  closeGroupMessage = () => {
    this.setState({ closeGroup: true })
  }

  openGroupMessage = () => {
    this.setState({ loggedIn: false, groupId: 0, inGroup: false, joinGroup: false, closeGroup: false, sendToGroup: false, groupMessages: [], currentUser: {} })
  }

  joinGroup = () => {
    this.setState({ joinGroup: true })
  }

  noJoinGroup = () => {
    this.setState({ joinGroup: false })
  }

  createJoinGroup = () => {
    this.setState({ sendToGroup: true, closeGroup: false })
  }

  stayAtMain = () => {
    this.setState({ sendToGroup: false, joinGroup: false });
  }

  logOut = () => {
    this.setState({ loggedIn: false })
  }

  toggleLogin = () => {
    this.setState({ loggedIn: true })
  }


  render() {
    return (
      <React.Fragment>
        <NavBar logOut={this.logOut} openGroup={this.openGroupMessage} refresh={this.refreshData} joinGroup={this.joinGroup} stayAtMain={this.stayAtMain} noJoinGroup={this.noJoinGroup} loggedInStatus={this.state.loggedIn} />
        <ApplicationViews loggedIn={this.toggleLogin} refresh={this.refreshData} joinGroup={this.joinGroup} createJoinGroup={this.createJoinGroup} closeGroupMessage={this.closeGroupMessage} stayAtMain={this.stayAtMain} main={this.state} />
      </React.Fragment>
    )
  }
}

export default GroupGuru