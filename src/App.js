import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { isLogin } from "@/utils/storage";
import PointLoading from "@/component/loading/loading";
import Home from '@/pages/home/home'
import Admin from '@/admin/index'
const Login = lazy(() => import("@/pages/login/login"));

function App() {
  let location = useLocation();
console.log('app');

return (
    <>
      <Switch>
        {/* 登录页面 不要权限*/}
        <Route path="/login">
          <Suspense fallback={<PointLoading />}>
            <Login />
          </Suspense>
        </Route>
        <Route path="/admin">
            <Admin />
        </Route>


        {isLogin() ? (
          <Home />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )}
      </Switch>
    </>
  );
}

export default App;
