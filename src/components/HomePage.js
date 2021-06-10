import React, { Component } from "react";
import { message } from "antd";
// import { Typography } from "antd";

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
    };
  }

  printMessage() {
    alert("Test Button");
  }

  info = () => {
    message.info("This is a normal message");
  };

  render() {
    return (
      <div
        className="mainpage-div"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {" "}
        HomePage
      </div>
    );
  }
}
