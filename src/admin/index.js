import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { isAdminLogin } from "@/utils/storage";
import PointLoading from "@/component/loading/loading";
import Home from './views/home/home'
const Login = lazy(() => import("./views/login/login"));


function Admin() {
  let location = useLocation();
console.log('app');
  return (
    <>
      <Switch>
        <Route path="/admin/login">
          <Suspense fallback={<PointLoading />}>
            <Login />
          </Suspense>
        </Route>

        {isAdminLogin() ? (
          <Home />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
              state: { from: location }
            }}
          />
        )}
      </Switch>
    </>
  );
}

export default Admin;
