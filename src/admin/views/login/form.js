import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import http from "@/utils/http";
import classNames from "classnames";
import ReactSVG from "react-svg";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";

  function Form() {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const account = getLocalStorage("adminAccount");
    const [showPWD, setShowPWD] = useState(false);
    
    async function onSubmit(e) {
      e.preventDefault();
      const data = { name: name, password: pwd };
      // 用户名验证
      if (data.name === "") {
        setNameError({ isError: true, errorType: "noValue" });
        return;
      }
      if (data.name === "abc") {
        setNameError({ isError: true, errorType: "errorValue" });
        setName("");
        return;
      }
      // 密码验证
      if (data.password === "") {
        setPwdError({ isError: true, errorType: "noValue" });
        return;
      }
      if (data.password === "abc") {
        setPwdError({ isError: true, errorType: "errorValue" });
        setPwd("");
        return;
      }

      const res = await http({ url: "employees/login", data: data, method: "post", headers: { noNeedToken: true } });
      setLocalStorage("adminAccount", data);
      res.login_time = new Date().getTime();
      setLocalStorage("adminUserData", res);
      history.replace(from);
    }

    // 用户名验证
    const [name, setName] = useState(account ? account.name : "");
    const [nameError, setNameError] = useState({ isError: false, errorType: "noValue" });
    const nameInfo = { noValue: "请输入用户名", errorValue: "输入错误", placeholderText: "输入用户名" };
    function handleInputText(e) {
      setNameError(false);
      setName(e.target.value);
    }
    
    // 密码验证
    const [pwd, setPwd] = useState(account ? account.password : "");
    const [pwdError, setPwdError] = useState({ isError: false, errorType: "noValue" });
    const pwdInfo = { noValue: "请输入密码", errorValue: "输入错误", placeholderText: "输入密码" };
    function handleInputPwd(e) {
      setPwdError(false);
      setPwd(e.target.value);
    }

    return (
      <>
        <form onSubmit={onSubmit}>
          <input
            placeholder={nameError.isError ? nameInfo[nameError.errorType] : nameInfo.placeholderText}
            type="text"
            value={name}
            onChange={handleInputText}
            className={classNames({ "login-btn": true, "custom-input": true, error: nameError.isError })}
          />
          <div className="pwdWrap">
            <input
              placeholder={pwdError.isError ? pwdInfo[pwdError.errorType] : pwdInfo.placeholderText}
              value={pwd}
              onChange={handleInputPwd}
              type={showPWD ? "text" : "password"}
              className={classNames({ "login-btn": true, "custom-input": true, error: pwdError.isError })}
            />
            <ReactSVG
              onClick={() => setShowPWD(!showPWD)}
              className="togglePWD"
              src={showPWD ? require("@/assets/svg/showSecret.svg") : require("@/assets/svg/hideSecret.svg")}
            />
          </div>

          <button onClick={onSubmit} className="custom-btn login-submit" type="submit">
            登录
          </button>
        </form>
      </>
    );
  }

export default Form;
