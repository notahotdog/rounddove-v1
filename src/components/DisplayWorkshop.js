import React, { Component } from "react";
import DisplayWorkshopBody from "./DisplayComponents/DisplayWorkshopBody.component";
import { Menu } from "antd";

//Displays Individual Workshop, Needs data to be passed from link
export default class DisplayWorkshop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeSelected: "",
      subnodeSelected: "",
    };

    this.setNodeSelected = this.setNodeSelected.bind(this);
  }

  componentDidMount() {
    console.log(
      this.props.location.state.data.workshopName,
      "Workshop Generated"
    );
  }

  //Obtain From Children - Node to be assesed
  setNodeSelected(nameNode, nameSubnode) {
    this.setState({ nodeSelected: nameNode, subnodeSelected: nameSubnode });
  }

  render() {
    const workshop = this.props.location.state.data;
    return (
      <div>
        <div className="dw-header">
          <div className="dw-header-title">{workshop.workshopName}</div>
          <div className="dw-header-details">
            <div>Node Assessed: {this.state.nodeSelected}</div>
            <div>Sub node Assessed: {this.state.subnodeSelected}</div>
          </div>
        </div>
        <DisplayWorkshopBody
          data={workshop}
          setNodeSelected={this.setNodeSelected}
        />
      </div>
    );
  }
}
