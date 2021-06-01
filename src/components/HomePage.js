import React, { Component } from "react";
import { message, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { getComponentTemplate } from "../util/JSONHandler";

export default class HomePage extends Component {
  state = {
    value: "Some Text Here",
    isInEditMode: false,
  };

  printMessage() {
    alert("Test Button");
  }

  info = () => {
    message.info("This is a normal message");
  };

  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode,
    });
    console.log("this should go to edit mode");
  };

  renderEditView = () => {
    return (
      <div>
        <input type="text" defaultValue={this.state.value} />
      </div>
    );
  };

  renderDefaultView = () => {
    return <h1 onDoubleClick={this.changeEditMode}>{this.state.value} </h1>;
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
        <Button onClick={this.testObject}> Test Template</Button>
        {/* {JSON.stringify(subcomponentTemplate)} */}
        <div></div>
        {JSON.stringify(getComponentTemplate("testcomponent", 2))}
      </div>
    );
  }
}
