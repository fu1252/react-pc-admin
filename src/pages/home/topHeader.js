import React from "react";
import { Icon, Dropdown, Menu } from "antd";
import { Link,useHistory } from "react-router-dom";
import { getSessionStorage } from "@/utils/storage";

function TopHeader({ collapsed, setCollapsed }) {
  const history=useHistory()
  const data = getSessionStorage("userInfo");
  const { nickname, name }=data?data:{nickname:null,name:null}
  const menu = (
    <Menu className='overEle'>
      <Menu.Item>
        <div>
        <Icon type='picture'/>
        <span>修改密码</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>
        <Icon type='book'/>
        <span>修改邮箱</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>
              <Icon type='mail'/>
        <span>结算核验</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={onLoginOut}>
        <Icon type='user'/>
        <span>退出</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  function onLoginOut(){
    localStorage.removeItem('userData')
    sessionStorage.removeItem('userInfo')
    history.push('/')
  }

  return (
    <>
      <div className="left">
        {" "}
        <Icon
          className="trigger"
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <ul className="right">
        <li>
          <Icon type="link" />
          支付后台
        </li>
        <li>余额￥2.33</li>
        <li>
          <Icon type="user" />
          <Dropdown overlay={menu} >
            <div>
            {`${name}(${nickname})`}<Icon type="down" />
            </div>
          </Dropdown>
        </li>
        <li>
          <Icon type="global" />
          English
        </li>
      </ul>
    </>
  );
}

export default TopHeader;
