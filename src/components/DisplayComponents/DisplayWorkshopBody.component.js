import React, { Component } from "react";
import "../../FacilitatorPage.css";
import { Menu } from "antd";
import { getUniqueNodeID } from "../../util/JSONHandler";

const { SubMenu } = Menu;

export default class DisplayWorkshopBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subnodeLoaded: this.props.data.nodes[0].nodeName, //First Subnode Loaded
    };

    this.updateClickedItem = this.updateClickedItem.bind(this);
  }

  //Set The State of the Component
  updateClickedItem(node, subnode) {
    console.log("State of Menu Item Clicked", node);
    this.props.setNodeSelected(node.nodeName, subnode.subnodeName);

    //Pass to parent component
  }

  render() {
    const { data } = this.props;
    console.log("subnodeName", this.state.subnodeLoaded);

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
                      <Menu.Item
                        key={node.nodeName
                          .concat(subnode.subnodeName)
                          .concat(subnodeIndex)} //Changing the key to something more suitable to be referenced
                        onClick={() => this.updateClickedItem(node, subnode)}
                      >
                        {subnode.subnodeName}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            })}
          </Menu>
        </div>
        <div className="dw-body-right-col">Right Col</div>
      </div>
    );
  }
}
