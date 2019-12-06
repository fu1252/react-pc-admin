import React, { lazy, Suspense,useState} from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { isLogin } from "@/utils/storage";
import PointLoading from "@/component/loading/loading";
import Home from '@/pages/home/home'
import Admin from '@/admin/index'
import intl from 'react-intl-universal'
import {setLocalStorage,getLocalStorage }from '@/utils/storage'
import us from './locales/en-US.js'
import zh from './locales/zh-CN.js'

const Login = lazy(() => import("@/pages/login/login"));
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

function App() {
  console.log('app')

  const location = useLocation();
  const storage=getLocalStorage('lang')
  const langStorage=storage?storage:'zh-CN'
  const [lang, setLang] = useState(langStorage)
  const [test, setTest] = useState(111)
  console.log("TCL: App -> test", test)
  
   import(`./locales/${langStorage}.js`).then(value=>{console.log(9999);
    setTest(2222)
     return intl.init({
      currentLocale: lang, 
      locales:{[lang]:value.default}
    })
  })
  

    

    function onLangClick(){
      const value=lang==='en-US'?'zh-CN':'en-US'
      setLang(value)
      setLocalStorage('lang',value)
    }

return (
    <>
    <h1>{test}</h1>
    <button className="custom-btn" onClick={onLangClick}>切换语言</button>
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
