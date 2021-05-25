import React, { Component } from "react";
import { Layout, Typography, Button } from "antd";
import { PlusOutlined, CloudUploadOutlined } from "@ant-design/icons";
import WorkshopModal from "./CreateWorkshopModal";
import WorkshopTable from "./WorkshopTable";
import axios from "axios"; //handles push/get requests
const { Title } = Typography;

export default class WorkshopCreationPage extends Component {
  //Main Node
  //Sub Node
  //Hazard Node
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      workshopName: "",
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setWorkshopName = this.setWorkshopName.bind(this);
    this.testApi = this.testApi.bind(this);
  }

  componentDidMount() {
    console.log("Workshop Creation Page");
  }

  //Todo - Fetch Backend when it detects an addition, set data as list of items to be collected for processing
  fetchWorkshop = () => {
    //getWorkshop Details from backend
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  testApi = () => {
    //Trigger an api store
    var obj1 = {
      name: "test1",
    };
    var obj2 = {
      name: "test2",
    };

    const payload = {
      name: "testAPIname",
      tags: ["Completed", "Edited"],
      hazardData: [obj1, obj2],
    };
    console.log("Test Payload: ", payload);

    axios.post("http://localhost:5000/workshop/add", payload); //Passes the payload to rest API call
  };

  setWorkshopName = (name) => {
    this.setState({ workshopName: name });
  };

  //Load Backend Data
  uploadBackendData = () => {
    console.log("Upload backend data");
  };

  render() {
    // const { workshopName } = this.state;
    return (
      <Layout>
        <div className="workshop-creation-page">
          <Title level={2}> Create Workshop</Title>
          <WorkshopModal
            visible={this.state.modalVisible}
            closeModal={this.hideModal}
            setWorkshopName={this.setWorkshopName}
          />
          <div className="button-choice">
            <Button type="primary" onClick={this.showModal}>
              <PlusOutlined />
              New Workshop
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: "20px" }}
              onClick={this.uploadBackendData}
            >
              <CloudUploadOutlined />
              Load Backend
            </Button>
          </div>

          {/* <Button type="primary" onClick={this.testApi}>
            <PlusOutlined />
            Test API Set
          </Button> */}
          {/* <h1>Workshop Name: {workshopName}</h1> */}
          <WorkshopTable />
        </div>
      </Layout>
    );
  }
}
