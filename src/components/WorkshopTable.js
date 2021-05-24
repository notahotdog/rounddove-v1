import React, { Component } from "react";
import { Table, Tag, Space, Popconfirm, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

export default class WorkshopTable extends Component {
  //Data Needs to Be Passed from the parents
  data = [
    { key: "1", name: "Battery Workshop", tags: ["completed"] },
    { key: "2", name: "Hazid Workshop", tags: ["pending"] },
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
    console.log("Workshop Table Instance");

    //Comment out when not needed
    axios.get("http://localhost:5000/workshop/").then((response) => {
      console.log(response.data);
      this.setState({ data: response.data });
    });

    // this.timer = setInterval(() => this.loadData(), 500);
  }

  //Periodically fetches from backend
  loadData() {
    axios.get("http://localhost:5000/workshop/").then((response) => {
      console.log(response.data);
      this.setState({ data: response.data });
    });
  }

  //Delete Functionality
  deleteWorkshop(workshopID) {
    axios
      .delete("http://localhost:5000/workshop/" + workshopID)
      .then((response) => {
        console.log(response.data);
      });
  }

  confirmWorkshopDeletion = (workshop) => {
    console.log("Deletion Confirmed");
    const workshopName = workshop.name;
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

    // return <Link to="/">Page</Link>;
  }

  render() {
    let columns = [
      {
        title: "Workshop name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
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
            <a onClick={this.editWorkshop}>
              {/* <Link to="/WorkshopCreationPage/EditWorkshop" props={workshop}> */}
              Edit {workshop.name}
              {/* </Link> */}
            </a>
            {/* <a onClick={() => this.editWorkshop}>Edit {workshop.name}</a> */}
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => this.confirmWorkshopDeletion(workshop)}
              onCancel={this.cancelWorkshopDeletion}
              okText="Yes"
              cancelText="No"
            >
              <a>Delete</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return (
      <div>
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}
