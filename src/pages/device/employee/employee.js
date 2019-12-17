/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import { Table } from "antd";
import {columns} from './employeeData'

function Employee() {
  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    http.get("workers").then(value => {
      setData(value.workers);
      setShowLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>employee</h2>
      <Table
        dataSource={data}
        loading={showLoading}
        rowKey={record => record.object_id}
        bordered
        pagination={false}
        columns={columns}
      />
    </div>
  );
}

export default Employee;
