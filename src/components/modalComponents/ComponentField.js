//For each component

import React, { Component } from "react";
import { InputNumber, Button, Popconfirm } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";

export default class ComponentField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noSubComponents: 1,
    };
  }

  onChange = (value) => {
    this.setState({ noSubComponents: value });
  };

  //This method needs to be called from the parent component
  confirmComponentDeletion = (index) => {
    console.log(index);
    this.props.componentDeletion(index);
  };

  //this.props.index - used to delete index of the above page

  render() {
    return (
      <div>
        {/* <h3>Test Component {this.props.component}</h3> */}
        <div className="componentTitle" style={{ fontWeight: "bold" }}>
          {" "}
          {this.props.component}
        </div>

        <div
          className="subcomponent-number"
          style={{
            display: "flex",
            flexDirection: "row",
            // border: "1px solid black",
          }}
        >
          No of Sub Components
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={this.onChanges}
            style={{ marginLeft: "20px" }}
          />
          {/* {this.state.noSubComponents} */}
          {/* <DeleteOutlined
            style={{
              alignSelf: "flex-end",
              border: "2px solid red",
              height: "100%",
              justifyContent: "flex-end",
            }}
          /> */}
          <Popconfirm
            title="Are you sure to delete this component?"
            onConfirm={() => this.confirmComponentDeletion(this.props.index)}
            // onCancel={this.cancelComponent}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="dashed"
              icon={<DeleteOutlined />}
              size="medium"
              style={{
                justifyContent: "flex-end",
                alignSelf: "flex-end",
                marginLeft: "20px",
              }}
            />
          </Popconfirm>
          <Button
            type="dashed"
            icon={<UpOutlined />}
            size="medium"
            onClick={() =>
              this.props.swapComponentsWithPrevious(this.props.index)
            }
            style={{
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              marginLeft: "20px",
            }}
          />
          <Button
            type="dashed"
            icon={<DownOutlined />}
            size="medium"
            onClick={() => this.props.swapComponentsWithNext(this.props.index)}
            style={{
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              marginLeft: "20px",
            }}
          />
        </div>
      </div>
    );
  }
}
