import React, { Component } from "react";
import { Input } from "antd";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiSave } from "react-icons/fi";

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
    this.deleteCurrentField = this.deleteCurrentField.bind(this);
  }

  setEditable() {
    this.setState({ editable: true });
  }

  setNotEditable() {
    this.setState({ editable: false });
  }

  /**
   *  Change field type to not editable if user press enter
   * @param {event} e
   */
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.setNotEditable();
    }
  };
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

  //Update individual field state
  updateFieldName = (e) => {
    this.setState({ dataAssessed: e.target.value });
    // this.props.updateData(e.target.value, this.props.index);
  };

  //Detect Changed state than triggers the option to change
  saveToParent() {
    this.props.updateData(
      this.state.dataAssessed,
      this.props.index,
      this.props.itemType
    );
  }

  //Delete hazardField
  deleteCurrentField() {
    //Triggers parent function that takes in the type, and the index of the function
    console.log(
      "Deleting field: ",
      this.state.dataAssessed,
      " type: ",
      this.props.itemType,
      " index:",
      this.props.index
    );
    this.props.deleteField(this.props.itemType, this.props.index);
  }

  render() {
    if (!this.state.editable) {
      return (
        <div className="ehi-box">
          {/* {this.state.dataAssessed} */}
          {this.saveToParent()}
          <div className="ehi-box-default" onDoubleClick={this.setEditable}>
            <div style={{ marginLeft: "5px" }}>{this.state.dataAssessed}</div>
          </div>
          <AiOutlineEdit />
          <AiOutlineDelete onClick={this.deleteCurrentField} />
        </div>
      );
    } else {
      return (
        <div className="ehi-box">
          <Input
            defaultValue={this.state.dataAssessed}
            onDoubleClick={this.setNotEditable}
            onKeyPress={this.handleKeyPress}
            size="small"
            style={{ width: "95%" }}
            onChange={this.updateFieldName}
          />
          <FiSave />
          <AiOutlineDelete onClick={this.deleteCurrentField} />
        </div>
      );
    }
  }
}

// export default onClickOutside(EditableHazardItem);