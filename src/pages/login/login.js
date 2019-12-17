import React, {lazy} from "react";
import { Switch, Route } from "react-router-dom";
import style from "./login.less";

const ForgetPWD=lazy(()=>import('./forgetPWD'))
const Form=lazy(()=>import('./form'))

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
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/login/forgetPWD">
        <ForgetPWD />
      </Route>
    </Switch>
  );
}

export default LoginWrap;
