import React, { lazy, Suspense } from "react";
import { useLocation, Route, Switch, useRouteMatch } from "react-router-dom";
import PointLoading from "@/component/loading/loading";
import style from "./device.less";
import CustomTab from "@/component/customTab/customTab.js";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import BreadcrumbEle from './breadcrumb'

const Channel = lazy(() => import("./channel/channel.js"));
const Employee = lazy(() => import("./employee/employee.js"));
const TreeCheck = lazy(() => import("./TreeCheck.js"));

function Device() {
  const location = useLocation();
  const { path } = useRouteMatch();

  const tabList = [
    { text: "aaa", path: "/device/a" },
    { text: "bbb", path: "/device/b" },
    { text: "ccc", path: "/device/c" }
  ];

  return (
    <div className={style.deviceWrapper}>
      <div className={style.breadcrumb}>
        <BreadcrumbEle />
      </div>
      <div className={style.container}>
        <CustomTab list={tabList}>
          <SwitchTransition>
            <CSSTransition classNames={"fade"} timeout={300} key={location.pathname}>
              <div>
                <Suspense fallback={<PointLoading />}>
                  <Switch>

                    <Route exact path={`${path}/a`}>
                      <Channel />
                    </Route>
                    <Route exact path={`${path}/b`}>
                      <Employee />
                    </Route>
                    <Route exact path={`${path}/c`}>
                      <TreeCheck />
                    </Route>
                  
                  </Switch>
                </Suspense>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </CustomTab>
      </div>
    </div>
  );
}

export default Device;
