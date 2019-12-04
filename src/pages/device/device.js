import React,{lazy,Suspense} from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation, Route, useRouteMatch } from "react-router-dom";
import PointLoading from "@/component/loading/loading";
import style from "./device.less";
import CustomTab from "@/component/customTab/customTab.js";

const Channel =lazy(()=>import('./channel.js'))
const Employee=lazy(()=>import('./employee.js'))
const TreeCheck=lazy(()=>import('./TreeCheck.js'))

function Device() {
  const location = useLocation();
  const { path } = useRouteMatch();
  const { pathname } = location;

  const breadcrumbNameMap = {
    "/device": "home",
    "/device/a": "aaa",
    "/device/a/a": "aaa33333",
    "/device/b": "bbb",
    "/device/c": "ccc"
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

  const tabList = [
    { text: "aaa", path: "/device/a" },
    { text: "bbb", path: "/device/b" },
    { text: "ccc", path: "/device/c" }
  ];

  return (
    <div className={style.deviceWrapper}>
      <div className={style.breadcrumb}>
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>
      <div className={style.container}>
        <CustomTab list={tabList}>
        <Suspense fallback={<PointLoading />}>
          <Route exact path={`${path}/a`}>
           <Channel/>
          </Route>
          <Route exact path={`${path}/b`}>
            <Employee/>
          </Route>
          <Route exact path={`${path}/c`}>
            <TreeCheck/>
          </Route>
        </Suspense>
        </CustomTab>
      </div>
    </div>
  );
}

export default Device;
