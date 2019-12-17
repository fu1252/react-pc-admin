import React from "react";
import { Icon } from "antd";
import style from "./topHeader.less";
import { setLocalStorage, getLocalStorage } from "@/utils/storage";
import { useStoreState, useStoreActions } from "easy-peasy";
import DropdownEle from './dropdown'

function TopHeader() {
  const userInfo = useStoreState(state => state.user.userInfo);
  const toggleSidebar = useStoreActions(actions => actions.layout.toggleSidebar);
  const isOpenSidebar = useStoreState(state => state.layout.isOpenSidebar);
  
  const storage = getLocalStorage("lang");
  const langStorage = storage ? storage : "zh-CN";

  // 切换语言
  function onChangeLanguage() {
    const language = langStorage === "zh-CN" ? "en-US" : "zh-CN";
    setLocalStorage("lang", language);
    window.location.reload()
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
          <DropdownEle userInfo={userInfo}/>
        </li>
        <li onClick={onChangeLanguage}>
          <Icon type="global" />
          {langStorage === "zh-CN" ? "English" : "中文"}
        </li>
      </ul>
    </div>
  );
}

export default TopHeader;
