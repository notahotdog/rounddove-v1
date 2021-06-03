import React, { Component } from "react";

export default class EditableHazardComponent extends Component {
  render() {
    return (
      <div>
        Editable Hazard Component
        <div>Hazard Selected : {this.props.hazardSelected.hazardName}</div>
      </div>
    );
  }
}
