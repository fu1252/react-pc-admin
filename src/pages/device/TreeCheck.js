import React,{useState} from 'react'
import {Tree} from 'antd'
import classnames from 'classnames'
import authTreeData from '@/permission/authTreeData'
import examAuth,{saveUserAuth} from '@/permission/authTool'
// import style from './device.less' 

function TreeCheck(){

 const [checkList, setCheckList] = useState([])

  function onCheck(checkedKeys){
    setCheckList(checkedKeys)
    saveUserAuth(checkedKeys)
  };
  

  const defaultCheckList=[]
  
  
  return(
    <div>
      <h1>treecheck</h1>
      <ul>
         <li className={classnames({authHide:examAuth('o-d-r',checkList)})}>测试查看</li>
        <li className={classnames({authHide:examAuth('o-d-c',checkList)})}>测试克隆机台</li>
        <li className={classnames({authHide:examAuth('o-d-s-s',checkList)})}>测试商品售卖</li>
        <ul style={{padding:'10px 20px'}}>
          <li className={classnames({authHide:examAuth('o-d-s-s-r',checkList)})}>测试查看</li>
          <li className={classnames({authHide:examAuth('o-d-s-s-e',checkList)})}>测试编辑</li>
        </ul>
      </ul>
      <Tree
        checkable
        defaultExpandedKeys={['operation']}
        onCheck={onCheck}
        treeData={authTreeData}
        defaultCheckedKeys={defaultCheckList}
      >
      </Tree>
    </div>
  )
}

export default TreeCheck