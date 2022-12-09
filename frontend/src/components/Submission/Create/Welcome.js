import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  text: {
    textTransform: 'capitalize'
  },
  description: {
    marginTop: 20,
    lineHeight: '1.6875rem'
  }
}))
const Welcome = ({ title, text }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography variant={'body1'} color={'textPrimary'} className={classes.text}>
        {title}
      </Typography>
      <Typography variant={'body2'} color={'textSecondary'} className={clsx(classes.text, classes.description)}>
        {text}
      </Typography>
    </Box>
  )
}

export default Welcome
