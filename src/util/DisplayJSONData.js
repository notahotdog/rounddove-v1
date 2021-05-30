import React, { Component } from "react";
import { Typography } from "antd";
import "../App.css";

const { Title } = Typography;

export default class DisplayJSONData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonData: [],
    };
  }

  render() {
    // console.log("Display JSON Data Component");
    const { data } = this.props;
    return (
      <div className="json-display">
        <div className="json-display-header">
          <Title className="json-workshop-name" level={3}>
            Workshop Name : {data.workshopName}{" "}
          </Title>
          <Title className="json-no-components" level={5}>
            No of Components : {data.components.length}
          </Title>
        </div>

        <div className="json-display-body">
          {data.components.map((component, index) => {
            return (
              <div className="json-display-component" key={index}>
                <Title className="json-component-name" level={4}>
                  Component: {component.componentName}
                </Title>
                <div className="json-display-subcomponents">
                  {component.subcomponents.map((subcomponent, subIndex) => {
                    return (
                      <div key={subIndex}>
                        <Title className="json-subcomponent-name" level={4}>
                          Subcomponent: {subcomponent.subcomponentName}
                        </Title>
                        {/* <Title level={5}>Hazards</Title> */}
                        {subcomponent.hazards.map((hazard, hazardIndex) => {
                          return (
                            <div
                              className="json-display-hazard"
                              key={hazardIndex}
                            >
                              <div className="json-display-hazards-col">
                                <div className="json-hazard-name">
                                  <div className="hazard-heading">Hazard:</div>
                                  {hazard.hazardName}
                                </div>
                              </div>

                              <div className="json-display-hazards-col">
                                <div className="json-display-causes">
                                  <div className="causes-heading">Causes: </div>
                                  <div className="causes-points">
                                    {hazard.causes.map((cause, causeIndex) => {
                                      return (
                                        <div key={causeIndex}>{cause}</div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              <div className="json-display-hazards-col">
                                <div className="json-display-consequences">
                                  <div className="consequences-heading">
                                    Consequences:{" "}
                                  </div>
                                  <div className="consequences-points">
                                    {hazard.consequences.map(
                                      (consequence, consequenceIndex) => {
                                        return (
                                          <div key={consequenceIndex}>
                                            {consequence}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="json-display-hazards-col">
                                <div className="json-display-preventitiveSafeguards">
                                  <div className="preventitiveSafeguards-heading">
                                    Preventitive Safeguards:{" "}
                                  </div>
                                  <div className="preventitiveSafeguards-points">
                                    {hazard.preventitiveSafeguards.map(
                                      (
                                        preventitiveSafeguard,
                                        preventitiveSafeguardIndex
                                      ) => {
                                        return (
                                          <div key={preventitiveSafeguardIndex}>
                                            {preventitiveSafeguard}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="json-display-hazards-col">
                                <div className="json-display-mitigatingSafeguards">
                                  <div className="mitigatingSafeguards-heading">
                                    Mitigating Safeguards:{" "}
                                  </div>
                                  <div className="mitigatingSafeguards-points">
                                    {hazard.mitigatingSafeguards.map(
                                      (
                                        mitigatingSafeguard,
                                        mitigatingSafeguardIndex
                                      ) => {
                                        return (
                                          <div key={mitigatingSafeguardIndex}>
                                            {mitigatingSafeguard}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
