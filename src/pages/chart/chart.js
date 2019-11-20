import React,{useEffect,useState} from "react";
import { useHistory } from "react-router-dom";
import { Chart, Geom, Axis, Tooltip, Coord, Label, G2, Guide, Util, Facet, Shape, View } from "bizcharts";
import http from '@/http/http'

import style from "./chart.less";

function ChartDemo() {
  let history = useHistory();

  const data = [
    {
      year: "1991",
      value: 3
    },
    {
      year: "1992",
      value: 4
    },
    {
      year: "1993",
      value: 3.5
    },
    {
      year: "1994",
      value: 5
    },
    {
      year: "1995",
      value: 4.9
    },
    {
      year: "1996",
      value: 6
    },
    {
      year: "1997",
      value: 7
    },
    {
      year: "1998",
      value: 9
    },
    {
      year: "1999",
      value: 13
    }
  ];
  const cols = {
    order_finish_count: {
      min: 0
    },
    moment: {
      range: [0, 1]
    }
  };

  const [chartData, setChartData] = useState(null)
  useEffect(() => {
   async function getData(){
     const data=await http.get('sales/?util=d&start=2019-11-01&end=2019-11-19') 
     setChartData(data.res)
  }
  getData()
  }, [])


  return (
    <div className={style.chartWrapper}>
      <div className={style.header}>
        <h2>我是chart组件</h2>
        <button className="custom-btn" onClick={() => history.push("/home")}>
          回主页
        </button>
      </div>
      <div className={style.content}>
        <Chart height={400} data={chartData} scale={cols}>
          <Axis name="moment" />
          <Axis name="order_finish_count" position='right'/>
          <Axis name="total_money" />
          <Tooltip crosshairs={{ type: "y" }} />
          <Geom type="line" position="moment*order_finish_count" size={2} />
          <Geom type="point" position="moment*order_finish_count" size={4} shape={"circle"} style={{ stroke: "#fff", lineWidth: 1 }} />
          {/* <View data={filterData}> */}
          {/* <Geom
            type="intervalStack"
            position="moment*月均降雨量"
            color={"name"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
          </View> */}
        </Chart>
      </div>
    </div>
  );
}

export default ChartDemo;
