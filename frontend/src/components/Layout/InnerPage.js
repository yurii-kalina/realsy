import React from 'react'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    background: 'url("/adViewBg.png") no-repeat',
    backgroundSize: '100%'
  },
  frame: {
    marginTop: 200,
    padding: '46px 0px',
    borderRadius: theme.modalRadius,
    backgroundColor: 'white',
    boxShadow: theme.boxShadow,
    boxSizing: 'border-box'
  }
}))

const InnerPage = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item sm={10} className={classes.frame}>
        {children}
      </Grid>
    </Grid>
  )
}

export default InnerPage
