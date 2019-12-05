import React, { useState } from "react";
import style from "./home.less";
import classnames from "classnames";
import ReactSVG from "react-svg";
import { Icon, Tooltip, Popover } from "antd";
import { useStoreState } from "easy-peasy";
import {getUserSubNavAuth} from '@/permission/authTool'
import {DeepClone} from '@/utils/tool'
import { useHistory, useLocation } from "react-router-dom";

function SubNav() {
  let history = useHistory();
  const location = useLocation();
  const navAuth=getUserSubNavAuth()
  const isOpenSidebar = useStoreState(state => state.layout.isOpenSidebar);
  const [currentClickNav, setCurrentClickNav] = useState({});

  const baseNavList = [
    { text: "图表展示", roles:'account', icon: "saleTab", path: "/chart" },
    { text: "设备管理", roles: 'operation', icon: "machine", path: "/operator" },
    { text: "订单管理", roles: 'order', icon: "order", path: "/device" },
    {
      text: "商品管理",
      roles: 'shop',
      icon: "shop",
      key: "shop",
      children: [
        { text: "管理员页面", roles:'shop', icon: "order", path: "/admin" },
        { text: "哈佛", roles: 'shop', icon: "account", path: "/bbc" }
      ]
    },
    { text: "富文本编辑器", roles: 'role', icon: "account", path: "/editor" },
    {
      text: "会员管理",
      roles: 'userMember',
      icon: "member",
      key: "member",
      children: [
        { text: "礼物", roles: 'userMember', icon: "order", path: "/gift" },
        {
          text: "打折",
          roles: 'userMember',
          icon: "account",
          key: "subAccount",
          children: [
            { text: "家里的", roles:'userMember', icon: "order", path: "/tttt" },
            {
              text: "电风扇",
              roles: 'userMember',
              icon: "account",
              path: "/ggg",
              key: "subsub",
              children: [{ text: "大幅度", roles:'userMember', icon: "order", path: "/445" }]
            }
          ]
        }
      ]
    }
  ];

  // 过滤有权限的路由
  const cloneData = DeepClone(baseNavList)
  function filterData(data) {
    for (let index = 0; index < data.length; index++) {
      const ele = data[index];
      // if (!ele.roles.includes(role)) {
      if (!navAuth.includes(ele.roles)) {
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
            {isOpenSidebar &&item.icon&& <ReactSVG className="inlineSVG" src={require(`@/assets/svg/${item.icon}.svg`)} />}
            {/* 折叠有子菜单显示pop */}
            {!isOpenSidebar && item.children && (
              <Popover content={popEle(item.children)}  placement="right" overlayClassName="navPop">
                <ReactSVG className="inlineSVG" src={require(`@/assets/svg/${item.icon}.svg`)} />
              </Popover>
            )}
            {/* 折叠没子菜单显示tip */}
            {!isOpenSidebar && !item.children && (
              <Tooltip title={item.text} placement="right" overlayClassName="navTooltip">
                <ReactSVG className="inlineSVG" src={require(`@/assets/svg/${item.icon}.svg`)} />
              </Tooltip>
            )}
            {/* 非折叠显示文本 */}
            {isOpenSidebar && <span className="text">{item.text}</span>}
            {/* 折叠菜单icon */}
            {item.children && isOpenSidebar && (
              <ReactSVG
                className={classnames({ inlineSVG: true, "icon-open": currentClickNav[item.key] })}
                src={require("@/assets/svg/right.svg")}
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
