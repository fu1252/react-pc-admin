import React from 'react'
import { Link,useLocation } from "react-router-dom";
import {Breadcrumb} from 'antd'

function BreadcrumbEle(){
  const location = useLocation();
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

  return(
    <Breadcrumb>{breadcrumbItems}</Breadcrumb>
  )
}

export default BreadcrumbEle