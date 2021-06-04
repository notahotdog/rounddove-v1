import React, { Component } from "react";
import { Input } from "antd";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiEdit, FiSave } from "react-icons/fi";
import { RiDeleteBin4Fill } from "react-icons/ri";

export default class EditableHazardItem extends Component {
  _isMounted = false;
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
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      console.log("Edit Hazard Item Updated");
      console.log("Data Assessed: ", this.props.data);
      this.setState({ dataAssessed: this.props.data });
      // this.setState({ dataAssessed: this.props.dataAssessed });
    }
  }

  render() {
    if (!this.state.editable) {
      return (
        <div className="ehi-box">
          {/* {this.state.dataAssessed} */}
          <div className="ehi-box-default" onDoubleClick={this.setEditable}>
            <div style={{ marginLeft: "5px" }}>{this.state.dataAssessed}</div>
          </div>
          <AiOutlineEdit />
          <AiOutlineDelete />
          {/* <RiDeleteBin4Fill /> */}
        </div>
      );
    } else {
      return (
        <div className="ehi-box">
          <Input
            defaultValue={this.state.dataAssessed}
            onDoubleClick={this.setNotEditable}
            size="small"
            style={{ width: "95%" }}
          />
          <FiSave />
          {/* <AiOutlineEdit /> */}
          <AiOutlineDelete />
        </div>
      );
    }
  }
}

// export default onClickOutside(EditableHazardItem);
