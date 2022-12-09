import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: '20px',
    '& p': {
      fontSize: '18px'
    }
  }
}))

export const Scrin2Right = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box className={classes.root}>
      <Typography>{t('s2_desc1')}</Typography>
      <br/>
      <Typography>{t('s2_desc2')}</Typography>
    </Box>
  )
}