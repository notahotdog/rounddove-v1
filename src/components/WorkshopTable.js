import React, { Component } from "react";
import { Table, Tag, Space, Popconfirm, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
// import { CloudFilled,PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";

var de = false;

export default class WorkshopTable extends Component {
  data = [
    {
      _id: "",
      workshopName: "",
      nodes: [],
      tags: [],
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      data: this.data,
    };
    this.editWorkshop = this.editWorkshop.bind(this);
  }

  //Todo - Place in a higher level component than drill to this component
  componentDidMount() {
    de && console.log("Workshop Table Instance");

    // Comment out when not needed
    axios.get("http://localhost:5000/workshop/").then((response) => {
      de && console.log("fetch Data", response.data);
      this.setState({ data: response.data });
    });

    // this.timer = setInterval(() => this.loadData(), 500);
  }

  //TODO - Pass Data From Parents Instead
  /**
   * Fetch Data from Backend
   */
  loadData() {
    axios.get("http://localhost:5000/workshop/").then((response) => {
      console.log(response.data);
      this.setState({ data: response.data });
    });
  }

  /**
   * Deletes workshop from database
   * @param {string} workshopID
   */
  deleteWorkshop(workshopID) {
    axios
      .delete("http://localhost:5000/workshop/" + workshopID)
      .then((response) => {
        console.log(response.data);
      });
  }

  /**
   * Deleted object from Backend
   * @param {Object} workshop  object to be deleted
   */
  confirmWorkshopDeletion = (workshop) => {
    console.log("Deletion Confirmed");
    const workshopName = workshop.workshopName;
    message.success(workshopName + " Workshop Deleted");
    this.deleteWorkshop(workshop._id);
  };

  cancelWorkshopDeletion(e) {
    console.log(e);
  }

  editWorkshop(e) {
    console.log("EDITING WORKSHOP");

    //Bring me to another Page with the relevant props
    <Link
      to={{
        pathname: "/WorkshopCreationPage/EditWorkshop",
        // state: { name: "testData" },
      }}
    >
      Load Backend{" "}
    </Link>;
  }

  render() {
    let columns = [
      {
        title: "Workshop Name",
        dataIndex: "workshopName",
        key: "workshopName",
        render: (text) => <a href="#/">{text}</a>,
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = "grey";
              if (tag === "completed") {
                color = "green";
              } else {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, workshop) => (
          <Space size="middle">
            <a onClick={this.editWorkshop}>Edit {workshop.workshopName}</a>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => this.confirmWorkshopDeletion(workshop)}
              onCancel={this.cancelWorkshopDeletion}
              okText="Yes"
              cancelText="No"
            >
              <a href="#/">Delete</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    de && console.log("State Data", this.state.data);
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          expandable={{
            expandedRowRender: (record, index) =>
              record.nodes.map((x) => <p key={x._id}>{x.nodeName}</p>),
          }}
          rowKey="_id"
        />
      </div>
    );
  }
}
