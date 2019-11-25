import React,{useState} from "react";
import style from "./customTab.less";
import {useHistory,useLocation} from 'react-router-dom'
import classnames from 'classnames'

function CustomTab({list,children}) {
const history=useHistory() 
const location=useLocation()
const {pathname}=location

  return (
    <div className={style.customTabWrapper}>
      <div className="custom-tab">
        {list.map(item=>(
        <div key={item.path} className={classnames({tabItem:true,active:pathname===item.path})}  onClick={(e)=>history.push(e.target.dataset.key)} data-key={item.path}>{item.text}</div>
        ))}
        <div className="line" style={{left:`${list.findIndex(item=>item.path===pathname)*100}px`}}></div>
      </div>
      <div className="tab-content">
          {children}
      </div>
    </div>
  );
}

export default CustomTab;
