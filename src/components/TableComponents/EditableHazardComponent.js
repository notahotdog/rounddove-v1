import React, { Component } from "react";
import EditableHazardItem from "./EditableHazardItem";
import { Button, Input, message } from "antd";
import axios from "axios";
import { RiAddFill, RiAddLine } from "react-icons/ri";
import { CloudFilled } from "@ant-design/icons";

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
  }

  componentDidMount() {
    this._isMounted = true;
    //Set the state of the props
    console.log("Editable Hazard Component Mounted");
    // this.setState({ hazardSelected: this.props.hazardSelected });
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

  /**
   *  Update
   */
  saveHazardUpdatetoBackend() {
    console.log(
      "SAVE HAZARD TO BACKEND: ",
      JSON.stringify(this.state.hazardSelected)
    );
    message.success("Saved Hazard Data to Backend");

    //Update Backend
    axios.post(
      "http://localhost:5000/workshop/updateHazard",
      this.state.hazardSelected
    );
  }

  // //Function to pass data from child to parent component
  // updateData(consequence, index) {
  //   //itemtype
  //   const tempArr = this.state.hazardSelected.consequences; //Should copy not pass by ref
  //   tempArr[index] = consequence;
  //   //Improper method to change state variables
  // }

  //Function to pass data from child to parent component
  updateData(data, index, itemType) {
    if (itemType === "cause") {
      const causesArr = this.state.hazardSelected.causes; //Should copy not pass by ref
      causesArr[index] = data;
    } else if (itemType === "consequence") {
      const consequencesArr = this.state.hazardSelected.consequences; //Should copy not pass by ref
      consequencesArr[index] = data;
    }

    //update data

    //Improper method to change state variables
  }

  /**
   * Add consequence to list of consequence
   */
  addCause() {
    alert("adding cause");
    var causes = [...this.state.hazardSelected.causes];
    causes.push(this.state.addCause);
    var hazardSelectedUpdate = { ...this.state.hazardSelected };
    hazardSelectedUpdate.causes = causes;
    // hazardSelectedUpdate.causes = causes;
    this.setState({ hazardSelected: hazardSelectedUpdate });
    // this.setState({ addCause: "" });
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

  //deleteField
  deleteField(itemType, index) {
    var hazardSelectedUpdate = { ...this.state.hazardSelected };
    if (itemType == "cause") {
      var causes = [...this.state.hazardSelected.causes];
      causes.splice(index, 1);
      hazardSelectedUpdate.causes = causes;
      // hazardSelectedUpdate.causes = [
      //   ...this.state.hazardSelected.causes,
      // ].splice(index, 1);
      this.setState({
        hazardSelected: hazardSelectedUpdate,
      });
    }

    if (itemType == "consequence") {
      var consequences = [...this.state.hazardSelected.consequences];
      consequences.splice(index, 1);
      var hazardSelectedUpdate = { ...this.state.hazardSelected };
      hazardSelectedUpdate.consequences = consequences;
      this.setState({ hazardSelected: hazardSelectedUpdate });
      this.setState({ addConsequence: "" });
    }
  }

  render() {
    // console.log(
    //   "Editable Hazard Component ID selected",
    //   this.state.hazardSelected
    // );
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
