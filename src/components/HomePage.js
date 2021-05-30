import React, { Component } from "react";
import { message, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

// state = {
//   name: "jacob",
//   number: 24,
// };

export default class HomePage extends Component {
  printMessage() {
    alert("Test Button");
  }

  info = () => {
    message.info("This is a normal message");
  };

  render() {
    return (
      <div>
        <h1>HomePage Test</h1>
        <h1> Add more stuff</h1>
        <Button onClick={this.printMessage}>Test Button</Button>
        <Button
          type="primary"
          shape="square"
          icon={<DownloadOutlined />}
          size="small"
          onClick={this.info}
        />
      </div>
    );
  }
}
