import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login";
import About from "./about";
import MainPage from "./mainPage";
import CreateNewUser from "./createObjects/userAccountCreate";
import MoreInfoForm from "./createObjects/moreInfoForm";
import ExistingUserLogin from "./existingUserLogin";
import CreateNewGroup from "./createObjects/group";
import JoinGroup from "./joinGroup";
// import apiData from "../modules/APIcalls";


export default class ApplicationViews extends Component {
  state = {
    // groupMessages: [],
    // currentUser: 0,
    // groupId: 0,
    // profileLoaded: false,
    // inGroup: false,
    // joinGroup: false,
    // closeGroup: false,
    // sendToGroup: false
  }

  componentDidMount() {

  }

  // refreshData = () => {
  //   let userId = sessionStorage.getItem("currentUserId");
  //   apiData.getSingleType("users", `id=${userId}`).then(user => {
  //     let newUser = user[0];
  //     return newUser;
  //   })
  //     .then(newUser => {
  //       apiData.getSingleType("messages", `_expand=user&groupId=${newUser.groupId}`).then(messages => {
  //         this.setState({ groupMessages: messages, currentUser: newUser, groupId: newUser.groupId, profileLoaded: true, inGroup: newUser.inGroup })
  //       })
  //     })
  // }

  // grabData = () => {
  //   apiData.getSingleType("messages", `_expand=user&groupId=${this.props.user.groupId}`).then(messages => {
  //     this.setState({ groupMessages: messages })
  //   })
  // }

  // joinGroup = () => {
  //  this.setState({joinGroup: true})
  // }

  // closeGroupMessage = () => {
  //   this.setState({ closeGroup: true })
  // }

  // createJoinGroup = () => {
  //   this.setState({ sendToGroup: true, closeGroup: false })
  // }

  // stayAtMain = () => {
  //   let newGroup = sessionStorage.getItem("groupId");
  //   let groupChange = sessionStorage.getItem("inGroup")
  //   this.setState({ sendToGroup: false, groupId: newGroup, joinGroup: false, inGroup: groupChange });
  // }

  render() {
      return (
        <React.Fragment>
          <Route exact path="/about" render={(props) => {
            return <About />
          }} />
          <Route exact path="/" render={(props) => {
            return <Login refreshData={this.props.refresh}/>
          }} />
          <Route exact path="/login" render={(props) => {
            return <ExistingUserLogin user={this.props}/>
            // return <ExistingUserLogin user={this.props} loggedIn={this.props.loggedIn} refresh={this.props.refresh}/>
          }} />
          <Route exact path="/createGroup" render={(props) => {
            return <CreateNewGroup loggedIn={this.props.loggedIn} refresh={this.props.refresh}/>
          }} />
          <Route exact path="/joinGroup" render={(props) => {
            return <JoinGroup loggedIn={this.props.loggedIn} refresh={this.props.refresh} mainPage={this.props.stayAtMain}/>
          }} />
          <Route exact path="/newUser" render={(props) => {
            return <CreateNewUser loggedIn={this.props.loggedIn} refresh={this.props.refresh}/>
          }} />
          <Route exact path="/moreInfo" render={(props) => {
            return <MoreInfoForm refresh={this.props.refresh}/>
          }} />
          <Route exact path="/GroupGuru" render={(props) => {
            // return <MainPage user={this.props} refresh={this.props.refreshData} stayAtMain={this.props.stayAtMain} closeGroupMessage={this.closeGroupMessage} joinGroup={this.joinGroup} createJoinGroup={this.createJoinGroup}/>
            return <MainPage user={this.props} />
          }} />
        </React.Fragment>
      )
    // }
  }


}