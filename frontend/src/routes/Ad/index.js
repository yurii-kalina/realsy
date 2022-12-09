import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Form from '../../components/Ad/Form'
import Layout from '../../components/Layout'
import AdList from '../../components/Ad/AdList'
import AdItem from '../../components/Ad/AdItem'
import ProtectedRoute from '../ProtectedRoute'
import InnerPage from '../../components/Layout/InnerPage'
import ProfileLayout from '../../components/Layout/ProfileLayout'

const Index = props => {
  const match = useRouteMatch()

  return (
    <Switch>
      <ProtectedRoute path={`${match.path}/create`}>
        <Layout>
          <Form/>
        </Layout>
      </ProtectedRoute>
      <Route exact path={`${match.path}`}>
        <Layout>
          <ProfileLayout>
            <AdList/>
          </ProfileLayout>
        </Layout>
      </Route>
      <Route path={`${match.path}/:id`}>
        <Layout>
          <InnerPage>
            <AdItem/>
          </InnerPage>
        </Layout>
      </Route>
    </Switch>
  )
}

export default Index
