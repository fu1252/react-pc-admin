import React from "react";
import { Route, Link } from "react-router-dom";
import style from "./operator.less";
import CustomTab from "@/component/customTab/customTab.js";

function Operator() {
  const tabList = [
    { text: "机台列表", path: "/operator/device" },
    { text: "场地列表", path: "/operator/deviceGroup" },
    { text: "test", path: "/operator/ddd/444" }
  ];

  return (
    <div className={style.operatorWrapper}>
      <CustomTab list={tabList}>
        <Route exact path={"/operator/device"}>
          <h1>device</h1>
          <Link to="/device">
            <button className="custom-btn">去往device</button>
          </Link>
        </Route>
        <Route exact path={"/operator/deviceGroup"}>
          <h1>deviceGroup</h1>
        </Route>
        <Route path={"/operator/ddd"}>
          <h1>999999</h1>
        </Route>
      </CustomTab>
    </div>
  );
}

export default Operator;
