import React, { Component } from "react";
import { Modal, Button, Alert, Input, message } from "antd";
import { getNodeTemplate } from "../../util/JSONHandler";
import { isEmptyString } from "../../util/Utilities";

export default class AddNodeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      nodeName: "",
      emptyNodeName: false,
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showEmptyNodeNameAlert = this.showEmptyNodeNameAlert.bind(this);
  }

  handleOk() {
    var { nodeName } = this.state;
    if (!isEmptyString(nodeName)) {
      var node = getNodeTemplate(nodeName, 1); //Set Node Template
      this.props.closeModal(node);
    } else {
      this.setState({ emptyNodeName: true });
      this.showEmptyNodeNameAlert();
    }
  }
  handleCancel() {
    // this.setState({ visible: false });
    this.props.hideModal();
  }

  //Updates Node Name typed
  updateNodeName = (e) => {
    this.setState({ nodeName: e.target.value });
  };

  showEmptyNodeNameAlert() {
    message.error({
      content: "Please enter a name for the node",
      className: "custom-class",
      style: {
        marginTop: "2vh",
      },
    });
  }

  render() {
    const { emptyWorkshopName } = this.state;
    return (
      <div>
        <Modal
          title="Add Node "
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {emptyWorkshopName ? (
            <Alert description="Please enter a name " type="error" closable />
          ) : null}

          <h3>Node Name</h3>
          <Input
            placeholder="Node Name"
            onChange={this.updateNodeName}
            allowClear
          />
        </Modal>
      </div>
    );
  }
}
