import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import {
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckSquareFilled,
} from "@ant-design/icons";
import { EditableFormRow, EditableCell } from "./TableSubcomponents/editable";

export default class UploadDataPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cols: [],
      rows: [],

      errorMessage: null,
      columns: [
        {
          title: "HAZARD",
          dataIndex: "hazard",
          editable: true,
        },
        { title: "CAUSE", dataIndex: "cause", editable: true },
        { title: "CONSEQUENCE", dataIndex: "consequence", editable: true },
        {
          title: "PREVENTATIVE SAFEGUARDS",
          dataIndex: "preventativeSafeguards",
          editable: true,
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) =>
            this.state.rows.length >= 1 ? (
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={{ color: "red", fontSize: "20px" }}
              >
                <DeleteOutlined
                  type="delete"
                  theme="filled"
                  style={{ color: "red", fontSize: "20px" }}
                />
              </Popconfirm>
            ) : null,
        },
      ],
    };
  }

  //Handle Save when editing file
  handleSave = (row) => {
    const newData = [...this.state.rows]; //Copies the previous stateData
    const index = newData.findIndex((item) => row.key === item.key); // Find the index of this row corresponding to the actual row
    const item = newData[index];

    //Replaces the contents of the row
    //Delete one element from the array[index] and replace with an obj({iterm, row})
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ rows: newData });
  };

  //Handles file processing
  fileHandler = (fileList) => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({ errorMessage: "No file uploaded" });
      return false;
    }

    console.log("fileObj.type", fileObj.type);
    if (
      !(
        fileObj.type == "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!",
      });
      return false;
    }

    //Renders Excel File
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row != "undefined") {
            newRows.push({
              key: index,
              hazard: row[0],
              cause: row[1],
              consequence: row[2],
              preventativeSafeguards: row[3],
              mitigatingSafeguards: row[4],
            });

            if (newRows.length === 0) {
              this.setState({ errorMessage: "No data found in file!" });
              return false;
            } else {
              this.setState({
                cols: resp.cols,
                rows: newRows,
                errorMessage: null,
              });
            }
          }
        });
      }
    });
    return false;
  };

  //Send to server
  handleSubmit = async () => {
    console.log("submitting", this.state.rows);
    //Submit to API
  };

  //Delete Rows
  handleDelete = (key) => {
    const rows = [...this.state.rows];
    this.setState({ rows: rows.filter((item) => item.key !== key) });
  };

  //Add rows
  handleAdd = () => {
    const { count, rows } = this.state;

    const newData = {
      key: count,
      hazard: "Thermal Runway",
      cause: "Battery Overcharge",
      consequence: "Battery Internal Short Circuit",
      preventativeSafeguards: "BMS as primary safeguard",
      mitigatingSafeguards: "Gas based fire fighting system",
    };

    this.setState({ rows: [newData, ...rows], count: count + 1 });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.state.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          //when youre at a particular cell, but what exactly does it do?
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div>
        <h1>Import Hazard Data</h1>
        <Row gutter={16} justify="space-between">
          {/* <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="page-title">Upload Data</div>
            </div>
          </Col> */}
          <Col
            span={8}
            align="right"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {this.state.rows.length > 0 && (
              <>
                <Button
                  onClick={this.handleAdd}
                  size="large"
                  type="info"
                  style={{ marginBottom: 16 }}
                >
                  <PlusOutlined type="plus" />
                  Add a row
                </Button>
                <Button
                  onClick={this.handleSubmit}
                  size="large"
                  type="primary"
                  style={{
                    marginBottom: 16,
                    marginLeft: 10,
                  }}
                >
                  Submit Data
                </Button>
              </>
            )}
          </Col>
        </Row>

        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
          >
            <Button>
              <UploadOutlined type="upload" /> Click to Upload
            </Button>
          </Upload>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table
            components={components}
            rowClassName={() => "editable"}
            dataSource={this.state.rows}
            columns={columns}
          />
        </div>
      </div>
    );
    // return <div> {this.props.location.state.name}Upload Page Data</div>;
  }
}
