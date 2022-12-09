import React from 'react'
import { useTheme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Icon from '../../Icon'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize'
  },
  icon: {
    display: 'inherit',
    width: 12
  },
  text: {
    marginLeft: theme.spacing(1.25)
  }
}))
const Location = props => {
  const { t } = useTranslation()
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Typography component={'p'} variant={'body1'} color={'secondary'} className={classes.iconContainer}>
      <span className={classes.icon}><Icon type={'locationFilled'} color={theme.palette.secondary.main}/></span>
      <span className={classes.text}>{t('kyiv')}</span>
    </Typography>

  )
}

export default Location
