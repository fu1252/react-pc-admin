import React, { lazy, Suspense } from "react";
import PointLoading from "@/component/loading/loading";
import { Switch, Route, Redirect } from "react-router-dom";

const Chart = lazy(() => import("@/pages/chart/chart"));
const About = lazy(() => import("@/pages/about/about"));
const Operator = lazy(() => import("@/pages/operator/operator"));
const Device = lazy(() => import("@/pages/device/device"));
const Editor = lazy(() => import("@/pages/editor/editor"));

function RouteConfig() {
  
  function NotFound() {
    return <h1>来到没有页面的沙漠地带</h1>;
  }

  return (
    <Suspense fallback={<PointLoading />}>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Redirect exact from="/home" to="/operator" />
        <Redirect exact from="/operator" to="/operator/device" />
        <Redirect exact from="/device" to="/device/a" />

        <Route path="/operator">
          <Operator />
        </Route>
        <Route path="/device">
          <Device />
        </Route>
        <Route path="/chart">
          <Chart />
        </Route>
        <Route path="/editor">
          <Editor />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default RouteConfig;
