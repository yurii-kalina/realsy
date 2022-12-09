import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.text.gray,
    fontSize: '1rem'
  }
}))
const CopyRight = props => {
  const classes = useStyles()
  return (
    <Box py={6.25} textAlign={'center'}>
      <Typography className={classes.text}>
                © 2020 REALSY Company. All rights reserved.
      </Typography>
    </Box>
  )
}

export default CopyRight
