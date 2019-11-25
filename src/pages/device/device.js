import React from "react";
import { Breadcrumb, Tabs } from "antd";
import { Link, useLocation,Route,useRouteMatch,useHistory } from "react-router-dom";
import style from "./device.less";
import CustomTab from '@/component/customTab/customTab.js'

const TabPane = Tabs.TabPane;

function Device() {
  const location = useLocation();
  const history=useHistory()
  const {path}=useRouteMatch()
  const { pathname } = location;

  const breadcrumbNameMap = {
    '/device':'home',
    "/device/a": "aaa",
    "/device/a/a": "aaa33333",
    "/device/b": "bbb",
    "/device/c": "ccc",
  };
  const pathSnippets = pathname.split("/").filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="operator">
      <Link to="/operator">设备管理</Link>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key="operator">
      <Link to="/operator">机台列表</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  const tabList=[
    {text:'aaa',path:'/device/a'},
    {text:'bbb',path:'/device/b'},
    {text:'ccc',path:'/device/c'},
  ]

  return (
    <div className={style.deviceWrapper}>
      <div className={style.breadcrumb}>
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>
      <div className={style.container}>

      <CustomTab list={tabList}>
      <Route exact path={`${path}/a`}>
            <h1>aaaa</h1>
            <Link to='/device/a/a'>
            <button className='custom-btn'>去往aaa</button>
            </Link>
          </Route>
          <Route exact path={`${path}/b`}>
            <h1>bbbb</h1>
          </Route>
          <Route exact path={`${path}/c`}>
            <h1>cccc</h1>
            
          </Route>
      </CustomTab>
        
  
        
      </div>
    </div>
  );
}

export default Device;
