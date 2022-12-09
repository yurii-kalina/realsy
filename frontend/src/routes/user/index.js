import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Login from '../../components/Auth/Login'
import AuthPage from '../../components/Auth/AuthPage'
import Register from '../../components/Auth/Register'
import ProfileRoutes from './ProfileRoutes'
import ProtectedRoute from '../ProtectedRoute'

const UserRoutes = props => {
  const match = useRouteMatch()
  return (
    <Switch>
      <ProtectedRoute path={`${match.path}/profile`}>
        <ProfileRoutes/>
      </ProtectedRoute>
      <Route path={`${match.path}/login`}>
        <AuthPage>
          <Login/>
        </AuthPage>
      </Route>
      <Route path={`${match.path}/register`}>
        <AuthPage>
          <Register/>
        </AuthPage>
      </Route>

    </Switch>
  )
}

export default UserRoutes
