import React ,{lazy}from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

const Chart = lazy(() => import("@/pages/chart/chart"));
const About = lazy(() => import("@/pages/about/about"));
const Operator = lazy(() => import("@/pages/operator/operator"));
const Device=lazy(()=>import('@/pages/device/device'))

function RouteConfig(){

  function NotFound() {
    return <h1>来到没有页面的沙漠地带</h1>;
  }

  return(
    <Switch>
        <Redirect exact from="/" to="/home" />
        <Redirect exact from="/home" to="/operator" />      
        <Redirect exact from="/operator" to="/operator/device" />      
        <Route path="/operator">
          <Operator />
        </Route>
        <Redirect exact from="/device" to="/device/a" />      
        <Route path="/device">
          <Device />
        </Route>
        <Route path="/chart">
          <Chart />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
  )
}

export default RouteConfig