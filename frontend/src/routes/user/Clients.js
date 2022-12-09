import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import Layout from '../../components/Layout'
import Home from '../../components/Profile/Client/Home'
import AdList from '../../components/Ad/AdList'
import Chat from '../../components/Profile/Client/Chat/Chat'

const ClientsPage = () => (
  <Layout>
    <Home>
      <AdList/>
    </Home>
  </Layout>)
const Clients = () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/profile/notifications`}>
        <Layout>
          <Home>
            <Chat/>
          </Home>
        </Layout>
      </Route>
      <ProtectedRoute component={ClientsPage} path={`${match.path}/profile`}/>

    </Switch>
  )
}

export default Clients