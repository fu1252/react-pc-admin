import React from 'react'
import { formatTime } from "@/utils/tool.js";

export const columns = [
  {
    title: "用户名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "昵称",
    dataIndex: "nickname",
    key: "nickname"
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role"
  },
  {
    title: "最后登录时间",
    dataIndex: "login_at",
    key: "login_at",
    render: text => <span>{formatTime(Number(`${text}000`))}</span>
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    key: "created_at",
    render: text => <span>{formatTime(Number(`${text}000`))}</span>
  },
  {
    title: "更新时间",
    dataIndex: "updated_at",
    key: "updated_at",
    render: text => <span>{formatTime(Number(`${text}000`))}</span>
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
    render: text => <span>{text === 0 ? "正常" : "异常"}</span>
  },
  {
    title: "操作",
    dataIndex: "",
    key: "action",
    render: (text, record) => <a onClick={e => onEdit(record, e)}> 编辑</a>
  }
];


function onEdit(record, e) {
  console.log("TCL: onEdit -> record", record);
}
