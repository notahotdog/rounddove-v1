import React, { Component } from "react";
import { Menu } from "antd";
import DisplayHazardsComponent from "./DisplayHazardsComponent";
import AddNodeModal from "./AddNodeModal";
import AddSubnodeModal from "./AddSubnodeModal";
import AddHazardModal from "./AddHazardWithOptionsModal";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { filterMoreThanOneInstanceHazard } from "../../util/JSONHandler";
import LoadDataPromptPage from "../DisplayComponents/LoadDataPromptPage";
const { SubMenu, Carousel, Button } = Menu;

export default class EditWorkshopBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hazardLoaded: {
        hazardName: "",
        hazardAllocated: false,
        causes: [""],
        consequences: [""],
        preventativeSafeguards: [""],
        mitigatingSafeguards: [""],
      },
      isNodeModalVisible: false,
      isSubnodeModalVisible: false,
      nodeIndexToAddSubnode: 0,
      isHazardModalVisible: false,
      subnodeIndexToAddHazard: 0,
      isHazardSelected: false,
    };

    this.setHazardSelectedTrue = this.setHazardSelectedTrue.bind(this);

    this.updateClickedItem = this.updateClickedItem.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();

    this.showNodeModal = this.showNodeModal.bind(this);
    this.hideNodeModal = this.hideNodeModal.bind(this);
    this.closeNodeModal = this.closeNodeModal.bind(this);

    this.showSubNodeModal = this.showSubNodeModal.bind(this);
    this.hideSubNodeModal = this.hideSubNodeModal.bind(this);
    this.closeSubNodeModal = this.closeSubNodeModal.bind(this); //need to bind if you want to use this.props

    this.showHazardModal = this.showHazardModal.bind(this);
    this.hideHazardModal = this.hideHazardModal.bind(this);
    this.closeHazardModal = this.closeHazardModal.bind(this);
  }

  setHazardSelectedTrue() {
    console.log("HAZARD IS SELECTED");
    this.setState({ isHazardSelected: true });
  }

  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }

  updateClickedItem(
    node,
    subnode,
    hazard,
    nodeIndex,
    subnodeIndex,
    hazardIndex
  ) {
    console.log("State of Menu Item Clicked Hazard", hazard);
    //Should Pass in the index of all the components
    this.props.setNodeSelected(
      node.nodeName,
      subnode.subnodeName,
      hazard.hazardName,
      nodeIndex,
      subnodeIndex,
      hazardIndex
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
    this.props.addNode(node);
    this.hideNodeModal();
  }

  showSubNodeModal(node, nodeIndex) {
    console.log("Node to add subnode", node); //Node is actually not needed, just used for debugging
    this.setState({ nodeIndexToAddSubnode: nodeIndex });
    this.setState({ isSubnodeModalVisible: true });
  }

  hideSubNodeModal() {
    this.setState({ isSubnodeModalVisible: false });
  }

  closeSubNodeModal(subNode) {
    this.props.addSubNode(this.state.nodeIndexToAddSubnode, subNode);
    this.setState({ isSubnodeModalVisible: false });
  }

  showHazardModal(nodeIndex, subnodeIndex) {
    this.setState({ isHazardModalVisible: true });
    this.setState({ nodeIndexToAddSubnode: nodeIndex }); //set the nodeIndex to be updated
    this.setState({ subnodeIndexToAddHazard: subnodeIndex }); //set the subnodeIndex to be updated
  }
  closeHazardModal(node) {
    const { nodeIndexToAddSubnode, subnodeIndexToAddHazard } = this.state;
    this.props.addHazard(nodeIndexToAddSubnode, subnodeIndexToAddHazard, node);
    this.setState({ isHazardModalVisible: false });
  }

  hideHazardModal() {
    this.setState({ isHazardModalVisible: false });
  }

  render() {
    const { data } = this.props;
    console.log("DATTATTAT:", data);
    // console.log("edit workshop body render");
    const { isHazardSelected } = this.state;
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
            closeModal={this.closeSubNodeModal}
          />
          <AddHazardModal
            visible={this.state.isHazardModalVisible}
            hideModal={this.hideHazardModal}
            closeModal={this.closeHazardModal}
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
                  <Menu.Item
                    onClick={() => this.showSubNodeModal(node, nodeIndex)}
                  >
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
                        <Menu.Item
                          onClick={() =>
                            this.showHazardModal(nodeIndex, subnodeIndex)
                          }
                        >
                          Add Hazard
                        </Menu.Item>
                        {subnode.hazards.map((hazard, hazardIndex) => {
                          return (
                            <Menu.Item
                              key={node.nodeName
                                .concat(subnode.subnodeName)
                                .concat(subnodeIndex)
                                .concat(hazard.hazardName)
                                .concat(hazardIndex)}
                              onClick={() => {
                                this.updateClickedItem(
                                  node,
                                  subnode,
                                  hazard,
                                  nodeIndex,
                                  subnodeIndex,
                                  hazardIndex
                                );
                                this.setHazardSelectedTrue();
                              }}
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

        <div className="ew-body-right-col">
          {isHazardSelected ? (
            <DisplayHazardsComponent
              hazardName={this.state.hazardLoaded.hazardName}
              hazardToBeEdited={this.state.hazardLoaded}
              //Need to insert the choice
            />
          ) : (
            <LoadDataPromptPage />
          )}
        </div>
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
