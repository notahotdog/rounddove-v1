import React, { Component } from "react";
import { Modal, Input, Alert, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import {
  capitalizeFirstLetter,
  isEmptyString,
  deleteItemFromIndex,
  swapWithPrevious,
  swapWithNext,
} from "../util/Utilities";
import axios from "axios";
import ComponentField from "./modalComponents/ComponentField";

export default class CreateWorkshopModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   visible: this.props.visible,
      confirmLoading: false,
      ModalText: "Create New Workshop",
      workshopName: "",
      emptyModalName: false,
      numberComponents: 1,
      components: [],
      componentName: "",
      jsonData: {
        workshopName: "",
        components: [],
      },
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
        hazardData: [...this.state.components],
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
      // console.log("Pls input string parameter");
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

  updateNoComponents = (value) => {
    // console.log("changed", e);
    this.setState({ numberComponents: value });
  };

  //Conditional Render the Names of the Rows
  //addComponents
  addComponents = () => {
    //Create an Object with a key value pair : name
    // var component = { name: this.state.componentName };

    // Add componentName

    const component = {
      componentName: "",
      subcomponents: [],
    };

    this.setState({
      // components: [...this.state.components, component],
      components: [...this.state.components, this.state.componentName],
    });
    // console.log(this.state.components);
  };

  updateComponentName = (e) => {
    this.setState({ componentName: e.target.value });

    //if Enter button is pressed, also save value

    // console.log("Updating workshop Name");
  };

  //For Individual Fields
  //Component to be deleted
  componentDeletion = (indexOfComponent) => {
    console.log(
      "Component To Be Deleted: ",
      this.state.components[indexOfComponent]
    );
    var updatedComponents = deleteItemFromIndex(
      this.state.components,
      indexOfComponent
    );
    console.log("Updated Components: ", updatedComponents);
    this.setState({ components: updatedComponents });
  };

  swapComponentsWithPrevious = (index) => {
    var swappedComponets = swapWithPrevious(this.state.components, index);
    this.setState({ components: swappedComponets });
  };

  swapComponentsWithNext = (index) => {
    var swappedComponets = swapWithNext(this.state.components, index);
    this.setState({ components: swappedComponets });
  };

  render() {
    const { confirmLoading, emptyModalName } = this.state;
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

          <h3 style={{ font: "bold" }}>Workshop Name</h3>
          <div className="workshop-name-box">
            <Input
              placeholder="Type in workshop name"
              onChange={this.updateWorkshopName}
            />
            {/* {this.state.workshopName} */}
          </div>

          <h4>Components</h4>
          <div style={{ display: "flex" }}>
            <Input
              placeholder="Component Name"
              onChange={this.updateComponentName}
              allowClear
            />
            <Button type="primary" onClick={this.addComponents}>
              <PlusSquareOutlined />
              Add Component
            </Button>
          </div>
          <h4>
            Components Listed:{" "}
            {this.state.components.map((component, i) => {
              return (
                <ComponentField
                  component={component}
                  index={i}
                  key={component.id}
                  componentDeletion={this.componentDeletion}
                  swapComponentsWithNext={this.swapComponentsWithNext}
                  swapComponentsWithPrevious={this.swapComponentsWithPrevious}
                />
              );
            })}
          </h4>
        </Modal>
      </div>
    );
  }
}
