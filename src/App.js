import React, { lazy, Suspense,useState} from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { isLogin } from "@/utils/storage";
import PointLoading from "@/component/loading/loading";
import Home from '@/pages/home/home'
import Admin from '@/admin/index'
import intl from 'react-intl-universal'
import {getLocalStorage }from '@/utils/storage'

const Login = lazy(() => import("@/pages/login/login"));
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

function App() {

  const location = useLocation();
  const storage=getLocalStorage('lang')
  const language=storage?storage:'zh-CN'
  
   import(`./locales/${language}.js`).then(value=>{
     return intl.init({
      currentLocale: language, 
      locales:{[language]:value.default}
    })
  })
  
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
