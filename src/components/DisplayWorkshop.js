import React, { Component } from "react";

export default class DisplayWorkshop extends Component {
  constructor(props) {
    super(props);
  }

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