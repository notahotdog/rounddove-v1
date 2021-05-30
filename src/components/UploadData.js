import React, { Component } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { findAllByDisplayValue } from "@testing-library/dom";
// import { dataTestJSON } from "../util/JSONHandler";
// import { displayJSON } from "../util/JSONHandler";
import DisplayJSONData from "../util/DisplayJSONData";

var de = false;

export default class UploadData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonData: { workshopName: "undefined", components: [] },
    };

    this.fileHandler = this.fileHandler.bind(this);
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
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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
        <h1>Upload Data To Backend</h1>
        <div
          className="uploadData"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <h3 style={{ marginLeft: "10px" }}>Upload Workshop Data [JSON]: </h3>
          <Upload {...props}>
            <Button icon={<UploadOutlined />} style={{ marginLeft: "20px" }}>
              Click to Upload
            </Button>
          </Upload>
        </div>

        <br />
        <DisplayJSONData data={this.state.jsonData} />
      </div>
    );
  }
}
