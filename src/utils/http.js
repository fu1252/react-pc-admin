import axios from "axios";
import { message } from "antd";
import allApi from "../config.js";
import {getLocalStorage} from './storage'

const service = axios.create({
  baseURL: allApi.api,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    const userData=getLocalStorage('userData')
    if (userData) {
      const time = userData.login_time;
      const difTime = new Date().getTime() - time > 1000 * 60 * 60 * 24;
      if (difTime) {
        message.error("登录过期,请重新登录",3);
        setTimeout(() => {
          localStorage.removeItem("userData");
          window.history.go("/login");
        }, 3000);
      }
      config.headers["Authorization"] = `JWT ${userData.access_token}`;
    }
    if (config.headers.noNeedToken) {
      delete config.headers["Authorization"];
    }
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  },
  error => {
    message.error(error, 3);
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code) {
      message.error(res.message);
      return Promise.reject(res.code);
    } else {
      return res;
    }
  },
  error => {
    message.error(error, 3);
    return Promise.reject(error);
  }
);

export default service;
