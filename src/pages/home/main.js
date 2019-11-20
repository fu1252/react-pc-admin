import React from 'react'
import { useHistory,} from "react-router-dom";


function Main(){
  let history=useHistory()

  return (
   <div>
          <h2>我是home组件</h2>
          <button className='custom-btn' onClick={()=>history.push('/chart')}>去图表页面</button>
          <button className='custom-btn' onClick={()=>history.push('/login')}>登录</button>
          <button className='custom-btn' onClick={()=>history.push('/about')}>去about</button>
   </div>
  )
}

export default Main