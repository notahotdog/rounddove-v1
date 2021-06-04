import React, { Component } from "react";
import EditableHazardItem from "./EditableHazardItem";

export default class EditableHazardComponent extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      hazardSelected: {
        id: this.props.hazardSelected.id,
        hazardName: this.props.hazardSelected.hazardName,
        causes: this.props.hazardSelected.causes,
        // causes: ["cause1", "cause2"],
        consequences: this.props.hazardSelected.consequences,
        preventativeSafeguards:
          this.props.hazardSelected.preventativeSafeguards,
        mitigatingSafeguards: this.props.hazardSelected.mitigatingSafeguards,
      },
    };
  }

  componentDidMount() {
    this._isMounted = true;
    //Set the state of the props
    console.log("Editable Hazard Component Mounted");
    // this.setState({ hazardSelected: this.props.hazardSelected });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   *  Checks whether there has been an update - by checking the difference between props
   * @param {props} prevProps no value needs to be passed in - automatic
   */
  componentDidUpdate(prevProps) {
    if (this.props.hazardSelected !== prevProps.hazardSelected) {
      console.log("Hazard Selected Updated: ", this.props.hazardSelected);
      this.setState({ hazardSelected: this.props.hazardSelected });
    }
  }

  render() {
    // const { hazardSelected } = this.props;
    console.log(
      "Editable Hazard Component ID selected",
      this.state.hazardSelected
    );
    return (
      <div>
        <div className="ew-hazard-sel-title">
          Hazard Selected : {this.props.hazardSelected.hazardName}
        </div>
        <div className="ew-hazard-content">
          <div className="ew-hazard-col">
            <h1>Causes</h1>
            {this.state.hazardSelected.causes.map((cause, index) => {
              return <div key={index}>{cause}</div>;
            })}
          </div>
          <div className="ew-hazard-col">
            <h1>Consequences</h1>
            {this.state.hazardSelected.consequences.map(
              (consequence, index) => {
                return (
                  <EditableHazardItem
                    key={consequence.concat(index)}
                    data={consequence}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  }
}
