import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdRoutes from './Ad'
import UserRoutes from './user'
import PropertyRoutes from './Property'
import { Paths } from '../constants'
import ProtectedRoute from './ProtectedRoute'
import PropositionsRoutes from './Proposition'
import ChatRoutes from './chat'
import FavoriteRoutes from './Favorite'
import HomePage from '../components/Home/HomePage'
import Layout from '../components/Layout'
import ProfileLayout from '../components/Layout/ProfileLayout'
import Propositions from '../components/Propositions/Propositions'
import TestMap from '../components/Map/TestMap'

const Routes = () => {
  return (
    <Switch>
      <Route path='/map'>
        <TestMap/>
      </Route>
      <Route path={Paths.AD}>
        <AdRoutes/>
      </Route>
      <Route path="/users">
        <UserRoutes/>
      </Route>
      <Route path={Paths.PROPERTY}>
        <PropertyRoutes/>
      </Route>
      <ProtectedRoute path={`/profile${Paths.PROPOSITION}/:dest?`}>
        <Layout>
          <ProfileLayout>
            <Propositions/>
          </ProfileLayout>
        </Layout>
      </ProtectedRoute>
      <ProtectedRoute path={Paths.PROPOSITION}>
        <PropositionsRoutes/>
      </ProtectedRoute>
      <ProtectedRoute path={Paths.CHAT}>
        <ChatRoutes/>
      </ProtectedRoute>
      <ProtectedRoute path={Paths.FAVORITE}>
        <FavoriteRoutes/>
      </ProtectedRoute>
      <Route exact path="/">
        <HomePage/>
      </Route>
    </Switch>
  )
}

export default Routes
