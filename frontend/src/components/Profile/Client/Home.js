import React from 'react'

import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    background: '#fff'
  },
  imageContainer: {
    overflow: 'hidden',
    height: 359,
    '& img': {
      maxWidth: '100%'
    }
  }
}))

const Home = ({ children, path }) => {
  const classes = useStyles()

  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item sm={12} className={classes.imageContainer}>
        <img src='/adViewBg.png' alt='realsy'/>
      </Grid>
      <Grid item sm={10} className={classes.frame}>
        {children}
      </Grid>
    </Grid>
  )
}

export default Home
