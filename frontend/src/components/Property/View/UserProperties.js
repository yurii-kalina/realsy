import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sliceStatus } from '../../../store/sliceStatus'
import Error from '../../Error'
import Loading from '../../Loading'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Sort from '../../common/Sort'
import { ViewType } from '../../../constants'
import { selectUserToken } from '../../../store/user/selectors'
import { selectProperties } from '../../../store/property/selectors'
import { fetchUserProperties } from '../../../store/property/thunks'
import Card from '../../Submission/View/Card'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '50px 0'
  },
  results: {
    color: theme.palette.text.darkGray,
    fontWeight: theme.typography.fontWeightBold
  },
  window: {
    background: 'white'
  }
}))

const UserProperties = props => {
  const { id } = useParams()
  const classes = useStyles()
  const { t } = useTranslation()
  const { status, error, properties } = useSelector(selectProperties)
  const token = useSelector(selectUserToken)
  const [isViewTile, setViewTile] = useState(ViewType.TILE)
  const dispatch = useDispatch()
  useEffect(() => {
    if (id && status === sliceStatus.IDLE && token) {
      dispatch(fetchUserProperties(id))
    }
  }, [dispatch, id, status, token])

  const mappedCards = () => {
    return properties.map(submission =>
      <Grid item sm={isViewTile === ViewType.TILE ? 3 : 12} key={submission.id}>
        <Link component={RouterLink} to={`/property/${submission.id}`} underline={'none'}>
          <Card submission={submission} isViewTile={isViewTile}/>
        </Link>
      </Grid>)
  }

  if (status === sliceStatus.FAILED) {
    return <Error error={error && error.message}/>
  } else if (status === sliceStatus.LOADING) {
    return <Loading isFullWidth={true}/>
  } else {
    if (status === sliceStatus.SUCCEEDED && items && items.length > 0) {
      return (
        <Grid container justify={'center'} className={classes.window}>
          <Grid item sm={10}>
            <Grid container spacing={4} className={classes.container}>
              <Box width={1} px={2} display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='body1' className={classes.result}>
                  {t('results')}: 2456
                </Typography>
                <Sort isViewTile={isViewTile} clickHandler={setViewTile}/>
              </Box>
              {mappedCards()}
            </Grid>
          </Grid>
        </Grid>
      )
    } else return null
  }
}

export default UserProperties
