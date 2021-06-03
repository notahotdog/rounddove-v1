import React, { Component } from "react";
import { Input } from "antd";

export default class EditableHazardItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      dataAssessed: this.props.data,
    };

    this.setEditable = this.setEditable.bind(this);
    this.setNotEditable = this.setNotEditable.bind(this);
  }

  setEditable() {
    this.setState({ editable: true });
  }

  setNotEditable() {
    this.setState({ editable: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      console.log("new props");
      this.setState({ dataAssessed: this.props.dataAssessed });
    }
  }

  render() {
    if (!this.state.editable) {
      return (
        <div className="ehi-box">
          <div onDoubleClick={this.setEditable}>{this.state.dataAssessed}</div>
        </div>
      );
    } else {
      return (
        <div className="ehi-box">
          <Input
            defaultValue={this.state.dataAssessed}
            onDoubleClick={this.setNotEditable}
          />
        </div>
      );
    }
  }
}

// export default onClickOutside(EditableHazardItem);
