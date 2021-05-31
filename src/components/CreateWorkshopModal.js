import React, { Component } from "react";
import { Modal, Input, Alert, Button, message } from "antd";
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
      confirmLoading: false,
      ModalText: "Create New Workshop",
      workshopName: "",
      emptyModalName: false,
      components: [],
      componentName: "",
      jsonData: {
        workshopName: "",
        components: [],
      },
    };

    this.handleOk = this.handleOk.bind(this);
    this.showEmptyWorkshopNameAlert =
      this.showEmptyWorkshopNameAlert.bind(this);
  }

  componentDidMount() {
    console.log(" Workshop Modal Created");
  }

  handleOk = (data) => {
    //Server Backend - Handle Data being passed into backend
    //Temporary fix
    // this.props.setWorkshopName(this.state.workshopName);

    //Assert Workshop Name
    if (!isEmptyString(this.state.workshopName)) {
      this.setState({
        ModalText: "This Modal will be closed after two seconds",
        confirmLoading: true,
      });

      const payload = {
        workshopName: capitalizeFirstLetter(this.state.workshopName),
        tags: ["Empty"],
        components: this.state.components,
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

      message.success({
        content: "Workshop created successfully!",
        className: "custom-class",
        style: {
          marginTop: "2vh",
        },
      });
    } else {
      this.setState({ emptyModalName: true });
      this.showEmptyWorkshopNameAlert();
    }
  };

  handleCancel = () => {
    this.props.closeModal();
  };

  updateWorkshopName = (e) => {
    this.setState({ workshopName: e.target.value });
    // console.log("Updating workshop Name");
  };

  /**
   *  Adds Component to list of components
   */
  addComponent = () => {
    const component = {
      componentName: this.state.componentName,
      noSubcomponents: 1,
      subcomponents: [],
    };

    this.setState({
      components: [...this.state.components, component],
    });
  };

  /**
   *  Updates Component Name to be added from the input Field
   * @param {string} e componentName
   */
  updateComponentName = (e) => {
    this.setState({ componentName: e.target.value });
  };

  /**
   *  Deletes component from component List
   * @param {number} indexOfComponent to be deleted
   */
  componentDeletion = (indexOfComponent) => {
    console.log(
      "Component To Be Deleted: ",
      this.state.components[indexOfComponent].componentName
    );
    var updatedComponents = deleteItemFromIndex(
      this.state.components,
      indexOfComponent
    );
    console.log("Updated Components: ", updatedComponents);
    this.setState({ components: updatedComponents });
  };

  /**
   * Updates the value of the no of Subcomponents a component has
   * @param {number} indexOfComponent - index of the component to update the number of subcomponents
   * @param {number} value - updated value to be stored
   */
  updateNoSubcomponents = (indexOfComponent, value) => {
    var updatedComponent = this.state.components[indexOfComponent]; //pass by reference
    updatedComponent.noSubcomponents = value;

    console.log(
      "Updated subcomponent value:",
      updatedComponent.noSubcomponents
    );

    this.state.components.map((x) => {
      console.log("Components List Debug:", x.componentName, x.noSubcomponents);
    });

    //Replaces the values of the array object
    // const updatedComponentList = [...this.state.components];
    // updatedComponentList[indexOfComponent] = updatedComponent;

    // //Replace the object with the one in the array
    // this.setState({ components: updatedComponentList });
  };

  /**
   * Re-order component with previous component in the list
   * @param {number} index - index of component to be swapped
   */
  swapComponentsWithPrevious = (index) => {
    var swappedComponets = swapWithPrevious(this.state.components, index);
    this.setState({ components: swappedComponets });
  };

  /**
   * Re-order component with next component in the list*
   * @param {number} index - index of component to be swapped
   * */
  swapComponentsWithNext = (index) => {
    var swappedComponets = swapWithNext(this.state.components, index);
    this.setState({ components: swappedComponets });
  };

  /**
   * Displays Empty Workshop Name alert
   */
  showEmptyWorkshopNameAlert() {
    message.error({
      content: "Upload failed, please enter a name for the workshop",
      className: "custom-class",
      style: {
        marginTop: "2vh",
      },
    });
  }

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
            <Alert description="Please enter a name " type="error" closable />
          ) : null}

          <h3 style={{ font: "bold" }}>Workshop Name</h3>
          <div className="workshop-name-box">
            <Input
              placeholder="Type in workshop name"
              onChange={this.updateWorkshopName}
            />
          </div>

          <h4>Components</h4>
          <div style={{ display: "flex" }}>
            <Input
              placeholder="Component Name"
              onChange={this.updateComponentName}
              allowClear
            />
            <Button type="primary" onClick={this.addComponent}>
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
                  updateNoSubcomponents={this.updateNoSubcomponents}
                />
              );
            })}
          </h4>
        </Modal>
      </div>
    );
  }
}
