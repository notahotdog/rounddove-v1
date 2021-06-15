import React, { Component } from "react";
import { message, Button } from "antd";
// import { Typography } from "antd";
import { addVisibilityElement } from "../util/Utilities";

// const { Title } = Typography;

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valCtr: 0,
      // data: ["workshop1", "workshop2", "workshop3"],
      data: [
        { name: "workshop1", workshopId: "9123846os" },
        { name: "workshopr2", workshopId: "asfas9123846os" },
      ],

      hazardData: {
        id: "",
        hazardName: "Default",
        causes: ["Default"],
        consequences: ["consequence 1", "consequence 2"],
        preventativeSafeguards: ["Default"],
        mitigatingSafeguards: ["Default"],
      },
    };

    this.addVisibilityElement = this.addVisibilityElement.bind(this);
  }

  printMessage() {
    alert("Test Button");
  }

  info = () => {
    message.info("This is a normal message");
  };

  addVisibilityElement() {
    addVisibilityElement(this.state.hazardData);
  }

  render() {
    return (
      <div
        className="mainpage-div"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        {" "}
        HomePage
        {/* <Button onClick={this.addVisibilityElement}> tBJKJ</Button> */}
      </div>
    );
  }
}
