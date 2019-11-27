import React, { useEffect } from "react";
import http from "@/utils/http";
import { getLocalStorage, getSessionStorage, setSessionStorage } from "@/utils/storage";
import Route from "./route";
import TopHeader from "./topHeader";
import { useStoreActions } from "easy-peasy";
import SubNav from "./subNav";
import style from "./home.less";

function Home() {
  const setUserInfo = useStoreActions(actions => actions.user.setUserInfo);

  // 获取用户基本信息，刷新情况下不请求
  useEffect(() => {
    async function getData() {
      const objectId = getLocalStorage("userData").object_id;
      const userInfoData = getSessionStorage("userInfo");
      if (userInfoData) {
        setUserInfo(userInfoData);
        return;
      } else {
        const res = await http.get(`operators/${objectId}`);
        setUserInfo(res);
        setSessionStorage("userInfo", res);
      }
    }
    getData();
  }, []);

  return (
    <div className={style.mainLayout}>
      <SubNav />
      <div className={style.contentLayout}>
        <TopHeader />
        <div className={style.mainContent}>
            <Route />
        </div>
      </div>
    </div>
  );
}

export default Home;
