import React, { useState, useEffect } from "react";
import {DeepClone} from '@/utils/tool'
import style from "./device.less";
import convertData, { strToNum, strToRowNum } from "./channelUtil";
import http from "@/utils/http";
import intl from 'react-intl-universal';

function Channel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    http.get("/devices/MSDtest_free/items/operator").then(value => {setData(convertData(value.items));});
  }, []);

  const cloneObj = DeepClone(data)

  function addRowItem(item, e) {
    if (cloneObj[item] === "isEmpty") {
      cloneObj[item] = { [`${item}1`]: "isEmpty" };
      setData(cloneObj);
    } else {
      const lastRowStr = Object.keys(data[item])
        .sort()
        .pop();
      const needAddStr = `${lastRowStr[0]}${Number(lastRowStr[1]) + 1}`;
      cloneObj[item][needAddStr] = "isEmpty";
      setData(cloneObj);
    }
  }
  function deleteRowItem(item, e) {
    const lastRowStr = Object.keys(cloneObj[item]).sort().pop();
    delete cloneObj[item][lastRowStr];
    setData(cloneObj);
  }
  function addRow() {
    const mapObj = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7 };
    const mapArr = ["A", "B", "C", "D", "E", "F", "G"];
    const lastRowStr = Object.keys(cloneObj)
      .sort()
      .pop();
    const needAddRow = mapArr[mapObj[lastRowStr]];
    cloneObj[needAddRow] = "isEmpty";
    setData(cloneObj);
  }
  function deleteRow(){
    const lastRow = Object.keys(cloneObj).sort().pop();
    delete cloneObj[lastRow]
    setData(cloneObj)
  }

  function NormalEle({item,subItem}){
    return(
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
    )
  }

  if (!data) {
    return null;
  }
 
  return (
    <div className={style.chanelWrapper}>
      <h1>channel</h1>
      <h2>测试intl  {intl.get('HELLO', { name:'lily',where:'tokyo' })}</h2>
      <div className={style.tableWrap}>
        <div className={style.tableHeader}>
          <div className="tableTitle">柜1</div>
        </div>
        <div className={style.tableBody}>
          {Object.keys(data)
            .sort()
            .map(item => (
              <div key={item} className={style.row}>
                <div className="rowTitle">层{strToNum(item)}</div>
                {data[item] === "isEmpty" && <h2>没有商品</h2>}
                {data[item] !== "isEmpty" &&
                  Object.keys(data[item])
                    .sort()
                    .map(subItem => (
                      <div key={subItem} className="rowItem">
                        {data[item][subItem] === "isEmpty" ? (
                          <div className="noShop">
                            <div className="btn">上架商品</div>
                            <span className="rowNum">{strToRowNum(subItem)}</span>
                          </div>
                        ) : (
                        <NormalEle item={item} subItem={subItem} />
                        )}
                      </div>
                    ))}
                <div className="rowLastBtn">
                  <div className="btn" onClick={e => addRowItem(item, e)}>
                    添加货道
                  </div>
                  <div className="btn" onClick={e => deleteRowItem(item, e)}>
                    删除最后一个货道
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={style.tableBottom}>
          <div className="btn" onClick={addRow}>
            新增层数
          </div>
          <div className="btn" onClick={deleteRow}>删除最后一层</div>
        </div>
      </div>
    </div>
  );
}

export default Channel;
