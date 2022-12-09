import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import Deal from './Deal'
import UserSection from './UserSection'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import SubHeader from './SubHeader/SubHeader'
import { getHeaderConfigs } from '../../../store/configuration/selectors'
import { sliceStatus } from '../../../store/sliceStatus'
import { fetchHeaderConfigurations } from '../../../store/configuration/thunks'
import { useDispatch, useSelector } from 'react-redux'
import HeaderConfig from './HeaderConfig'
import { selectFavorites } from '../../../store/favorite/selectors'
import { selectUser } from '../../../store/user/selectors'
import { fetchFavoritesIds } from '../../../store/favorite/thunks'

const useStyles = makeStyles(theme => ({
  header: {
    position: 'relative',
    background: 'white',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, .25)'
  }
}))

const Header = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [type, setType] = useState(null)
  const [deal, setDeal] = useState(null)
  const { status, items } = useSelector(getHeaderConfigs)
  const { status: favoriteStatus } = useSelector(selectFavorites)
  const { user } = useSelector(selectUser)

  useEffect(() => {
    if (status === sliceStatus.IDLE) {
      dispatch(fetchHeaderConfigurations())
    }
  }, [status, dispatch])

  useEffect(() => {
    if (favoriteStatus === sliceStatus.IDLE && user && user.id) {
      dispatch(fetchFavoritesIds())
    }
  }, [favoriteStatus, dispatch, user])
  const getCategories = () => {
    const selected = items.find(item => item.id === type)
    return selected.categories
  }
  return (
    <Grid container spacing={0} justify={'center'} alignItems={'center'} className={classes.header}>
      <Grid item sm={10}>
        <Box height={100} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Logo/>
          <Deal deal={deal} setDeal={setDeal}/>
          <UserSection/>
        </Box>
        {deal && deal.length > 0 && <SubHeader setType={setType} links={items} type={type}/>}
        {deal && deal.length > 0 && type && <HeaderConfig categories={getCategories()}/>}
      </Grid>
    </Grid>
  )
}

export default Header
