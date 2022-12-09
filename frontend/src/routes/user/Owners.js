import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import Propositions from '../../components/Propositions/Propositions'
import Layout from '../../components/Layout'

const PropositionsPage = () => {
  return (
    <Layout>
      <Propositions/>
    </Layout>
  )
}
const Owners = () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <ProtectedRoute component={PropositionsPage} path={`${match.path}/propositions`}/>
    </Switch>
  )
}

export default Owners