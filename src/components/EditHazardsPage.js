import React, { Component } from "react";
import axios from "axios";
import { Menu } from "antd";
import EditableHazardComponent from "./TableComponents/EditableHazardComponent";

export default class EditHazardsPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      hazardList: [],
      hazardSelected: {
        id: "",
        hazardName: "Default",
        causes: ["Default"],
        consequences: ["Default"],
        preventativeSafeguards: ["Default"],
        mitigatingSafeguards: ["Default"],
      },
    };

    this.getHazardData = this.getHazardData.bind(this);
    this.updateClickedItem = this.updateHazardSelected.bind(this);
    this.loadData = this.loadData.bind(this);
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
    //For Adding Selected Data to Backend Database
    // axios.post(
    //   "http://localhost:5000/workshop/addHazard",
    //   extractedHazardsList[9]
    // ); //Need to change to fit nodes
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
    this.setState({ hazardSelected: hazardObj });
  }

  render() {
    return (
      <div className="ew-main-div">
        <div className="ew-main-header">
          <h1>Edit Hazards</h1>
        </div>
        <div className="ew-main-body">
          <div className="ew-left-col">
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item
                key="Add Hazard Button"
                onClick={() => alert("ADD Hazard")}
              >
                Show Modal here Add Hazard
              </Menu.Item>
              {this.state.hazardList.map((hazard, index) => {
                return (
                  <Menu.Item
                    key={hazard._id}
                    onClick={() =>
                      this.updateHazardSelected(hazard, hazard._id)
                    }
                  >
                    {hazard.hazardName}
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
          <div className="ew-right-col">
            <EditableHazardComponent
              hazardSelected={this.state.hazardSelected}
            />
          </div>
        </div>

        {/* <div>this.state.data.</div> */}
      </div>
    );
  }
}