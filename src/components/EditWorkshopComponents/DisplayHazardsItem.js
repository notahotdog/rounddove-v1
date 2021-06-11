import React, { Component } from "react";
import { Checkbox } from "antd";

export default class DisplayHazardsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.mitigatingSafeguard.visible,
    };
    this.checkItem = this.checkItem.bind(this);
    this.updateChecked = this.updateChecked.bind(this);
  }

  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  checkItem() {
    console.log("Parents called child");
    this.setState({ checked: true });
  }

  updateChecked() {
    //Should Update Parent Component
    console.log("updateChecked: ", this.props.index, this.props.dType);
    const { dType, index } = this.props;
    this.props.toggleChecked(dType, index);
    //     this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <div className="dhi-box">
        <div className="dh-item-content">
          {this.props.mitigatingSafeguard.name}
        </div>

        <Checkbox
          onChange={this.onChange}
          checked={this.props.mitigatingSafeguard.visible}
          onClick={this.updateChecked}
        />
      </div>
    );
  }
}
