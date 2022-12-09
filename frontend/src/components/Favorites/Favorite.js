import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import ProfileNavigation from '../Profile/ProfileNavigation'
import FavoriteAds from './FavoriteAds'
import { useHistory, useParams } from 'react-router-dom'
import FavoriteProperties from './FavoriteProperties'
import { Paths } from '../../constants'

const Favorite = () => {
  const { t } = useTranslation()
  const { dest } = useParams()
  const [active, setActive] = useState('')
  const history = useHistory()
  const items = [
    {
      value: t('favorites.ads'),
      link: `${Paths.FAVORITE}${Paths.AD}`
    },
    {
      value: t('favorites.properties'),
      link: `${Paths.FAVORITE}${Paths.PROPERTY}`
    }
  ]
  useEffect(() => {
    if (dest && dest.length > 0) {
      setActive(`/${dest}`)
    }
  }, [dest])
  useEffect(() => {
    if (!dest || dest.length === 0) {
      history.push(`${Paths.FAVORITE}${Paths.AD}`)
    }
  }, [dest, history])
  return (
    <Box pt={6.25} pb={3.75} minHeight={400}>
      <ProfileNavigation items={items} selected={active === Paths.AD ? items[0].link : active === Paths.PROPERTY ? items[1].link : false}/>
      <Box width={1} display={ active === Paths.AD ? 'block' : 'none'}>
        <FavoriteAds/>
      </Box>
      <Box width={1} display={ active === Paths.PROPERTY ? 'block' : 'none'}>
        <FavoriteProperties/>
      </Box>
    </Box>

  )
}

export default Favorite