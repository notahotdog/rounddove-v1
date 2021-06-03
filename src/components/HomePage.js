import React, { Component } from "react";
import { message } from "antd";
// import { Typography } from "antd";

// const { Title } = Typography;

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valCtr: 0,
    };
  }

  printMessage() {
    alert("Test Button");
  }

  info = () => {
    message.info("This is a normal message");
  };

  render() {
    return <div className="mainpage-div">HomePage</div>;
  }
}
