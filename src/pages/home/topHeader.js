import React from 'react'
import { Icon } from "antd";


function TopHeader({collapsed,setCollapsed}){
  return(
    <>
     <div className="left"> <Icon
            className="trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => setCollapsed(!collapsed)}
          /></div>
            <ul className="right">
              <li>11111</li>
              <li>11111</li>
              <li>11111</li>
            </ul>
    </>
  )
}

export default TopHeader