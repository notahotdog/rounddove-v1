import React, { Component } from "react";
import { Modal, Input } from "antd";
import { CloudFilled, ConsoleSqlOutlined } from "@ant-design/icons";
import { capitalizeFirstLetter } from "../util/Utilities";
import axios from "axios";

export default class CreateWorkshopModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   visible: this.props.visible,
      confirmLoading: false,
      ModalText: "Create New Workshop",
      workshopName: "",
    };

    // this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  componentDidMount() {
    // console.log(" Workshop Modal Created");
  }

  handleOk = (data) => {
    this.setState({
      ModalText: "This Modal will be closed after two seconds",
      confirmLoading: true,
    });

    //Server Backend - Handle Data being passed into backend
    //Temporary fix
    this.props.setWorkshopName(this.state.workshopName);

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
    const { visible, confirmLoading } = this.state;
    return (
      <div className="modal">
        <Modal
          title="Create New Workshop"
          visible={this.props.visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
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
