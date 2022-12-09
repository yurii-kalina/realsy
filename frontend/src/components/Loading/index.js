import React from 'react'
import { Box } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const Loading = ({ message, isFullWidth = true, width }) => {
  return (
    <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'} flexGrow={isFullWidth ? 1 : 0}
      py={isFullWidth ? 2 : 0} width={width}>
      {message
        ? <Box>
          <Typography variant={'body2'} component={'p'} align={'center'}>
            {message}
          </Typography>
        </Box> : null}
      <CircularProgress/>
    </Box>
  )
}

export default Loading
