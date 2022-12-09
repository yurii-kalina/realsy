import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../../components/Layout'
import ProfileLayout from '../../components/Layout/ProfileLayout'
import Chat from '../../components/Chat/Chat'
import ClientNavigation from '../../components/Profile/ClientNavigation'

const ChatRoutes = () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:id?`}>
        <Layout>
          <ProfileLayout>
            <ClientNavigation/>
            <Chat/>
          </ProfileLayout>
        </Layout>
      </Route>
    </Switch>
  )
}

export default ChatRoutes
