import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label, G2, Guide, Util, Facet, Shape, View } from "bizcharts";
import DataSet from "@antv/data-set";
import china from '@/assets/china.json'

import style from "./chart.less";

function MapChart() {

  
  console.log(111,china);

  const ds = new DataSet();
  const geoDv = ds.createView().source(china,{type:'GeoJSON'});
 
console.log('geoDv',geoDv);

const scale = {
  latitude: {
    sync: true,
    nice: false,
  },
  longitude: {
    sync: true,
    nice: false,
  },
};

const ponitData=[
  {longitude:113,latitude:28.21,name:'长沙'},
  {longitude:114.1000,latitude:22.2,name:'重庆'},
  {longitude:118.1000,latitude:24.4666,name:'厦门'},
  {longitude:106.45000,latitude:29.56667,name:'香港'},
  {longitude:121.54433,latitude:30.5000,name:'上海'},
]

  return (
    <div className={style.mapWrapper}>
       <h1> 位置发布图</h1>
    
       <Chart renderer='svg' height={window.innerHeight} scale={scale} forceFit padding={0}>
        {/* // geo view */}
        <View data={geoDv}>
          <Geom type="polygon" position="longitude*latitude" color="transparent" style={{
              fill: '#DDDDDD',
              stroke: '#b1b1b1',
              lineWidth: 1,
              fillOpacity: 0.85,
            }} opacity={0.4} />
        </View>
        <View data={ponitData}>
          <Geom
            type="point"
            position="longitude*latitude"
            color={'rgb(97,145,185)'}
            shape="circle"
            style={{
              stroke: '#eee',
              lineWidth: 1,
            }}
          >
             <Label
                 content={['name', (name)=>{
                  return `${name}`;
                }]}
                offset={20}
                textStyle={{
                  fontSize:  14,
                  fontWeight: 500,
                  fill: "red"
                }}
              />
          </Geom>
        </View>
       
      </Chart>
      
    </div>
  );
}

export default MapChart;
