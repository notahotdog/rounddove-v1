import React, { Component } from "react";
import EditableHazardItem from "./EditableHazardItem";
import { Button } from "antd";
import axios from "axios";

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
    };

    this.saveHazardUpdatetoBackend = this.saveHazardUpdatetoBackend.bind(this);
    this.updateData = this.updateData.bind(this);
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

    //Update Backend
    axios.post(
      "http://localhost:5000/workshop/updateHazard",
      this.state.hazardSelected
    );
  }

  //Function to pass data from child to parent component
  updateData(consequence, index) {
    const tempArr = this.state.hazardSelected.consequences; //Should copy not pass by ref
    tempArr[index] = consequence;
    //Improper method to change state variables
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
            {this.state.hazardSelected.causes.map((cause, index) => {
              return <div key={index}>{cause}</div>;
            })}
          </div>
          <div className="ew-hazard-col">
            <h1>Consequences</h1>
            {this.state.hazardSelected.consequences.map(
              (consequence, index) => {
                return (
                  <EditableHazardItem
                    key={consequence.concat(index)}
                    data={consequence}
                    index={index}
                    updateData={this.updateData}
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
