import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import PropertyForm from '../../components/Property/Create/PropertyForm'
import Layout from '../../components/Layout'
import PropertyView from '../../components/Property/View/PropertyView'
import PropertyList from '../../components/Property/View/PropertyList'
import PropertyAds from '../../components/Property/View/PropertyAds'
import ProfileLayout from '../../components/Layout/ProfileLayout'
import { Paths } from '../../constants'

const Index = () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/create`}>
        <Layout>
          <PropertyForm/>
        </Layout>
      </Route>

      <Route exact path={`${match.path}`}>
        <Layout>
          <ProfileLayout>
            <PropertyList/>
          </ProfileLayout>
        </Layout>
      </Route>
      <Route path={`${match.path}/:id${Paths.AD}`}>
        <Layout>
          <ProfileLayout>
            <PropertyAds/>
          </ProfileLayout>
        </Layout>
      </Route>
      <Route exact path={`${match.path}/:id`}>
        <Layout>
          <PropertyView/>
        </Layout>
      </Route>
    </Switch>
  )
}

export default Index
