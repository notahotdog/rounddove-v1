import React, { Component } from "react";
import "../../FacilitatorPage.css";
import { Typography, Button, Card } from "antd";

const { Title } = Typography;

export default class FacilitatorCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  //onClick should Bring Me to A page where it will trigger a workshop
  onStartWorkshop() {
    //use Workshop props Data
    console.log("Start Workshop");
  }

  //Takes in Data from Parent and Displays
  render() {
    return (
      <div className="card">
        <div className="card-col-left">
          <div className="workshop-name-outline">Workshop:</div>
          <div className="workshop-name">{this.props.data.workshopName}</div>
          <div className="workshop-date-display">Date Hosted: XX/X/2021</div>
          <div className="workshop-status">Status:</div>
          <div className="workshop-status">
            Workshop ID: {this.props.data._id}
          </div>
        </div>
        <div className="card-col-right">
          <Button onClick={this.onStartWorkshop}> Start Workshop </Button>
          <div className="workshop-facilitator">Facilitator: Josie</div>
        </div>
      </div>
    );
  }
}
