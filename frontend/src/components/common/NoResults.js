import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.text.lightGray,
    fontStyle: 'italic'
  }
}))
const NoResults = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Box width={1} height={500} display='flex' justifyContent='center' alignItems='center'>
      <Typography variant='h3' component='h3'
        className={classes.title}>{t('noResults')}</Typography>
    </Box>

  )
}

export default NoResults