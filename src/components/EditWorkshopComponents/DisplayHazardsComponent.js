import React, { Component } from "react";
import axios from "axios";
import { Button, Select } from "antd";
import DisplayHazardsItem from "./DisplayHazardsItem";
import { addVisibilityElement } from "../../util/Utilities";

const { Option } = Select;

export default class DisplayHazardsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hazardNameParent: "",
      hazardList: [""],
      hazardSelected: {
        id: "",
        hazardName: "Default",
        causes: ["Default"],
        consequences: ["Default"],
        preventativeSafeguards: ["Default"],
        mitigatingSafeguards: ["Default"],
      },
    };

    this.onChange = this.onChange.bind(this);
    this.saveHazardChoice = this.saveHazardChoice.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.selAllMs = this.selAllMs.bind(this);
  }

  componentDidMount() {
    console.log("hazard Loaded: ", this.props.hazardName);
    this.setState({ hazardNameParent: this.props.hazardName });
    axios.get("http://localhost:5000/workshop/hazard").then((response) => {
      this.setState({ hazardList: response.data }, () => {
        //Update the hazardList data and everything inside to represent visibility
        const { hazardList } = this.state;
        const updateList = [];
        hazardList.forEach((hazard) => {
          var hazardObj = addVisibilityElement(hazard);
          updateList.push(hazardObj);
        });
        console.log("x", updateList);
        this.setState({ hazardList: updateList });
      });
    });
  }

  onChange(value) {
    console.log(`selected ${value}`);
    const { hazardList } = this.state;

    //match using the value
    var obj;
    hazardList.forEach((hazard) => {
      if (hazard._id == value) {
        this.setState({ hazardSelected: hazard });
      }
    });
  }

  selAllMs() {
    //For all this.state
    const { hazardSelected } = this.state;
    var obj = { ...hazardSelected };

    var mSafeguardList = [...hazardSelected.mitigatingSafeguards];
    mSafeguardList.forEach((sg) => {
      sg.visible = true;
    });
    obj.mitigatingSafeguards = mSafeguardList;
    console.log("mList", obj);
    this.setState({ hazardSelected: obj });
  }

  toggleChecked(dType, index) {
    const { hazardSelected } = this.state;
    var obj = { ...hazardSelected };
    var mSafeguardList = [...hazardSelected.mitigatingSafeguards];
    if (dType == "mSg") {
      mSafeguardList[index].visible = !mSafeguardList[index].visible;
      obj.mitigatingSafeguards = mSafeguardList;
    }

    this.setState({ hazardSelected: obj });
    // console.log("TOGGLE CHECKED", mSafeguardList);
  }

  //   onBlur() {
  //     console.log("blur");
  //   }
  //   onFocus() {
  //     console.log("focus");
  //   }

  //   onSearch(val) {
  //     console.log("search:", val);
  //   }

  saveHazardChoice() {
    //Saves choice within parent component
  }

  render() {
    const { hazardSelected } = this.state;

    // {this.state.hazardNameParent}
    return (
      <div className="dh-component">
        <div className="dh-header">
          <div className="dh-h1">Load Hazard Details: </div>
          <div className="dh-h2">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.hazardList.map((hazard, hazardIndex) => {
                return <Option value={hazard._id}>{hazard.hazardName}</Option>;
              })}
            </Select>
            <Button
              onClick={this.saveHazardChoice}
              style={{ marginLeft: "20px" }}
            >
              {" "}
              Save Selection
            </Button>
          </div>
        </div>
        <div className="dh-body">
          <div className="dh-col">
            <h1 className="dh-col-header">Causes</h1>
            {hazardSelected.causes.map((cause, index) => {
              return (
                <div>
                  index: {index}, cause: {cause.name}
                </div>
              );
            })}
          </div>
          <div className="dh-col">
            <h1 className="dh-col-header">Consequences</h1>
            {hazardSelected.consequences.map((consequence, index) => {
              return (
                <div>
                  index: {index}, consequence: {consequence.name}
                </div>
              );
            })}
          </div>
          <div className="dh-col">
            <h1 className="dh-col-header">Preventative Safeguards</h1>
            {hazardSelected.preventativeSafeguards.map(
              (preventativeSafeguard, index) => {
                return (
                  <div>
                    index: {index}, preventativeSafeguard:{" "}
                    {preventativeSafeguard.name}
                  </div>
                );
              }
            )}
          </div>
          <div className="dh-col">
            <h1 className="dh-col-header">Mitigating Safeguards</h1>
            <Button onClick={this.selAllMs}>Select All</Button>
            {hazardSelected.mitigatingSafeguards.map(
              (mitigatingSafeguard, mIndex) => {
                return (
                  <DisplayHazardsItem
                    mitigatingSafeguard={mitigatingSafeguard}
                    index={mIndex}
                    dType="mSg"
                    toggleChecked={this.toggleChecked}
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
