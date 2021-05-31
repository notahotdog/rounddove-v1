import React, { Component } from "react";
import { Upload, message, Button, Typography, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { findAllByDisplayValue } from "@testing-library/dom";
// import { dataTestJSON } from "../util/JSONHandler";
// import { displayJSON } from "../util/JSONHandler";
import DisplayJSONData from "../util/DisplayJSONData";
import Item from "antd/lib/list/Item";

const { Title } = Typography;

var de = false;

export default class UploadData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonData: { workshopName: "---", components: [] },
    };

    this.fileHandler = this.fileHandler.bind(this);
    this.onButtonRemove = this.onButtonRemove.bind(this);
    this.onClickSaveToBackend = this.onClickSaveToBackend.bind(this);
  }

  //Doesnt do anything as of now
  onButtonRemove() {
    this.setState({ jsonData: { workshopName: "---", components: [] } });
  }

  onClickSaveToBackend() {
    console.log("current state of jsonData: ", this.state.jsonData);
    if (this.state.jsonData.components.length !== 0) {
      //Saves to Backend
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
    de && console.log("HandlingFile Before Upload");
    de && console.log("File list:", fileList);

    let fileObj = fileList;
    if (!fileObj) {
      this.setState({ errorMessage: "No file uploaded" });
      return false;
    }

    de && console.log("fileObject.type", fileObj.type);
    if (!(fileObj.type == "application/json")) {
      this.setState({
        errorMessage: "Unknown file format. Only JSON files are uploaded",
      });
      return false;
    }

    const reader = new FileReader();

    //Async function
    reader.onload = (e) => {
      de && console.log(" E target result:", e.target.result); //asynchronous
      var JSONdata = JSON.parse(e.target.result);

      de && console.log("Uploaded file type: ", JSONdata);
      this.setState({ jsonData: JSONdata });
    };
    reader.readAsText(fileObj);
    console.log("Reading file as text");
    return false;

    // Upload Data to Backend
  }

  render() {
    //property for the Upload Tag
    const props = {
      name: "file",
      // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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

    let { isDataUploaded } = this.state;

    console.log("JSON Data in Render: ", this.state.jsonData);
    return (
      <div>
        <Title level={1}>Upload Data To Database </Title>
        <div
          className="uploadData"
          style={{
            display: "flex",
            flexDirection: "row",
            // border: "1px solid red",
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
              // alignSelf: "flex-end",
              // border: "2px solid red",
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
