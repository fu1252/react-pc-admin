import React from "react";
import { Icon, Dropdown, Menu } from "antd";
import { useHistory } from "react-router-dom";

function DropdownEle({userInfo}) {
  const history = useHistory();

  const menu = (
    <Menu className="overEle">
      <Menu.Item>
        <div>
          <Icon type="picture" />
          <span>修改密码</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>
          <Icon type="book" />
          <span>修改邮箱</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>
          <Icon type="mail" />
          <span>结算核验</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={onLoginOut}>
          <Icon type="user" />
          <span>退出</span>
        </div>
      </Menu.Item>
    </Menu>
  );

   // 退出登录
   function onLoginOut() {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userInfo");
    history.push("/");
  }

  return (
    <Dropdown overlay={menu}>
      <div>
        {`${userInfo.name}(${userInfo.nickname})`}
        <Icon type="down" />
      </div>
    </Dropdown>
  );
}

export default DropdownEle