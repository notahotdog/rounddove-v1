import React, { Component } from "react";
import { Menu } from "antd";
import AddNodeModal from "./AddNodeModal";
import AddSubnodeModal from "./AddSubnodeModal";
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
      isSubnodeModalVisible: false,
      isNodeModalVisible: false,
      nodetoAddSubnode: {},
    };

    this.updateClickedItem = this.updateClickedItem.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();

    // this.addNode = this.addNode.bind(this);
    this.addSubNode = this.addSubNode.bind(this);
    this.addHazard = this.addHazard.bind(this);

    this.showNodeModal = this.showNodeModal.bind(this);
    this.hideNodeModal = this.hideNodeModal.bind(this);
    this.closeNodeModal = this.closeNodeModal.bind(this);

    this.showSubNodeModal = this.showSubNodeModal.bind(this);
    this.hideSubNodeModal = this.hideSubNodeModal.bind(this);
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

  showNodeModal() {
    this.setState({ isNodeModalVisible: true });
  }

  hideNodeModal() {
    this.setState({ isNodeModalVisible: false });
  }

  closeNodeModal(node) {
    //passNode to be added To Parent
    this.props.addNode(node);
    this.hideNodeModal();
  }

  /**
   * Sets template for subnode object , adds to list of subnodes in the node and replace with
   * @param {Object} node to be added to
   * @param {*} nodeIndex to be replaced within the nodes array
   */
  addSubNode(node, nodeIndex) {
    var subnodeName = node.nodeName;
    var alertMessage = "adding subnode " + subnodeName;
    alert(alertMessage); //Needs to pass in the Name of the subNode
    this.showSubNodeModal();

    //Pass the Name from the child and append to node

    //Trigger Modal - > Modal determines the Name of the
    //Should this update the entire subnode to the backend db?
  }

  showSubNodeModal() {
    this.setState({ isSubnodeModalVisible: true });
  }

  hideSubNodeModal() {
    this.setState({ isSubnodeModalVisible: false });
  }

  addHazard() {
    alert("add Hazard");
  }

  render() {
    const { data } = this.props;

    // const { hazardLoaded } = this.state;

    return (
      <div className="ew-body">
        <div className="ew-body-left-col">
          <AddNodeModal
            visible={this.state.isNodeModalVisible}
            closeModal={this.closeNodeModal}
            hideModal={this.hideNodeModal}
          />
          <AddSubnodeModal
            visible={this.state.isSubnodeModalVisible}
            hideModal={this.hideSubNodeModal}
          />
          <Menu
            onClick={this.handleClick}
            style={{ width: "100%" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item onClick={this.showNodeModal}>Add Node</Menu.Item>
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
