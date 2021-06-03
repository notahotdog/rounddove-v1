import React, { Component } from "react";
import "../../FacilitatorPage.css";
import { Menu, Carousel, Button } from "antd";

const { SubMenu } = Menu;

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

  render() {
    const { data } = this.props;
    const { hazardLoaded } = this.state;
    console.log("nodeData", this.props.data.nodes[0].subnodes[0].hazards[0]);

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
          {/* Right Col */}
          <Button onClick={this.previous}>Previous</Button>
          <Button onClick={this.next}>Next</Button>
          <Carousel
            className="dw-carousel-div"
            arrows={true}
            ref={(node) => (this.carousel = node)}
          >
            <div>{hazardLoaded.hazardName}</div>
            <div>
              {hazardLoaded.causes.map((cause) => {
                return <div>{cause}</div>;
              })}
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
}
