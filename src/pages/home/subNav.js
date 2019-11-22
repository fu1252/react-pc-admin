import React from "react";
import { Menu, Icon } from "antd";
import { useHistory } from "react-router-dom";
const SubMenu = Menu.SubMenu;

function SubNav() {
  let history = useHistory();

  const menuList = [
    { path: "operator", icon: "user", text: "设备管理" },
    { path: "shop", icon: "upload", text: "商品管理" },
    { path: "order", icon: "video-camera", text: "订单管理" },
    { path: "mall", icon: "appstore", text: "商城管理" },
    {
      path: "sell",
      icon: "mail",
      text: "营销管理",
      children: [
        { path: "gift",icon: "user", text: "礼品管理" },
        { path: "data",icon: "user", text: "终端数据管理" },
        { path: "partner",icon: "user", text: "会员促销" },
        { path: "online",icon: "user", text: "线上抽奖活动" }
      ]
    },
    {
      path: "test",
      icon: "user",
      text: "测试",
      children: [
        { path: "test1", icon: "user", text: "测试1" },
        {
          path: "test2",
          icon: "user",
          text: "测试2",
          children: [
            { path: "test3", icon: "user", text: "测试3" },
            { path: "test4", icon: "user", text: "测试4" }
          ]
        }
      ]
    }
  ];

  function createEle() {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.path}>
            <Icon type={item.icon} />
            <span>{item.text}</span>
          </Menu.Item>
        );
      }else{
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.text}</span>
              </span>
            }
          >
              {item.children.map(subitem => createSubEle(subitem))}
           
          </SubMenu>
        );
      }
    });
  }

  function createSubEle(subitem){
    if(subitem.children){
      return  <SubMenu
      key={subitem.path}
      title={
        <span>
          <Icon type={subitem.icon} />
          <span>{subitem.text}</span>
        </span>
      }
    >
        {subitem.children.map(subitem2 =><Menu.Item key={subitem2.path}>
      <Icon type={subitem2.icon} />
      <span>{subitem2.text}</span>
    </Menu.Item>)}
    </SubMenu>
    }else{
      return <Menu.Item key={subitem.path}>
      <Icon type={subitem.icon} />
      <span>{subitem.text}</span>
    </Menu.Item>
    }
  }


  return (
    <Menu theme="dark" mode="inline" onSelect={({ key }) => history.push(`/${key}`)}>
      <Menu.Item key="home">
        <Icon type="github" />
        <span className="logo-text">赛耀管理系统</span>
      </Menu.Item>
      {createEle()}
    </Menu>
  );
}

export default SubNav;
