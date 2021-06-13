import React, { Component } from "react";
import axios from "axios";
import { Button, Select, Checkbox } from "antd";
import DisplayHazardsItem from "./DisplayHazardsItem";
import { addVisibilityElement } from "../../util/Utilities";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import LoadDataPromptPage from "../DisplayComponents/LoadDataPromptPage";

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
      savedSelection: false,
      isHazardSelected: false,
    };

    this.onChange = this.onChange.bind(this);
    this.saveHazardChoice = this.saveHazardChoice.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.toggleCheckAll = this.toggleCheckAll.bind(this);
  }

  componentDidMount() {
    //Should set this
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
    //set state of hazard Selected
    this.setState({ isHazardSelected: true });
    console.log(`selected ${value}`);
    const { hazardList } = this.state;

    //match using the value
    hazardList.forEach((hazard) => {
      if (hazard._id === value) {
        this.setState({ hazardSelected: hazard });
      }
    });
  }

  /**
   * Toggle between checking/ unchecking everything
   * @param {target} e  target to be modified
   */

  /**
   *
   * @param {target} e
   * @param {String} itemType of
   */
  toggleCheckAll(e, itemType) {
    var checkAssert = e.target.checked;
    const { hazardSelected } = this.state;

    var obj = { ...hazardSelected };

    var causeList = [...hazardSelected.causes];
    var consequenceList = [...hazardSelected.consequences];
    var pSafeguardList = [...hazardSelected.preventativeSafeguards];
    var mSafeguardList = [...hazardSelected.mitigatingSafeguards];

    if (itemType === "cause") {
      causeList.forEach((item) => {
        item.visible = checkAssert;
      });
    } else if (itemType === "consequence") {
      consequenceList.forEach((item) => {
        item.visible = checkAssert;
      });
    } else if (itemType === "pSg") {
      pSafeguardList.forEach((item) => {
        item.visible = checkAssert;
      });
    } else if (itemType === "mSg") {
      mSafeguardList.forEach((item) => {
        item.visible = checkAssert;
      });
    }

    obj.causes = causeList;
    obj.consequences = consequenceList;
    obj.preventativeSafeguards = pSafeguardList;
    obj.mitigatingSafeguards = mSafeguardList;

    this.setState({ hazardSelected: obj });
  }

  //Should Provide for all Values
  toggleChecked(dType, index) {
    const { hazardSelected } = this.state;
    var obj = { ...hazardSelected };

    var causesList = [...hazardSelected.causes];
    var consequenceList = [...hazardSelected.consequences];
    var pSafeguardList = [...hazardSelected.preventativeSafeguards];
    var mSafeguardList = [...hazardSelected.mitigatingSafeguards];

    if (dType === "cause") {
      causesList[index].visible = !causesList[index].visible;
      obj.causes = causesList;
    } else if (dType === "consequence") {
      consequenceList[index].visible = !consequenceList[index].visible;
      obj.consequences = consequenceList;
    } else if (dType === "pSg") {
      pSafeguardList[index].visible = !pSafeguardList[index].visible;
      obj.preventativeSafeguards = pSafeguardList;
    } else if (dType === "mSg") {
      mSafeguardList[index].visible = !mSafeguardList[index].visible;
      obj.mitigatingSafeguards = mSafeguardList;
    }

    this.setState({ hazardSelected: obj });
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
    //Saves Choice within parent component
    this.setState({ savedSelection: !this.state.savedSelection });
  }

  render() {
    const { hazardSelected, isHazardSelected } = this.state;
    var editHazardMode = !this.state.savedSelection; // if the selection is not saved(false) , editHazardn

    return (
      <div className="dh-component">
        <div className="dh-header">
          Hazard Selected {hazardSelected.hazardName} .
          <div className="dh-h1">Load Hazard Details: </div>
          <div className="dh-h2">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a hazard"
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
            {editHazardMode ? (
              <Button
                onClick={this.saveHazardChoice}
                style={{ marginLeft: "20px" }}
              >
                {" "}
                Edit Selection
              </Button>
            ) : (
              <Button
                onClick={this.saveHazardChoice}
                style={{ marginLeft: "20px" }}
              >
                {" "}
                Save Selection
              </Button>
            )}
          </div>
        </div>
        <div className="dh-body">
          {!isHazardSelected ? (
            <LoadDataPromptPage />
          ) : (
            <div className="dh-body">
              <div className="dh-col">
                <h1 className="dh-col-header">Causes</h1>
                <Checkbox onChange={(e) => this.toggleCheckAll(e, "cause")}>
                  Select All
                </Checkbox>
                {hazardSelected.causes.map((cause, cIndex) => {
                  return (
                    <DisplayHazardsItem
                      item={cause}
                      index={cIndex}
                      dType="cause"
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dh-col">
                <h1 className="dh-col-header">Consequences</h1>
                <Checkbox
                  onChange={(e) => this.toggleCheckAll(e, "consequence")}
                >
                  Select All
                </Checkbox>
                {hazardSelected.consequences.map((consequence, cIndex) => {
                  return (
                    <DisplayHazardsItem
                      item={consequence}
                      index={cIndex}
                      dType="consequence"
                      toggleChecked={this.toggleChecked}
                    />
                  );
                })}
              </div>
              <div className="dh-col">
                <h1 className="dh-col-header">Preventative Safeguards</h1>
                <Checkbox onChange={(e) => this.toggleCheckAll(e, "pSg")}>
                  Select All
                </Checkbox>
                {hazardSelected.preventativeSafeguards.map(
                  (preventativeSafeguard, pIndex) => {
                    return (
                      <DisplayHazardsItem
                        item={preventativeSafeguard}
                        index={pIndex}
                        dType="pSg"
                        toggleChecked={this.toggleChecked}
                      />
                    );
                  }
                )}
              </div>
              <div className="dh-col">
                <h1 className="dh-col-header">Mitigating Safeguards</h1>
                <Checkbox onChange={(e) => this.toggleCheckAll(e, "mSg")}>
                  Select All
                </Checkbox>
                {hazardSelected.mitigatingSafeguards.map(
                  (mitigatingSafeguard, mIndex) => {
                    return (
                      <DisplayHazardsItem
                        item={mitigatingSafeguard}
                        index={mIndex}
                        dType="mSg"
                        toggleChecked={this.toggleChecked}
                      />
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
