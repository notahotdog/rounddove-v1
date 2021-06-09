import React, { Component } from "react";
import { Modal, Button } from "antd";

export default class AddSubnodeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleOk() {
    // this.setState({ visible: false });
    this.props.hideModal();
  }
  handleCancel() {
    // this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
