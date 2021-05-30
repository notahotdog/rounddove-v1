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
                <div className="json-component-name">
                  Component: {component.componentName}
                </div>
                <div className="json-display-subcomponents">
                  {component.subcomponents.map((subcomponent, subIndex) => {
                    return (
                      <div key={subIndex}>
                        <div className="json-subcomponent-name">
                          Subcomponent: {subcomponent.subcomponentName}
                        </div>

                        <div className="json-display-hazards-col-heading">
                          <div className="json-hazard-col-heading">Hazard</div>
                          <div className="json-hazard-col-heading">Causes</div>
                          <div className="json-hazard-col-heading">
                            Consequences
                          </div>
                          <div className="json-hazard-col-heading">
                            Preventative Safeguards
                          </div>
                          <div className="json-hazard-col-heading">
                            Mitigating Safeguards
                          </div>
                        </div>

                        {subcomponent.hazards.map((hazard, hazardIndex) => {
                          return (
                            <div
                              className="json-display-hazard"
                              key={hazardIndex}
                            >
                              <div className="json-display-hazards-col">
                                <div className="json-hazard-name">
                                  • {hazard.hazardName}
                                </div>
                              </div>

                              <div className="json-display-hazards-col">
                                <div className="json-display-causes">
                                  <div className="json-display-points">
                                    {hazard.causes.map((cause, causeIndex) => {
                                      return (
                                        <div key={causeIndex}> • {cause}</div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              <div className="json-display-hazards-col">
                                <div className="json-display-consequences">
                                  <div className="json-display-points">
                                    {hazard.consequences.map(
                                      (consequence, consequenceIndex) => {
                                        return (
                                          <div key={consequenceIndex}>
                                            • {consequence}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="json-display-hazards-col">
                                <div className="json-display-preventitiveSafeguards">
                                  <div className="json-display-points">
                                    {hazard.preventativeSafeguards.map(
                                      (
                                        preventativeSafeguard,
                                        preventativeSafeguardIndex
                                      ) => {
                                        return (
                                          <div key={preventativeSafeguardIndex}>
                                            • {preventativeSafeguard}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="json-display-hazards-col">
                                <div className="json-display-mitigatingSafeguards">
                                  <div className="json-display-points">
                                    {hazard.mitigatingSafeguards.map(
                                      (
                                        mitigatingSafeguard,
                                        mitigatingSafeguardIndex
                                      ) => {
                                        return (
                                          <div key={mitigatingSafeguardIndex}>
                                            • {mitigatingSafeguard}
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
