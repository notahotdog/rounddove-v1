import React, { Component } from "react";
import { Layout, Typography, Button } from "antd";
import { PlusOutlined, CloudUploadOutlined } from "@ant-design/icons";
import WorkshopModal from "./modalComponents/CreateWorkshopModal";
import WorkshopTable from "./WorkshopTable";
import axios from "axios"; //handles push/get requests
import { Link } from "react-router-dom";
const { Title } = Typography;

var de = false;

export default class WorkshopCreationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      // workshopName: "", //used for debugging but is not needed
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.testApi = this.testApi.bind(this);
  }

  componentDidMount() {
    de && console.log("Workshop Creation Page");
  }

  /**
   * Displays Modal
   */
  showModal = () => {
    this.setState({ modalVisible: true });
  };

  /**
   * Hides Modal
   */
  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  /**
   * Test API mimic workshop creation
   */
  testApi = () => {
    const payload = {
      workshopName: "Test API Workshop ",
      tags: ["Empty"],
      nodes: [
        {
          nodeName: "TestNode-1",
          subnodes: [
            {
              subnodeName: "subnode-1",
              hazards: [
                {
                  hazardName: "hazard-1",
                  causes: ["cause-1", "cause-2"],
                  consequences: ["consequence-1", "consequence-2"],
                  preventativeSafeguards: ["pSafeguard-1", "pSafeguard-2"],
                  mitigatingSafeguards: ["mSafeguard-1"],
                },
              ],
            },
          ],
        },
      ],
    };

    console.log("Test Payload: ", payload);

    //Need to change the payload
    // axios.post("http://localhost:5000/workshop/add", payload); //Passes the payload to rest API call
    axios.post("http://localhost:5000/workshop/addWorkshop", payload); //Passes the payload to rest API call
  };

  render() {
    return (
      <Layout>
        <div className="workshop-creation-page">
          <Title level={2}> Create Workshop</Title>
          <WorkshopModal
            visible={this.state.modalVisible}
            closeModal={this.hideModal}
          />
          <div className="button-choice">
            <Button type="primary" onClick={this.showModal}>
              <PlusOutlined />
              New Workshop
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: "20px", color: "white" }}
              // onClick={() => console.log("Load BackEnd Data Button Pressed")}
            >
              <CloudUploadOutlined />
              <Link
                style={{ color: "white" }}
                to={{
                  pathname: "/WorkshopCreationPage/UploadData",
                  // state: { name: "jacob" },
                }}
              >
                Load Backend{" "}
              </Link>
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
