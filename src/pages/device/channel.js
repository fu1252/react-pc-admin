import React,{useState,useEffect} from 'react'
import style from './device.less'
import convertData from './dataUtil'
import http from '@/utils/http'

function Channel(){

  const [data, setData] = useState(null)
  console.log("TCL: Channel -> data", data)

  useEffect(() => {
    http.get('/devices/MSDtest_free/items/operator').then(value=>setData(value.items))
  }, [])

  if(data){
    console.log(convertData(data));
  }
  return(
    <div>
      <h1>channel</h1>
    </div>
  )
}

export default Channel