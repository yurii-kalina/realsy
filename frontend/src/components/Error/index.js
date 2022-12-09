import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Error = ({ error }) => {
  const { t } = useTranslation()
  return (
    <Box p={3}>
      <Typography variant={'body1'} component={'p'} color={'error'}>
        {error || t('somethingWrong')}
      </Typography>
    </Box>
  )
}

export default Error
