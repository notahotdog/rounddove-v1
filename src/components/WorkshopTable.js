import React, { Component } from "react";
import { Table, Tag, Space } from "antd";
import Column from "antd/lib/table/Column";
import axios from "axios";
import ColumnGroup from "antd/lib/table/ColumnGroup";

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
  }

  //Todo - Place in a higher level component than drill to this component
  componentDidMount() {
    console.log("Workshop Table Instance");
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
  deleteWorkshop() {}

  render() {
    let columns = [
      {
        title: "Workshop Name",
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
            <a>Edit {workshop.name}</a>
            <a onClick={() => console.log("Workshop Name", workshop._id)}>
              Delete
            </a>
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
