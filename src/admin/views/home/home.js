import React from "react";
import Route from "./route";
import TopHeader from "./topHeader";
import SubNav from "./subNav";
import style from "./home.less";

function Home() {
 

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
