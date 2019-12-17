import React from "react";
import { Switch, Route } from "react-router-dom";
import style from "./login.less";
import Form from './form'

function LoginWrap() {

  function Login() {
    return (
      <div className={style.loginWrapper}>
        <div className={style.container}>
          <div className="header">运营管理系统</div>
          <Form />
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route exact path="/admin/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default LoginWrap;
