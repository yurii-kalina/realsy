import React from 'react'
import Box from '@material-ui/core/Box'
import Icon from '../../Icon'

import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { Paths } from '../../../constants'

const useStyles = makeStyles(theme => ({
  icon: {
    display: 'block',
    width: 20
  }
}))
const FavoriteAndNotifications = props => {
  const classes = useStyles()
  return (
    <Box display={'flex'}>
      <Box px={2}>
        <Link component={RouterLink} to={Paths.FAVORITE} underline={'none'} className={classes.icon}>
          <Icon type={'favorite'}/>
        </Link>
      </Box>
      <Box px={2}>
        <ButtonBase className={classes.icon}>
          <Icon type={'notification'}/>
        </ButtonBase>
      </Box>
    </Box>
  )
}

export default FavoriteAndNotifications
