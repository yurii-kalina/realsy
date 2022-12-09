import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%'
  }
}))

export const Scrin4Right = () => {
  const classes = useStyles()
  return (
    <Box width={1} overflow='hidden'>
      <img className={classes.root} src="./s4_iconRight.png" alt='REALSY'/>
    </Box>
  )
}