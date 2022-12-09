import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../../components/Layout'
import ProtectedRoute from '../ProtectedRoute'
import PropositionView from '../../components/Propositions/PropositionView'
const PropositionsRoutes = props => {
  const match = useRouteMatch()

  return (
    <Switch>
      <ProtectedRoute path={`${match.path}/:id`}>
        <Layout>
          <PropositionView/>
        </Layout>
      </ProtectedRoute>
    </Switch>
  )
}

export default PropositionsRoutes
