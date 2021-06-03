import React, { Component } from "react";
import { Upload, message, Button, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import DisplayJSONData from "../util/DisplayJSONData";
import axios from "axios";
import { CompareObjects } from "../util/JSONHandler";
const { Title } = Typography;

export default class UploadDataPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonData: { workshopName: "---", nodes: [] },
    };

    this.fileHandler = this.fileHandler.bind(this);
    this.onButtonRemove = this.onButtonRemove.bind(this);
    this.onClickSaveToBackend = this.onClickSaveToBackend.bind(this);
  }

  /**
   * Clears jsonData when a file is removed
   */
  onButtonRemove() {
    this.setState({ jsonData: { workshopName: "---", nodes: [] } });
  }

  /**
   * Saves uploaded data to backend
   */
  onClickSaveToBackend() {
    if (this.state.jsonData.nodes.length !== 0) {
      axios.post(
        "http://localhost:5000/workshop/addWorkshop",
        this.state.jsonData
      );

      message.success({
        content: "Successfully saved to backend",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
    } else {
      message.error({
        content: "Please upload data before saving in the database",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
    }
  }

  fileHandler(fileList) {
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({ errorMessage: "No file uploaded" });
      return false;
    }

    if (!(fileObj.type === "application/json")) {
      this.setState({
        errorMessage: "Unknown file format. Only JSON files are uploaded",
      });
      return false;
    }

    const reader = new FileReader();

    //Async function
    reader.onload = (e) => {
      var JSONdata = JSON.parse(e.target.result);
      if (CompareObjects(JSONdata)) {
        this.setState({ jsonData: JSONdata }); // Saves Data within this Component - Needs to be uploded to backend onClick
      } else {
        alert("upload failed due to improper data structure");

        return false;
      }
    };
    reader.readAsText(fileObj);
    console.log("Reading file as text");
    return false;
  }

  render() {
    //property for the Upload Tag
    const props = {
      name: "file",
      headers: {
        authorization: "authorization-text",
      },
      accept: ".json", //asserts the json file format
      beforeUpload: this.fileHandler,
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    console.log("JSON Data in Render: ", this.state.jsonData);
    return (
      <div>
        <Title level={1}>Upload Data To Database </Title>
        <div
          className="uploadData"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <h3 style={{ marginLeft: "10px" }}>Upload Workshop Data [JSON]: </h3>
          <Upload {...props} onRemove={this.onButtonRemove}>
            <Button icon={<UploadOutlined />} style={{ marginLeft: "20px" }}>
              Click to Upload
            </Button>
          </Upload>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: "20px",
            }}
          >
            <Button
              style={{
                backgroundColor: "#a0d911",
                color: "white",
                fontWeight: "10px",
              }}
              onClick={this.onClickSaveToBackend}
            >
              Save To Database
            </Button>
          </div>
        </div>
        <br />
        {this.state.jsonData.length !== 0 ? (
          <DisplayJSONData data={this.state.jsonData} />
        ) : (
          <div>Please Upload Data</div>
        )}
      </div>
    );
  }
}
