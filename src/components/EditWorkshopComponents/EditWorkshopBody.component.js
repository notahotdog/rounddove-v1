import React, { Component } from "react";
import { Menu } from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
const { SubMenu, Carousel, Button } = Menu;

export default class EditWorkshopBody extends Component {
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

    this.addNode = this.addNode.bind(this);
    this.addSubNode = this.addSubNode.bind(this);
    this.addHazard = this.addHazard.bind(this);
  }

  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }

  updateClickedItem(node, subnode, hazard) {
    console.log("State of Menu Item Clicked Hazard", hazard);
    this.props.setNodeSelected(
      node.nodeName,
      subnode.subnodeName,
      hazard.hazardName
    );

    this.setState({ hazardLoaded: hazard });
  }

  //AddNode

  addNode() {
    alert("Adding Node");
  }

  addSubNode(node) {
    var subnodeName = node.nodeName;
    var alertMessage = "adding subnode " + subnodeName;
    alert(alertMessage); //Needs to pass in the Name of the subNode

    //Trigger Modal - > Modal determines the Name of the
    //Should this update the entire subnode to the backend db?
  }

  addHazard() {
    alert("add Hazard");
  }

  //AddSubnode

  render() {
    const { data } = this.props;

    // console.log("nodeData", this.props.data.nodes[0].subnodes[0].hazards[0]);
    // return <div>test {JSON.stringify(data)}</div>;

    const { hazardLoaded } = this.state;

    return (
      <div className="ew-body">
        <div className="ew-body-left-col">
          <Menu
            onClick={this.handleClick}
            style={{ width: "100%" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item onClick={this.addNode}>Add Node</Menu.Item>
            {data.nodes.map((node, nodeIndex) => {
              return (
                <SubMenu key={node.nodeName} title={node.nodeName}>
                  <Menu.Item onClick={() => this.addSubNode(node)}>
                    Add SubNode
                  </Menu.Item>

                  {node.subnodes.map((subnode, subnodeIndex) => {
                    return (
                      <SubMenu
                        key={node.nodeName
                          .concat(subnode.subnodeName)
                          .concat(subnodeIndex)}
                        title={subnode.subnodeName}
                      >
                        <Menu.Item> Add Hazard</Menu.Item>
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
        <div className="ew-body-right-col">Right Col</div>
      </div>
    );

    // return (
    //   <div className="dw-body">
    //     <div className="dw-body-left-col">
    //       <Menu
    //         // onClick={this.handleClick}
    //         style={{ width: "100%" }}
    //         defaultSelectedKeys={["1"]}
    //         defaultOpenKeys={["sub1"]}
    //         mode="inline"
    //         theme="dark"
    //       >
    //         {data.nodes.map((node) => {
    //           return (
    //             <SubMenu key={node.nodeName} title={node.nodeName}>
    //               {node.subnodes.map((subnode, subnodeIndex) => {
    //                 return (
    //                   <SubMenu
    //                     key={node.nodeName
    //                       .concat(subnode.subnodeName)
    //                       .concat(subnodeIndex)}
    //                     title={subnode.subnodeName}
    //                   >
    //                     {subnode.hazards.map((hazard, hazardIndex) => {
    //                       return (
    //                         <Menu.Item
    //                           key={node.nodeName
    //                             .concat(subnode.subnodeName)
    //                             .concat(subnodeIndex)
    //                             .concat(hazard.hazardName)
    //                             .concat(hazardIndex)}
    //                           onClick={() =>
    //                             this.updateClickedItem(node, subnode, hazard)
    //                           }
    //                         >
    //                           {hazard.hazardName}
    //                         </Menu.Item>
    //                       );
    //                     })}
    //                   </SubMenu>
    //                 );
    //               })}
    //             </SubMenu>
    //           );
    //         })}
    //       </Menu>
    //     </div>
    //     <div className="dw-body-right-col">
    //       {/* Right Col */}
    //       <div className="dw-body-right-header">
    //         <Button onClick={this.previous}>Previous</Button>
    //         <Button onClick={this.next}>Next</Button>
    //         <div> Mark as Completed</div>
    //       </div>
    //       <Carousel
    //         className="dw-carousel-div"
    //         arrows={true}
    //         ref={(node) => (this.carousel = node)}
    //       >
    //         <div>{hazardLoaded.hazardName}</div>
    //         <div>
    //           {hazardLoaded.causes.map((cause) => {
    //             return <div>{cause}</div>;
    //           })}
    //         </div>
    //       </Carousel>
    //     </div>
    //   </div>
    // );
  }
}
