import React, { useEffect, useState } from "react";
import http from "@/http/http";
import { getLocalStorage, getSessionStorage, setSessionStorage } from "@/utils/storage";
import { Layout } from "antd";
import Route from "./route";
import TopHeader from "./topHeader";
import SubNav from "./subNav";
import style from "./home.less";
const { Header, Content, Sider } = Layout;

function Home() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    async function getData() {
      const objectId = getLocalStorage("userData").object_id;
      const userInfoData = getSessionStorage("userInfo");
      if (userInfoData) {
        return;
      } else {
        const res = await http.get(`operators/${objectId}`);
        setSessionStorage("userInfo", res);
      }
    }
    getData();
  }, []);

  return (
    <Layout className={style.mainLayout}>
      {/* 侧边栏 */}
      <Sider className={style.mainSideBar} trigger={null} collapsible collapsed={collapsed}>
        <SubNav />
      </Sider>
      {/* 主体 */}
      <Layout>
        {/* 头部信息栏 */}
        <Header className={style.mainHeader}>
          <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        {/* 路由页面 */}
        <Content className={style.mainContent}>
          <Route />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
