import React, { lazy, Suspense } from "react";
import PointLoading from "@/component/loading/loading";
import { Switch, Route,useHistory } from "react-router-dom";

const Chart = lazy(() => import("../chart/chart"));
const Operator = lazy(() => import("../operator/operator"));
const Device = lazy(() => import("../device/device"));

function RouteConfig() {
  const history=useHistory()
  
  function NotFound() {
    return <h1>来到没有页面的沙漠地带</h1>;
  }

  function Home(){
    return(
      <div>
      <h1>HOME 页面</h1>
      <button className="custom-btn" onClick={()=>history.push('/')}>去往用户界面</button>
   </div>
    )
  }

  return (
    <Suspense fallback={<PointLoading />}>
      <Switch>

        <Route path="/admin/operator">
          <Operator />
        </Route>
        <Route path="/admin">
          <Home />
        </Route>
        <Route path="/admin/device">
          <Device />
        </Route>
        <Route path="/admin/chart">
          <Chart />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default RouteConfig;
