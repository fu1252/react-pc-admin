import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label, G2, Guide, Util, Facet, Shape, View } from "bizcharts";
import http from "@/http/http";
import DataSet from "@antv/data-set";
import MapChart from './locationChart'
import style from "./chart.less";

function ChartDemo() {
  let history = useHistory();

  const data2 = [
    {
      name:'a',
      value:1,
      average_price: 2,
      device_average_sale: 0,
      moment: "2019-11-01",
      order_finish_count: 1,
      total_alipay_money: 0,
      total_card_money: 0,
      total_cash_money: 1,
      total_money: 2,
      total_offline_pay_money: 0,
      total_online_pay_money: 1,
      total_weixin_pay_money: 1,
    },
    {
      average_price: 0,
      device_average_sale: 0,
      moment: "2019-11-02",
      order_finish_count: 14,
      total_alipay_money: 0,
      total_card_money: 0,
      total_cash_money: 0,
      total_money: 1,
      total_offline_pay_money: 0,
      total_online_pay_money: 1,
      total_weixin_pay_money: 1
    },
    {average_price: 1,
      device_average_sale: 0,
      moment: "2019-11-14",
      order_finish_count: 5,
      total_alipay_money: 0,
      total_card_money: 0,
      total_cash_money: 0,
      total_money: 5,
      total_offline_pay_money: 0,
      total_online_pay_money: 5,
      total_weixin_pay_money: 5}
  ];
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    async function getData() {
      const data = await http.get("sales/?util=d&start=2019-11-01&end=2019-11-19");
      setChartData(data.res);
    }
    getData();
  }, []);

  
  const ds = new DataSet();
  const dv = ds.createView().source(chartData);
  dv.transform({
    type: "fold",
    fields: ['total_cash_money',"total_weixin_pay_money",'total_alipay_money','total_card_money'],
    key: "支付方式",
    value: 'value' ,
  });

  const scale = {
    'moment': {
      range: [0.05,0.95], // 输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
    },
    'value':{
       alias:'标题'
    },
    'order_finish_count':{
      alias:'地方'
    }
  };

  
  const title = {
    autoRotate:false,
    offset:60,
    textStyle: {
      fontSize: '12',
      textAlign: 'center',
      fill: '#999',
      fontWeight: 'bold',
      // rotate:360
    }, // 坐标轴文本属性配置
    position:  'end'  // 标题的位置，**新增**
  }
  console.log("TCL: ChartDemo -> dv", dv);
  const label={formatter(text, item, index) {
    return `￥${text/100}`;
  },}
  return (
    <div className={style.chartWrapper}>
      <div className={style.header}>
        <h2>我是chart组件</h2>
        <button className="custom-btn" onClick={() => history.push("/home")}>
          回主页
        </button>
      </div>
      <div className={style.content}>
        <Chart renderer='svg' height={600} width={800} data={dv} padding={120} scale={scale} >
          <Legend position='top' offsetY={-23}  />
          <Axis name="moment" />
          <Axis name="value" title={title} label={label}/>
          <Axis name="order_finish_count"  title={title}/>
          <Tooltip />
        
          <Geom
            type="intervalStack"
            position="moment*value"
            color={['支付方式',['#fda95e','#7bbd7d']]}
            style={{
              stroke: "#ddd",
              lineWidth: 1
            }}
          />
            <Geom type="line" position="moment*order_finish_count" size={2} />
          <Geom
            type="point"
            position="moment*order_finish_count"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      <MapChart/>
      </div>
    </div>
  );
}

export default ChartDemo;
