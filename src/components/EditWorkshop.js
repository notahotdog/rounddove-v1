import React, { Component } from "react";

export default class EditWorkshop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workshop: "",
    };
  }

  componentDidMount() {
    console.log("Edit Workshop Instance");
    // console.log(this.props.location.state.workshop);
    this.setState({ workshop: this.props.location.state.workshop });
  }

  render() {
    if (this.state.workshop !== "") {
      return (
        <div>
          <h1>{this.state.workshop.workshopName}</h1>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
