import React, { Component } from "react";

//Displays Individual Workshop, Needs data to be passed from link
export default class DisplayWorkshop extends Component {
  render() {
    // const { state, location } = this.props;
    console.log("Workshop Generated");
    console.log("data:", this.props.location);
    return (
      <div>
        Display Workshop
        <div>Workshop Name : {this.props.location.state.data.workshopName}</div>
      </div>
    );
  }
}
