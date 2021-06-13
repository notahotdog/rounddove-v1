import React, { Component } from "react";
import axios from "axios";
import { Menu } from "antd";
import EditableHazardComponent from "./TableComponents/EditableHazardComponent";
import AddHazardModal from "./modalComponents/AddHazardModal";
import LoadDataPromptPage from "./DisplayComponents/LoadDataPromptPage";
// import { getHazardsFromDB } from "../util/BackendService";

export default class EditHazardsPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      hazardList: [""],
      hazardSelected: {
        id: "",
        hazardName: "Default",
        causes: ["Default"],
        consequences: ["Default"],
        preventativeSafeguards: ["Default"],
        mitigatingSafeguards: ["Default"],
      },
      modalVisible: false,
      isHazardSelected: false,
      //Saves choice within parent component
    };

    this.getHazardData = this.getHazardData.bind(this);
    this.updateClickedItem = this.updateHazardSelected.bind(this);
    this.loadData = this.loadData.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setHazardSelectedTrue = this.setHazardSelectedTrue.bind(this);
  }

  //Extract Hazard Data
  getHazardData(workshopList) {
    var extractedHazardsList = [];

    workshopList.forEach((workshop) => {
      workshop.nodes.forEach((node) => {
        node.subnodes.forEach((subnode) => {
          subnode.hazards.forEach((hazard) => {
            extractedHazardsList.push(hazard);
          });
        });
      });
    });

    console.log("Extracted Hazard List: ", extractedHazardsList);
  }

  componentDidMount() {
    console.log("Edit Hazards Page Instance");
    this._isMounted = true;

    // axios.get("http://localhost:5000/workshop/").then((response) => {
    //   console.log("Fetch Data", response.data);

    //   const extractedData = this.getHazardData(response.data);
    //   // this.setState({ data: response.data });
    // });

    //should periodically fetch data

    // axios.get("http://localhost:5000/workshop/hazard").then((response) => {
    //   console.log("Fetch Data", response.data);
    //   this.setState({ hazardList: response.data });
    // });

    this.timer = setInterval(() => this.loadData(), 500);

    //Get Extract all the Hazards Found from the Backend sort by ascending order of hazards
    //Iterate through all the data/nodes/subnodes/store the associated
  }

  loadData() {
    axios.get("http://localhost:5000/workshop/hazard").then((response) => {
      this.setState({ hazardList: response.data });
    });
  }

  setHazardSelectedTrue() {
    console.log("HAZARD IS SELECTED");
    this.setState({ isHazardSelected: true });
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  /**
   * Hides Modal
   */
  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * set state of Hazard Selected
   * @param {Object} hazard
   */
  updateHazardSelected(hazard) {
    var hazardObj = hazard;
    hazardObj.id = hazard._id; //Makes the hazard id identifiable could be bad practice
    this.setState({ hazardSelected: hazardObj }, () => {
      //testHazard Selected feature
      console.log("Hazard Selected: ", this.state.hazardSelected);
    });
  }

  render() {
    const { isHazardSelected } = this.state;
    return (
      <div className="ew-main-div">
        <div className="ew-main-header">
          <h1>Edit Hazards</h1>
        </div>
        <AddHazardModal
          visible={this.state.modalVisible}
          closeModal={this.hideModal}
        />
        <div className="ew-main-body">
          <div className="ew-left-col">
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="Add Hazard Button" onClick={this.showModal}>
                Add Hazard
              </Menu.Item>
              {this.state.hazardList.map((hazard, index) => {
                return (
                  <Menu.Item
                    key={hazard._id}
                    onClick={() => {
                      this.updateHazardSelected(hazard);
                      this.setHazardSelectedTrue();
                    }}
                  >
                    {hazard.hazardName}
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
          {isHazardSelected ? (
            <div className="ew-right-col">
              <EditableHazardComponent
                hazardSelected={this.state.hazardSelected}
              />
            </div>
          ) : (
            <LoadDataPromptPage />
          )}
          {/* <div className="ew-right-col">
            <EditableHazardComponent
              hazardSelected={this.state.hazardSelected}
            />
          </div> */}
        </div>
      </div>
    );
  }
}
