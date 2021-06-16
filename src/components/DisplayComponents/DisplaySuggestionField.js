import React, { Component } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default class DisplaySuggestionField extends Component {
  //Pass in suggestion Field
  constructor(props) {
    super(props);

    this.state = {};
    this.deleteSuggestion = this.deleteSuggestion.bind(this);
  }

  deleteSuggestion() {
    this.props.deleteSuggestion(this.props.type, this.props.index);
  }

  render() {
    return (
      <div className="display-suggestion-field">
        <div>{this.props.suggestion.name}</div>
        <CloseOutlined
          className="cancel-suggestion"
          onClick={this.deleteSuggestion}
        />
      </div>
    );
  }
}
