import React, { Component } from "react";
import { Table, Tag, Space, Popconfirm, message } from "antd";
import axios from "axios";
import { CloudFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";

var de = false;

export default class WorkshopTable extends Component {
  //Data needs to be passed down from parents

  data = [
    {
      _id: "",
      workshopName: "",
      components: [],
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

  confirmWorkshopDeletion = (workshop) => {
    console.log("Deletion Confirmed");
    const workshopName = workshop.workshopName;
    message.success(workshopName + " Workshop Deleted");
    // console.log("Workshop Name", workshop._id);
    this.deleteWorkshop(workshop._id);
  };

  cancelWorkshopDeletion(e) {
    console.log(e);
    // message.error("Click on No");
  }

  editWorkshop(e) {
    // e.preventDefault();
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

    // return <Link to="/">Page</Link>;
  }

  printComponents(x) {
    x.map((item) => console.log(item));
    // console.log("Hazard Data to be printed: ", x);
    // return <p> {x}</p>;
  }

  render() {
    let columns = [
      {
        title: "Workshop name",
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
            expandedRowRender: (record) =>
              record.components.map((x) => <p>{x.componentName}</p>),
          }}
        />
      </div>
    );
  }
}
