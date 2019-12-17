import React from 'react'
import { strToRowNum } from "./channelUtil";

function SubEle({ item,data, subItem }) {
  return (
    <>
      <div className="top">
        <div className="img">
          <img src={data[item][subItem].img} alt="" />
          <span className="brief">{data[item][subItem].brief}</span>
        </div>
        <span className="rowNum">{strToRowNum(subItem)}</span>
      </div>
      <div className="bottom">
        <div className="saleMoney">
          <div className="sale">售价￥:{data[item][subItem].price}</div>
          <div className="store">库存{data[item][subItem].stock}</div>
        </div>
        <div className="btnS">
          <div className="btn">编辑</div>
          <div className="btn">下架</div>
          <div className="btn">更多</div>
        </div>
      </div>
    </>
  );
}

export default SubEle