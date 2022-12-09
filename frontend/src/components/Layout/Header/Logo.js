import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Icon from '../../Icon'

const useStyles = makeStyles(theme => ({
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    display: 'block',
    width: 40
  },
  logoText: {
    display: 'block',
    width: 115,
    marginLeft: theme.spacing(2)
  }
}))
const Logo = props => {
  const classes = useStyles()
  return (
    <h1 className={classes.logoContainer}>
      <span className={classes.logo}><Icon type={'logo'}/></span>
      <span className={classes.logoText}><Icon type={'logoText'}/></span>
    </h1>
  )
}

export default Logo
