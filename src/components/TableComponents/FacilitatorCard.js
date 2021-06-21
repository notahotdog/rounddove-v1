import React, { Component } from "react";
import "../../FacilitatorPage.css";
import { Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
// import DisplayWorkshop from "../DisplayWorkshop";
import "../../FacilitatorPage.css";
import axios from "axios";

export default class FacilitatorCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.exportToExcel = this.exportToExcel.bind(this);
  }

  //onClick should Bring Me to A page where it will trigger a workshop
  onStartWorkshop() {
    //use Workshop props Data
    console.log("Start Workshop");
  }

  exportToExcel() {
    //export using axios
    // axios.post("")
    console.log("Export to excel", this.props.data);
    axios.post("http://localhost:5000/workshop/exportToExcel", this.props.data); //Send Payload to Backend
  }

  //Takes in Data from Parent and Displays
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div className="card">
        <div className="fc-card-col-left">
          <div className="fc-card-checkbox-overview">
            <div className="fc-checkbox-title">Display Workshop</div>
            <div className="fc-checkbox-button">
              <Checkbox stule={{ margintTop: "5px" }} />
            </div>
          </div>
          <div className="fc-card-button-overview">
            <Button>
              <Link
                to={{
                  pathname: "/FacilitateWorkshopPage/DisplayWorkshop/",
                  state: { data: this.props.data },
                }}
              >
                Start Workshop
              </Link>
            </Button>
            <Button onClick={this.exportToExcel}>Export to excel</Button>
          </div>
        </div>
        <div className="fc-card-col-right">
          <div className="fc-card-right-header">
            <div className="fc-header-card">
              <div className="fc-workshop-name">{data.workshopName}</div>
              <div className="fc-workshop-id">ID: {data._id}</div>
            </div>
          </div>
          <div className="fc-card-right-footer">
            <div className="fc-footer-card">
              <div className="fc-footer-col-1">
                <div className="fc-footer-header">Status</div>
                <div className="fc-col-content">Completed</div>
              </div>
              <div className="fc-footer-col-2">
                <div className="fc-footer-header">Nodes</div>
                <div className="fc-col-content">
                  {data.nodes.map((node, nodeIndex) => {
                    if (nodeIndex <= 2) {
                      return <div key={nodeIndex}>- {node.nodeName}</div>;
                    }
                  })}
                </div>
              </div>
              <div className="fc-footer-col-3">
                <div className="fc-footer-header">Date Hosted</div>
                <div className="fc-col-content">12/22/2021</div>
              </div>
            </div>
          </div>
        </div>
        {/* 
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
          <Button>
            <Link
              to={{
                pathname: "/FacilitateWorkshopPage/DisplayWorkshop/",
                state: { data: this.props.data },
              }}
            >
              Start Workshop
            </Link>
          </Button>
          <div className="workshop-facilitator">Facilitator: Josie</div>
        </div> */}
      </div>
    );
  }
}
