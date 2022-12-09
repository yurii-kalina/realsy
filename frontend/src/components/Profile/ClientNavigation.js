import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteMatch } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import ProfileNavigation from './ProfileNavigation'
import Grid from '@material-ui/core/Grid'

const ClientNavigation = () => {
  const { t } = useTranslation()
  const items = [
    {
      value: t('profile.myAds'),
      link: '/users/profile'
    },
    {
      value: t('profile.notifications'),
      link: '/chat'
    },
    {
      value: t('profile.payments'),
      link: '/users/clients/profile/payments'
    },
    {
      value: t('profile.settings'),
      link: '/users/clients/settings'
    }
  ]
  const match = useRouteMatch()
  const [selected, setSelected] = useState(items[0])
  useEffect(() => {
    if (match && match.url) {
      setSelected(match.url)
    } else setSelected(items[0].link)
  }, [items, match])
  return (
    <Grid item sm={10}>
      <Box pt={6.25} pb={3.75}>
        <ProfileNavigation selected={selected} setSelected={setSelected} items={items}/>
      </Box>
    </Grid>
  )
}

export default ClientNavigation