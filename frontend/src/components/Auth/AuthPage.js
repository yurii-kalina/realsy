import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { AuthImage } from './AuthImage'
import Box from '@material-ui/core/Box'
import Icon from '../Icon'

const useStyles = makeStyles(theme => ({
  authPage: {
    minHeight: '100vh',
    overflow: 'hidden'
  },
  background: {
    position: 'relative',
    marginTop: theme.spacing(2),
    backgroundImage: 'url("/authBg.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left'
  },
  foregroundContainer: {
    position: 'relative',
    overflow: 'hidden'
  },
  foreground: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '100%'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    display: 'block',
    width: 40,
    marginLeft: theme.spacing(5)
  },
  logoText: {
    display: 'block',
    width: 115,
    marginLeft: theme.spacing(2)
  }
}))
const AuthPage = ({ children }) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Grid container className={classes.authPage} justfiy={'center'}>
      <Grid item sm={12}>
        <h1 className={classes.logoContainer}>
          <span className={classes.logo}><Icon type={'logo'} color={theme.palette.primary.main}/></span>
          <span className={classes.logoText}><Icon type={'logoText'}
            color={theme.palette.primary.main}/></span>
        </h1>
      </Grid>
      <Grid container className={classes.background}>
        <Grid item sm={6} className={classes.foregroundContainer}>
          <Box className={classes.foreground}>
            <AuthImage/>
          </Box>
        </Grid>
        <Grid item sm={5}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AuthPage
