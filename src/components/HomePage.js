import React, { Component } from "react";
import { message, Button } from "antd";
// import { Typography } from "antd";
import { addVisibilityElement } from "../util/Utilities";
import FileSaver from "file-saver";
import axios from "axios";

// const { Title } = Typography;

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valCtr: 0,
      // data: ["workshop1", "workshop2", "workshop3"],
      data: [
        { name: "workshop1", workshopId: "9123846os" },
        { name: "workshopr2", workshopId: "asfas9123846os" },
      ],

      hazardData: {
        id: "",
        hazardName: "Default",
        causes: ["Default"],
        consequences: ["consequence 1", "consequence 2"],
        preventativeSafeguards: ["Default"],
        mitigatingSafeguards: ["Default"],
      },
    };

    this.addVisibilityElement = this.addVisibilityElement.bind(this);
    this.testSaveFile = this.testSaveFile.bind(this);
  }

  testSaveFile() {
    alert("Saving test file");
    // var blob = new Blob(["Hello, world!"], {
    //   type: "text/plain;charset=utf-8",
    // });
    // FileSaver.saveAs(blob, "hello world.txt");
    const payload = {
      workshopName: "testWorkshop",
    };
    // axios.post("http://localhost:5000/workshop/testExport", payload); //Send Payload to Backend
    axios
      .post("http://localhost:5000/workshop/testExport", payload, {
        responseType: "blob",
      })
      .then((response) => {
        let headerLine = response.headers["content-disposition"];
        let startFileNameIndex = headerLine.indexOf('"') + 1;
        let endFileNameIndex = headerLine.lastIndexOf('"');
        let filename = headerLine.substring(
          startFileNameIndex,
          endFileNameIndex
        );
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  printMessage() {
    alert("Test Button");
  }

  info = () => {
    message.info("This is a normal message");
  };

  addVisibilityElement() {
    addVisibilityElement(this.state.hazardData);
  }

  render() {
    return (
      <div
        className="mainpage-div"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        {" "}
        HomePage
        {/* <Button onClick={this.addVisibilityElement}> tBJKJ</Button> */}
        <Button onClick={this.testSaveFile}> Test Blob Functionality</Button>
      </div>
    );
  }
}
