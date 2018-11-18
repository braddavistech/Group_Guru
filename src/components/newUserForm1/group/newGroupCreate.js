import React, { Component } from 'react';
import "./NewGroupCreate.css";
import apiData from "../../../modules/APIcalls";

export default class CreateNewGroup extends Component {
  state = {
    groupType: "Other",
    uniqueGroupName: false
  }

  gatherGroupInputValues = () => {
    let temp = {
      groupName: this.groupName.value,
      groupDescription: this.groupDescription.value,
      groupType: this.state.groupType
    }
    this.checkAndSave(temp);
  }

  groupExists = () => {
    let groupName = this.groupName.value;
    if (groupName.length >= 4) {
      apiData.getSingleType('groups', `groupName=${groupName}`).then(sameGroup => {
        if (sameGroup.length === 0) {
          this.setState({ uniqueGroupName: true })
        } else { this.setState({ uniqueGroupName: false }) };
      })
    }
  }

  checkAndSave = (temp) => {
    if (temp.groupName === "") {
      alert("You must enter a group name.");
    } else if (temp.groupName.length < 4 ) {
      alert("Group Names must be at least 4 characters.")
    } else if (temp.groupDescription === "") {
      alert("You must enter a description for your group.");
    } else if (this.state.uniqueGroupName === false) {
      alert("There is already a group with that name. Please try again.");
    } else {
      apiData.newDataPost(temp, "groups").then(currentGroup => {
        console.log("just retrieved: ", currentGroup)
      })
    }
  }


  handleOptionChange = (changeEvent) => {
    this.setState({
      groupType: changeEvent.target.value
    });
  }

  render() {
    return (
      <article id="newUserForm">
        <section className="newUserInputSection">
          <label htmlFor="groupName" className="newUserLabel">Group Name</label>
          <input name="groupName" ref={(userInput) => this.groupName =
            userInput} className="newUserInput" onKeyUp={this.groupExists} placeholder="Enter The Name For Your Group"></input>
        </section>
        <section className="newUserInputSection">
          <label htmlFor="groupDescription" className="newUserLabel">Brief Description</label>
          <textarea name="groupDescription" ref={(userInput) => this.groupDescription =
            userInput} id="newGroupDescription" placeholder="Enter A Brief Description To Display In A Search"></textarea>
        </section>
        <section id="newGroupTypeRadioSection">
          <label htmlFor="groupType" className="newUserRadioLabel">Family
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Family"} onChange={this.handleOptionChange} value="Family" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Social
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Social"} onChange={this.handleOptionChange} value="Social" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Work
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Work"} onChange={this.handleOptionChange} value="Work" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Special Intrest
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Special Interest"} onChange={this.handleOptionChange} value="Special Interest" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Religious
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Religious"} onChange={this.handleOptionChange} value="Religious" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Other
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Other"} onChange={this.handleOptionChange} value="Other" /></label>
        </section>
        <section className="newUserDualButton">
          <button onClick={this.gatherGroupInputValues} id="newUserBtn">Create This Group</button>
          <button onClick={console.log("function to back out to join existing")} id="newUserBtn">Join Existing Group</button>
        </section>
      </article>
    )
  }
}

