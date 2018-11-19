import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login";
import About from "./about";
import MainPage from "./mainPage";
import CreateNewUser from "./newUserForm/userAccountCreate";
import MoreInfoForm from "./newUserForm/moreInfoForm";
import ExistingUserLogin from "./existingUserLogin";


export default class ApplicationViews extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
      return (
        <React.Fragment>
          <Route exact path="/about" render={(props) => {
            return <About />
          }} />
          <Route exact path="/" render={(props) => {
            return <Login />
          }} />
          <Route exact path="/login" render={(props) => {
            return <ExistingUserLogin loggedIn={this.props.loggedIn} />
          }} />
          <Route exact path="/newUser" render={(props) => {
            return <CreateNewUser loggedIn={this.props.loggedIn} />
          }} />
          <Route exact path="/moreInfo" render={(props) => {
            return <MoreInfoForm />
          }} />
          <Route exact path="/GroupGuru" render={(props) => {
            return <MainPage />
          }} />
        </React.Fragment>
      )
    // }
  }


}