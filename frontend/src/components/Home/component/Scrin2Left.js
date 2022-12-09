import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  }
}))

export const Scrin2Left = () => {
  const classes = useStyles()
  return (
    <img className={classes.root} src="./homeClock.png" alt='REALSY'/>
  )
}