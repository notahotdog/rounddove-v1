import React, { Component } from "react";
import EditableHazardItem from "./EditableHazardItem";
import { Button, Input, message } from "antd";
import axios from "axios";
import { RiAddLine } from "react-icons/ri";
// import { CloudFilled } from "@ant-design/icons";

export default class EditableHazardComponent extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      hazardSelected: {
        id: this.props.hazardSelected.id,
        hazardName: this.props.hazardSelected.hazardName,
        causes: this.props.hazardSelected.causes,
        consequences: this.props.hazardSelected.consequences,
        preventativeSafeguards:
          this.props.hazardSelected.preventativeSafeguards,
        mitigatingSafeguards: this.props.hazardSelected.mitigatingSafeguards,
      },
      addConsequence: "",
      addCause: "",
    };

    this.saveHazardUpdatetoBackend = this.saveHazardUpdatetoBackend.bind(this);
    this.updateData = this.updateData.bind(this);
    this.addConsequence = this.addConsequence.bind(this);
    this.addCause = this.addCause.bind(this);
    this.deleteField = this.deleteField.bind(this);
    this.deleteHazardfromBackend = this.deleteHazardfromBackend.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    console.log("Editable Hazard Component Mounted");
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   *  Checks whether there has been an update - by checking the difference between props
   * @param {props} prevProps no value needs to be passed in - automatic
   */
  componentDidUpdate(prevProps) {
    if (this.props.hazardSelected !== prevProps.hazardSelected) {
      console.log("Hazard Selected Updated: ", this.props.hazardSelected);
      this.setState({ hazardSelected: this.props.hazardSelected });
    }
  }

  //Can be placed in another file tbh
  /**
   * Deletes Hazard from Backend
   */
  deleteHazardfromBackend() {
    axios.delete("http://localhost:5000/workshop/deleteHazard", {
      data: { id: this.state.hazardSelected.id },
    });
    console.log("Hazard Deleted");
  }

  /**
   *  Update Hazard details to Backend
   */
  saveHazardUpdatetoBackend() {
    console.log(
      "SAVE HAZARD TO BACKEND: ",
      JSON.stringify(this.state.hazardSelected)
    );
    message.success("Saved Hazard Data to Backend");

    axios.post(
      "http://localhost:5000/workshop/updateHazard",
      this.state.hazardSelected
    );
  }

  //Function to pass data from child to parent component
  updateData(data, index, itemType) {
    if (itemType === "cause") {
      const causesArr = this.state.hazardSelected.causes; //Should copy not pass by ref
      causesArr[index] = data;
    } else if (itemType === "consequence") {
      const consequencesArr = this.state.hazardSelected.consequences; //Should copy not pass by ref
      consequencesArr[index] = data;
    }

    //Improper method to change state variables
  }

  /**
   * Add consequence to list of consequence
   */
  addCause() {
    var causes = [...this.state.hazardSelected.causes];
    causes.push(this.state.addCause);
    var hazardSelectedUpdate = { ...this.state.hazardSelected };
    hazardSelectedUpdate.causes = causes;
    this.setState({ hazardSelected: hazardSelectedUpdate });
  }

  //Update Add Consequence Field Value
  updateAddCauseValue = (e) => {
    this.setState({ addCause: e.target.value });
  };

  /**
   * Add consequence to list of consequence
   */
  addConsequence() {
    var consequences = [...this.state.hazardSelected.consequences];
    consequences.push(this.state.addConsequence);
    var hazardSelectedUpdate = { ...this.state.hazardSelected };
    hazardSelectedUpdate.consequences = consequences;
    this.setState({ hazardSelected: hazardSelectedUpdate });
    // this.setState({ addConsequence: "" });
  }

  //Update Add Consequence Field Value
  updateAddConsequenceValue = (e) => {
    this.setState({ addConsequence: e.target.value });
  };

  /**
   *  Deletes an item from its array
   * @param {string} itemType to be deleted
   * @param {number} index  of item to be deleted
   */
  deleteField(itemType, index) {
    var hazardSelectedUpdate = { ...this.state.hazardSelected };
    if (itemType === "cause") {
      var causes = [...this.state.hazardSelected.causes];
      causes.splice(index, 1);
      hazardSelectedUpdate.causes = causes;
      this.setState({
        hazardSelected: hazardSelectedUpdate,
      });
    }

    if (itemType === "consequence") {
      var consequences = [...this.state.hazardSelected.consequences];
      consequences.splice(index, 1);
      // var hazardSelectedUpdate = { ...this.state.hazardSelected };
      hazardSelectedUpdate.consequences = consequences;
      this.setState({ hazardSelected: hazardSelectedUpdate });
      this.setState({ addConsequence: "" });
    }
  }

  render() {
    return (
      <div>
        <div className="ew-hazard-sel-title">
          Hazard Selected : {this.props.hazardSelected.hazardName}
          <Button
            style={{ marginLeft: "20px" }}
            onClick={this.saveHazardUpdatetoBackend}
          >
            Save to Backend
          </Button>
          <Button
            style={{ marginLeft: "20px" }}
            onClick={this.deleteHazardfromBackend}
          >
            Delete Hazard
          </Button>
        </div>
        <div className="ew-hazard-content">
          <div className="ew-hazard-col">
            <h1>Causes</h1>

            <div className="eh-addField">
              <Input
                placeholder=" + Add Cause"
                onChange={this.updateAddCauseValue}
              />
              <Button onClick={this.addCause}>
                <RiAddLine
                  style={{
                    marginTop: "3px",
                  }}
                />
                Add
              </Button>
            </div>
            {this.state.hazardSelected.causes.map((cause, index) => {
              return (
                <EditableHazardItem
                  key={cause.concat(index)}
                  data={cause}
                  index={index}
                  updateData={this.updateData}
                  itemType="cause"
                  deleteField={this.deleteField}
                />
              );
            })}
          </div>
          <div className="ew-hazard-col">
            <h1>Consequences</h1>
            <div className="eh-addField">
              <Input
                placeholder=" + Add Consequence"
                onChange={this.updateAddConsequenceValue}
                allowClear
              />
              <Button onClick={this.addConsequence}>
                <RiAddLine
                  style={{
                    marginTop: "3px",
                  }}
                />
                Add
              </Button>
            </div>

            {this.state.hazardSelected.consequences.map(
              (consequence, index) => {
                return (
                  <EditableHazardItem
                    key={consequence.concat(index)}
                    data={consequence}
                    index={index}
                    updateData={this.updateData}
                    itemType="consequence"
                    deleteField={this.deleteField}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  }
}
