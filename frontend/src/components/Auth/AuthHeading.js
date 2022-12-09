import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  heading: {
    color: '#363B44',
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'capitalize'
  }
}))
const AuthHeading = ({ title, children }) => {
  const classes = useStyles()
  return (
    <Box maxWidth={568}>
      <Typography component={'h2'} variant={'h2'} className={classes.heading}>
        {title}
      </Typography>
      <Box mt={0.5} mb={3}>
        {children}
      </Box>
    </Box>
  )
}

export default AuthHeading
