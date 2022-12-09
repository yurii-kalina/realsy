import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import Home from '../../components/Profile/Home'
import Layout from '../../components/Layout'
import ProfileLayout from '../../components/Layout/ProfileLayout'

const ProfileRoutes = () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <ProtectedRoute exact path={`${match.path}`}>
        <Layout>
          <ProfileLayout>
            <Home/>
          </ProfileLayout>
        </Layout>
      </ProtectedRoute>
    </Switch>
  )
}

export default ProfileRoutes
