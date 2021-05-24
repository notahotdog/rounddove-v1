import React, { Component } from "react";
import { Modal, Input, Alert } from "antd";
import { CloudFilled, ConsoleSqlOutlined } from "@ant-design/icons";
import { capitalizeFirstLetter, isEmptyString } from "../util/Utilities";
import axios from "axios";

export default class CreateWorkshopModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   visible: this.props.visible,
      confirmLoading: false,
      ModalText: "Create New Workshop",
      workshopName: "",
      emptyModalName: false,
    };

    // this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  componentDidMount() {
    // console.log(" Workshop Modal Created");
  }

  handleOk = (data) => {
    //Server Backend - Handle Data being passed into backend
    //Temporary fix
    // this.props.setWorkshopName(this.state.workshopName);

    //Must Assert WorkshopName
    if (!isEmptyString(this.state.workshopName)) {
      this.setState({
        ModalText: "This Modal will be closed after two seconds",
        confirmLoading: true,
      });

      //Save Data to Backend Here
      const payload = {
        name: capitalizeFirstLetter(this.state.workshopName),
        tags: ["Empty"],
        hazardData: [],
      };

      console.log("Saving New Workshop to Database");
      console.log("New Workshop Payload: ", payload);

      axios.post("http://localhost:5000/workshop/add", payload); //Passes the payload to rest API call

      setTimeout(() => {
        this.setState({
          confirmLoading: false,
          workshopName: "",
        });
        this.props.closeModal();
      }, 1000);
    } else {
      this.setState({ emptyModalName: true });
      console.log("Pls input string parameter");
    }
  };

  handleCancel = () => {
    this.props.closeModal();
    //this.setState({ visible: false });
  };

  updateWorkshopName = (e) => {
    this.setState({ workshopName: e.target.value });
    // console.log("Updating workshop Name");
  };

  render() {
    const { visible, confirmLoading, emptyModalName } = this.state;
    return (
      <div className="modal">
        <Modal
          title="Create New Workshop"
          visible={this.props.visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {emptyModalName ? (
            <Alert
              // message="EmptyModal Name"
              description="Please enter a name "
              type="error"
              closable
              // onClose={onClose}
            />
          ) : null}

          <div className="workshop-name-box">
            <Input
              placeholder="Type in workshop name"
              onChange={this.updateWorkshopName}
            />
            {this.state.workshopName}
          </div>
        </Modal>
      </div>
    );
  }
}
