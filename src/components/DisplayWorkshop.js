import React, { Component } from "react";
import DisplayWorkshopBody from "./DisplayComponents/DisplayWorkshopBody.component";

//Displays Individual Workshop, Needs data to be passed from link
export default class DisplayWorkshop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeSelected: "",
      subnodeSelected: "",
      hazardSelected: "",
    };

    this.setNodeSelected = this.setNodeSelected.bind(this);
  }

  componentDidMount() {
    console.log(
      this.props.location.state.data.workshopName,
      "Workshop Generated"
    );
  }

  //Need  nodeIndex, subnodeIndex
  setNodeSelected(nameNode, nameSubnode, nameHazard) {
    this.setState({
      nodeSelected: nameNode,
      subnodeSelected: nameSubnode,
      hazardSelected: nameHazard,
    });
  }

  render() {
    const workshop = this.props.location.state.data;
    return (
      <div>
        <div className="dw-header">
          <div className="dw-header-left-col">
            <div className="dw-header-title">{workshop.workshopName}</div>
            <div className="dw-node-details">
              <div className="item-subtitle">
                <div className="dw-node-title">Node Assessed:</div>
                <div className="dw-item-content">{this.state.nodeSelected}</div>
              </div>
              <div className="item-subtitle">
                <div className="dw-node-title">Sub node Assessed:</div>
                <div className="dw-item-content">
                  {this.state.subnodeSelected}
                </div>
              </div>
              <div className="item-subtitle">
                <div className="dw-node-title">Hazard Assessed:</div>
                <div className="dw-item-content">
                  {this.state.hazardSelected}
                </div>
              </div>
            </div>
          </div>
          <div className="dw-header-right-col">Some other data</div>
        </div>
        <DisplayWorkshopBody
          data={workshop}
          setNodeSelected={this.setNodeSelected}
        />
      </div>
    );
  }
}

{
  /* 
<div className="dw-header-details">
  <div>Node Assessed: {this.state.nodeSelected}</div>
  <div>Sub node Assessed: {this.state.subnodeSelected}</div>
  <div>Hazard Assessed: {this.state.hazardSelected}</div>
</div> */
}
