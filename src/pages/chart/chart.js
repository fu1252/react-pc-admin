import React, { useEffect, useState, lazy, Suspense } from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import http from "@/utils/http";
import DataSet from "@antv/data-set";
import PointLoading from "@/component/loading/loading";
import style from "./chart.less";
import {scale,title,label} from './chartData'
const MapChart = lazy(() => import("./locationChart"));

function ChartDemo() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await http.get("sales/?util=d&start=2019-11-01&end=2019-11-19");
      setChartData(data.res);
    }
    getData();
  }, []);

  // 初始化chart
  const ds = new DataSet();
  const dv = ds.createView().source(chartData);
  dv.transform({
    type: "fold",
    fields: ["total_cash_money", "total_weixin_pay_money", "total_alipay_money", "total_card_money"],
    key: "支付方式",
    value: "value"
  });

 

  return (
    <div className={style.chartWrapper}>
      <div className={style.header}>
        <h2>我是chart组件</h2>
      </div>
      <Suspense fallback={<PointLoading />}>
        <MapChart />
      </Suspense>
      <div className={style.content}>
        <Chart renderer="svg" height={600} width={800} data={dv} padding={120} scale={scale}>
          <Legend position="top" offsetY={-23} />
          <Axis name="moment" />
          <Axis name="value" title={title} label={label} />
          <Axis name="order_finish_count" title={title} />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="moment*value"
            color={["支付方式", ["#fda95e", "#7bbd7d"]]}
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
      </div>
    </div>
  );
}

export default ChartDemo;
