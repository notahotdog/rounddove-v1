import React, { Component } from "react";
import "../FacilitatorPage.css";
import EditWorkshopBody from "./EditWorkshopComponents/EditWorkshopBody.component";
import axios from "axios";

export default class EditWorkshop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeSelected: "",
      subnodeSelected: "",
      hazardSelected: "",
      tags: [""],
      data: {
        workshop: "",
        workshopName: "",
        tags: [""],
        _id: "",
        nodes: [
          {
            nodeName: "",
            subnodes: [
              {
                subnodeName: "",
                hazards: [
                  {
                    hazardName: "",
                    causes: [""],
                    consequences: [""],
                    preventativeSafeguards: [""],
                    mitigatingSafeguards: [""],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    this.setNodeSelected = this.setNodeSelected.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  //Should periodically fetch data since it only passes the props on componentMound

  componentDidMount() {
    console.log(this.props.location.state.workshop._id, "Workshop Generated");
    const propsWorkshopId = this.props.location.state.workshop._id;
    console.log(propsWorkshopId);

    this.timer = setInterval(() => this.loadData(propsWorkshopId), 500);
  }

  loadData(workshopId) {
    //Need to solve async issue - if i dont put this, sometimes an undefined workshopID is passed, hence the param, might be wrong since it doesnt point to an appropriate endpoint
    if (workshopId !== "undefined") {
      var apiEndpoint =
        "http://localhost:5000/workshop/workshopDetails/" + workshopId;

      axios.get(apiEndpoint).then((response) => {
        this.setState({
          data: response.data,
          workshopName: response.data.workshopName,
          tags: response.data.tags,
        });
      });
    }
  }

  setNodeSelected(nameNode, nameSubnode, nameHazard) {
    this.setState({
      nodeSelected: nameNode,
      subnodeSelected: nameSubnode,
      hazardSelected: nameHazard,
    });
  }

  render() {
    return (
      <div>
        <div className="ew-header">
          <div className="ew-header-left-col">
            <div className="ew-header-title">{this.state.workshopName}</div>

            <div className="ew-header-node-details">
              <div className="ew-node-details-item">
                Node Assessed: {this.state.nodeSelected}
              </div>
              <div className="ew-node-details-item">
                Sub node Assessed: {this.state.subnodeSelected}
              </div>
              <div className="ew-node-details-item">
                Hazard Assessed: {this.state.hazardSelected}
              </div>
            </div>
          </div>

          <div className="ew-header-right-col">
            <div className="ew-tags">
              Tags{" "}
              {this.state.tags.map((tag, index) => {
                return (
                  <div className="ew-node-details-item" key={index}>
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <EditWorkshopBody
          data={this.state.data}
          setNodeSelected={this.setNodeSelected}
        />
      </div>
    );
  }
}
