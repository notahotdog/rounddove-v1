import React, { Component } from "react";
import { Table, Tag, Space, Popconfirm, message } from "antd";
import axios from "axios";
import { CloudFilled } from "@ant-design/icons";
// import { Link } from "react-router-dom";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";

export default class WorkshopTable extends Component {
  //Data Needs to Be Passed from the parents
  // data = [
  //   { key: "1", name: "Battery Workshop", tags: ["completed"] },
  //   { key: "2", name: "Hazid Workshop", tags: ["pending"] },
  // ];
  data = [
    {
      _id: "",
      name: "",
      hazardData: [],
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
    console.log("Workshop Table Instance");

    //Comment out when not needed
    axios.get("http://localhost:5000/workshop/").then((response) => {
      console.log("fetch Data", response.data);
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

  printComponents(x) {
    x.map((item) => console.log(item));
    // console.log("Hazard Data to be printed: ", x);
    // return <p> {x}</p>;
  }

  render() {
    let columns = [
      {
        title: "Workshop name",
        dataIndex: "name",
        key: "name",
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
            <a href="#/" onClick={this.editWorkshop}>
              Edit {workshop.name}
            </a>
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

    console.log("State Data", this.state.data);
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          expandable={{
            expandedRowRender: (record) =>
              // this.printComponents(record.hazardData),
              record.hazardData.map((x) => <p>{x}</p>),

            // record.hazardData.map((x) => return <p style={{ margin: 0 }}>{x}</p>),
            // expandIcon: ({ expanded, onExpand, record }) =>
            //   expanded ? (
            //     <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
            //   ) : (
            //     <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
            //   ),
          }}
        />
      </div>
    );
  }
}

{
  /* <p style={{ margin: 0 }}>{record._id}</p> */
}
