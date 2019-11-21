import React ,{lazy}from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

const Chart = lazy(() => import("@/pages/chart/chart"));
const About = lazy(() => import("@/pages/about/about"));
const Main = lazy(() => import("./main"));

function RouteConfig(){

  function NotFound() {
    return <h1>来到没有页面的沙漠地带</h1>;
  }

  return(
    <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/home">
          <Main />
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