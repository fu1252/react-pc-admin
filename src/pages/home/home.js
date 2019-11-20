import React, { lazy, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import http from '@/http/http'
import { getLocalStorage, getSessionStorage, setSessionStorage } from '@/utils/storage'
import style from './home.less'

const Chart=lazy(()=>import('@/pages/chart/chart'))
const Main = lazy(() => import('./main'))

function Home() {

  useEffect(() => {
    async function getData() {
      const objectId = getLocalStorage('userData').object_id
      const userInfoData = getSessionStorage('userInfo')
      if (userInfoData) {
        return
      } else {
        const res = await http.get(`operators/${objectId}`)
        setSessionStorage('userInfo', res)
      }
    }
    getData()
  }, [])




  function NotFound() {
    return <div className={style.notfound}>来到没有页面的沙漠地带</div>
  }

  return (
    <div className={style.home}>
 
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home">
            <Main />
          </Route>
          <Route path="/chart">
            <Chart />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
    </div>
  )
}

export default Home
