import React from "react";
import { useHistory, useRouteMatch, Route,Link } from "react-router-dom";
import { Tabs } from "antd";
import style from "./operator.less";
const TabPane = Tabs.TabPane;

function Operator() {
  let history = useHistory();
  let { path, url } = useRouteMatch();

  function callback(key) {
    if (key === "device") {
      console.log(1111);
      history.push("/operator/device");
    }
    if (key === "deviceGroup") {
      history.push("/operator/deviceGroup");
    }
  }

  return (
    <div className={style.operatorWrapper}>
      
      <Tabs defaultActiveKey="device" onChange={callback}>
        <TabPane tab="机台列表" key="device">
          <Route exact path={`${path}/device`}>
            <h1>device</h1>
            <Link to='/device'>
            <button className='custom-btn'>去往device</button>
            </Link>
          </Route>
        </TabPane>
        <TabPane tab="场地列表" key="deviceGroup">
          <Route exact path={`${path}/deviceGroup`}>
            <h1>deviceGroup</h1>
          </Route>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Operator;
