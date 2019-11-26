import React, { useState } from "react";
import style from "./home.less";
import classnames from "classnames";
import ReactSVG from "react-svg";
import { Icon, Tooltip, Popover } from "antd";
import { useStoreState } from "easy-peasy";
import { useHistory, useLocation } from "react-router-dom";

function SubNav() {
  let history = useHistory();
  const location = useLocation();
  const isOpenSidebar = useStoreState(state => state.layout.isOpenSidebar);
  const [currentClickNav, setCurrentClickNav] = useState({});
  const baseNavList = [
    { text: "图表展示", roles: ["user", "admin"], icon: "saleTab", path: "/chart" },
    { text: "设备管理", roles: ["user", "admin"], icon: "machine", path: "/operator" },
    { text: "订单管理", roles: ["admin"], icon: "order", path: "/device" },
    {
      text: "商品管理",
      roles: ["user", "admin"],
      icon: "shop",
      key: "shop",
      children: [
        { text: "地方", roles: ["user", "admin"], icon: "order", path: "/abc" },
        { text: "哈佛", roles: ["admin"], icon: "account", path: "/bbc" }
      ]
    },
    { text: "账目管理", roles: ["admin"], icon: "account", path: "/account" },
    {
      text: "会员管理",
      roles: ["user", "admin"],
      icon: "member",
      key: "member",
      children: [
        { text: "礼物", roles: ["admin"], icon: "order", path: "/gift" },
        {
          text: "打折",
          roles: ["user", "admin"],
          icon: "account",
          key: "subAccount",
          children: [
            { text: "家里的", roles: ["user", "admin"], icon: "order", path: "/tttt" },
            {
              text: "电风扇",
              roles: ["admin"],
              icon: "account",
              path: "/ggg",
              key: "subsub",
              children: [{ text: "大幅度", roles: ["admin"], icon: "order", path: "/445" }]
            }
          ]
        }
      ]
    }
  ];

  // 过滤有权限的路由
  const role = "admin";
  const cloneData = JSON.parse(JSON.stringify(baseNavList));
  function filterData(data) {
    for (let index = 0; index < data.length; index++) {
      const ele = data[index];
      if (!ele.roles.includes(role)) {
        data.splice(index, 1);
        index--;
      } else if (ele.children) {
        filterData(ele.children);
      }
    }
  }
  filterData(cloneData);
  const navList = cloneData;

  // 菜单项点击后
  function onListClick(item) {
    if (item.children) {
      setCurrentClickNav({ ...currentClickNav, [item.key]: !currentClickNav[item.key] });
    } else {
      history.push(item.path);
    }
  }

  // 折叠下hover的菜单项
  function popEle(data) {
    return data.map(item => (
      <div key={item.text}>
        {!item.children && (
          <li
            className={classnames({ popItem: true, popActive: location.pathname.startsWith(item.path) })}
            onClick={() => onListClick(item)}
          >
            {item.text}
          </li>
        )}
        {/* 显示子菜单 */}
        {item.children && (
          <Popover content={popEle(item.children)} placement="right" overlayClassName="subNavPop">
            <li
              className={classnames({ popItem: true, popActive: location.pathname.startsWith(item.path) })}
              onClick={() => onListClick(item)}
            >
              {item.text}
            </li>
          </Popover>
        )}
      </div>
    ));
  }

  // 侧边栏菜单
  function listEle(data) {
    return data.map(item => (
      <div key={item.text}>
        {/* 各菜单项 */}
        <li onClick={() => onListClick(item)}>
          <div className={classnames({ listItem: true, navActive: location.pathname.startsWith(item.path) })}>
            {/* 折叠显示图标 */}
            {isOpenSidebar && <ReactSVG className="inlineSVG" src={require(`@/assets/${item.icon}.svg`)} />}
            {/* 折叠有子菜单显示pop */}
            {!isOpenSidebar && item.children && (
              <Popover content={popEle(item.children)}  placement="right" overlayClassName="navPop">
                <ReactSVG className="inlineSVG" src={require(`@/assets/${item.icon}.svg`)} />
              </Popover>
            )}
            {/* 折叠没子菜单显示tip */}
            {!isOpenSidebar && !item.children && (
              <Tooltip title={item.text} placement="right" overlayClassName="navTooltip">
                <ReactSVG className="inlineSVG" src={require(`@/assets/${item.icon}.svg`)} />
              </Tooltip>
            )}
            {/* 非折叠显示文本 */}
            {isOpenSidebar && <span className="text">{item.text}</span>}
            {/* 折叠菜单icon */}
            {item.children && isOpenSidebar && (
              <ReactSVG
                className={classnames({ inlineSVG: true, "icon-open": currentClickNav[item.key] })}
                src={require("@/assets/right.svg")}
              />
            )}
          </div>
        </li>
        {/* 递归嵌套菜单 */}
        {item.children && isOpenSidebar && (
          <div
            className={classnames({
              subMenu: true,
              "subList-hidden": !currentClickNav[item.key]
            })}
          >
            {listEle(item.children)}
          </div>
        )}
      </div>
    ));
  }

  return (
    <div className={classnames({ [style.sidebarList]: true, [style.closeSidebar]: !isOpenSidebar })}>
      {/* 头部logo */}
      <div className="header-logo" onClick={() => history.push("/home")}>
        <Icon type="github" />
        {isOpenSidebar && <span className="text">管理系统</span>}
      </div>
      {/* menu项 */}
      <ul className="listWrap">{listEle(navList)}</ul>
    </div>
  );
}

export default SubNav;
