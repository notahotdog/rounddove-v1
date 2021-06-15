import React, { Component } from "react";
import "../../FacilitatorPage.css";
import { Menu, Carousel, Button, Typography } from "antd";

const { SubMenu } = Menu;
const { Title } = Typography;

export default class DisplayWorkshopBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hazardLoaded: {
        hazardName: "",
        causes: [""],
        consequences: [""],
        preventativeSafeguards: [""],
        mitigatingSafeguards: [""],
      },
    };

    this.updateClickedItem = this.updateClickedItem.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }

  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }

  //Set The State of the Component
  updateClickedItem(node, subnode, hazard) {
    console.log("State of Menu Item Clicked Hazard", hazard);
    this.props.setNodeSelected(
      node.nodeName,
      subnode.subnodeName,
      hazard.hazardName
    );

    this.setState({ hazardLoaded: hazard });
  }

  //Update Bacekd
  updateBackend(node) {
    console.log("Update Backend");
  }

  //Add Node
  //Add SubNode
  //Add Hazard

  render() {
    const { data } = this.props;
    const { hazardLoaded } = this.state;
    console.log("nodeData", this.props.data.nodes[0].subnodes[0].hazards[0]);
    console.log("Hazard Loaded", hazardLoaded.consequences[0].name);

    return (
      <div className="dw-body">
        <div className="dw-body-left-col">
          <Menu
            onClick={this.handleClick}
            style={{ width: "100%" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
          >
            {data.nodes.map((node) => {
              return (
                <SubMenu key={node.nodeName} title={node.nodeName}>
                  {node.subnodes.map((subnode, subnodeIndex) => {
                    return (
                      <SubMenu
                        key={node.nodeName
                          .concat(subnode.subnodeName)
                          .concat(subnodeIndex)}
                        title={subnode.subnodeName}
                      >
                        {subnode.hazards.map((hazard, hazardIndex) => {
                          return (
                            <Menu.Item
                              key={node.nodeName
                                .concat(subnode.subnodeName)
                                .concat(subnodeIndex)
                                .concat(hazard.hazardName)
                                .concat(hazardIndex)}
                              onClick={() =>
                                this.updateClickedItem(node, subnode, hazard)
                              }
                            >
                              {hazard.hazardName}
                            </Menu.Item>
                          );
                        })}
                      </SubMenu>
                    );
                  })}
                </SubMenu>
              );
            })}
          </Menu>
        </div>
        <div className="dw-body-right-col">
          <div className="dw-body-right-header">
            <Button onClick={this.previous}>Previous</Button>
            <Button onClick={this.next}>Next</Button>
          </div>
          <Carousel
            className="dw-carousel-div"
            arrows={true}
            ref={(node) => (this.carousel = node)}
          >
            <h1> Hazard: {hazardLoaded.hazardName}</h1>
            <div>
              <h1>Causes</h1>
              <div className="dw-subcol">
                <div className="dw-left-subcol">
                  <Title level={3}>Suggestions</Title>
                  {hazardLoaded.causes.map((cause) => {
                    if (cause.visible) {
                      return <div>{cause.name}</div>;
                    }
                  })}
                </div>
                <div className="dw-right-subcol">User Feedback</div>
              </div>
            </div>
            <div>
              <h1>Consequences</h1>
              <div className="dw-subcol">
                <div className="dw-left-subcol">
                  <Title level={3}> Suggestions</Title>
                  {hazardLoaded.consequences.map(
                    (consequence, consequenceIndex) => {
                      if (consequence.visible) {
                        return (
                          <div className="item-ii">{consequence.name}</div>
                        );
                      }
                    }
                  )}
                </div>
                <div className="dw-right-subcol">User Feedback</div>
              </div>
            </div>
            <div>
              <h1>Preventative Safeguards</h1>
              <div className="dw-subcol">
                <div className="dw-left-subcol">
                  <Title level={3}> Suggestions</Title>
                  {hazardLoaded.preventativeSafeguards.map((pSafeguard) => {
                    if (pSafeguard.visible) {
                      return <div>{pSafeguard.name}</div>;
                    }
                  })}
                </div>
                <div className="dw-right-subcol">User Feedback</div>
              </div>
            </div>
            <div>
              <h1>Mitigating Safeguards</h1>
              <div className="dw-subcol">
                <div className="dw-left-subcol">
                  <Title level={3}> Suggestions</Title>
                  {hazardLoaded.mitigatingSafeguards.map((mSafeguard) => {
                    if (mSafeguard.visible) {
                      return <div>{mSafeguard.name}</div>;
                    }
                  })}
                </div>
                <div className="dw-right-subcol">User Feedback</div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
}
