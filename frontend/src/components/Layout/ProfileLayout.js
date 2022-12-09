import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Profile from '../Profile/Profile'
import ProfileNavigation from '../Profile/ProfileNavigation'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    height: 359,
    background: 'url("/adViewBg.png") no-repeat',
    backgroundSize: '100%'
  },
  frame: {
    minHeight: 200,
    padding: '46px 0px',
    backgroundColor: 'white',
    boxSizing: 'border-box'
  },
  menu: {
    position: 'absolute',
    top: theme.spacing(2),
    borderRadius: 30,
    zIndex: 2,
    background: 'white',
    boxShadow: ' 0px 2px 25px rgba(0, 0, 0, 0.15)'
  },
  window: {
    background: 'white'
  }
}))

const ProfileLayout = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid container justify={'center'}>
      <Grid container justify={'center'} className={classes.container}>
        <Grid item sm={10}>
          <Box className={classes.menu} maxWidth={500} mt={4.25}>
            <Profile/>
          </Box>
        </Grid>
      </Grid>
      <Grid container justify='center' className={classes.frame}>
        <Grid container justify={'center'} className={classes.window}>
          <Grid item sm={10}>
            <ProfileNavigation/>
            {children}
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  )
}

export default ProfileLayout
