//Individual Node Field for Create Workshop Modal Component
import React, { Component } from "react";
import { InputNumber, Button, Popconfirm } from "antd";
import { DeleteOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";

export default class NodeField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noSubNodes: 1,
    };
  }

  /**
   *  Update number of subnodes in a Node
   * @param {number} value update no subnodes
   */
  onChangeNoSubnodes = (value) => {
    this.setState({ noSubNodes: value });
    this.props.updateNoSubnodes(this.props.index, value);
  };

  /**
   * Deletes a Node from list of nodes
   * @param {number} index of node to be deleted
   */
  confirmNodeDeletion = (index) => {
    console.log("Node Deletion: ", index);
    this.props.nodeDeletion(index);
  };

  render() {
    return (
      <div>
        <div className="node" style={{ fontWeight: "bold" }}>
          {" "}
          {this.props.node.nodeName}
          {this.props.node.noSubnodes}
        </div>

        <div
          className="subnode-number"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          No of Subnodes:
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={this.onChangeNoSubnodes}
            style={{ marginLeft: "20px" }}
          />
          <Button
            type="dashed"
            icon={<UpOutlined />}
            size="medium"
            onClick={() => this.props.swapNodeWithPrevious(this.props.index)}
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
            onClick={() => this.props.swapNodeWithNext(this.props.index)}
            style={{
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              marginLeft: "20px",
            }}
          />
          <Popconfirm
            title="Are you sure to delete this Node?"
            onConfirm={() => this.confirmNodeDeletion(this.props.index)}
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
        </div>
      </div>
    );
  }
}
