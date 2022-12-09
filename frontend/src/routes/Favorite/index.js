import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../../components/Layout'
import ProfileLayout from '../../components/Layout/ProfileLayout'
import Favorite from '../../components/Favorites/Favorite'

const FavoriteAds = () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`${match.path}/:dest?`}>
        <Layout>
          <ProfileLayout>
            <Favorite/>
          </ProfileLayout>
        </Layout>
      </Route>
    </Switch>
  )
}

export default FavoriteAds
