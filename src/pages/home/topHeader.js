import React from "react";
import { Icon, Dropdown, Menu } from "antd";
import { useHistory } from "react-router-dom";
import style from "./home.less";
import {useStoreState,useStoreActions} from 'easy-peasy'

function TopHeader() {
  const history=useHistory()
  const userInfo=useStoreState(state=>state.user.userInfo)
  const toggleSidebar=useStoreActions(actions=>actions.layout.toggleSidebar)
  const isOpenSidebar=useStoreState(state=>state.layout.isOpenSidebar)
  // 下拉框内容
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

  // 退出登录
  function onLoginOut(){
    localStorage.removeItem('userData')
    sessionStorage.removeItem('userInfo')
    history.push('/')
  }

  return (
    <div className={style.mainHeader}>
      {/* 收缩展开icon */}
      <div className="left">
        <Icon
          className="trigger"
          type={isOpenSidebar ? "menu-unfold" : "menu-fold"}
          onClick={() => toggleSidebar(!isOpenSidebar)}
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
            {`${userInfo.name}(${userInfo.nickname})`}<Icon type="down" />
            </div>
          </Dropdown>
        </li>
        <li>
          <Icon type="global" />
          English
        </li>
      </ul>
      
    </div>
  );
}

export default TopHeader;
