import React from 'react'
import { useSelector } from 'react-redux'
import { getDetailedConfiguration } from '../../store/configuration/selectors'
import FormSectionLabel from '../common/labels/FormSectionLabel'
import { useTranslation } from 'react-i18next'
import ConfigType from './ConfigType'
import { useTheme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 40
  }
}))

const DetailedConfigCategory = () => {
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation()
  const location = useLocation()
  console.log(location.pathname)
  const configs = useSelector(getDetailedConfiguration)

  return (
    <Grid container spacing={3}>
      {
        !!configs && configs.map(item => (
          <Grid container spacing={3} key={item.id} className={classes.container}>
            <Grid item sm={12}>
              <FormSectionLabel text={t(item.name)} icon={item.icon} iconColor={'#000'}
                fontWeight={theme.typography.fontWeightMedium}
                fontSize={theme.typography.body1.fontSize}/>
            </Grid>
            <ConfigType category={{ name: item.name, isDetailed: item.isDetailed, icon: item.icon }}
              configurations={item.configurations}/>
          </Grid>
        ))
      }
    </Grid>
  )
}
export default DetailedConfigCategory
