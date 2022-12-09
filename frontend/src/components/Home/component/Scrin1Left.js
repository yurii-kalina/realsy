import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { OrangeLine } from './Orange_line'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Scrin1Select from './Scrin1Select'
import PrimaryButton from '../../common/buttons/PrimaryButton'

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: '120px'
  },
  title: {
    fontSize: '48px',
    marginTop: '180px'
  },
  desc: {
    fontSize: '24px',
    marginBottom: '115px',
    marginTop: '50px'
  },
  line: {
    marginTop: '-10px'
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '620px',
    height: '100px',
    borderRadius: '20px',
    background: '#FFFFFF',
    boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.18)',
    position: 'absolute',
    bottom: '-50px',
    left: '115px'
  }
}))

export const Scrin1Left = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Grid item lg={6} justify="center" className={classes.root}>
      <Typography className={classes.title}> {t('home_top_title')} </Typography>
      <Box className={classes.line}>
        <OrangeLine/>
      </Box>
      <Typography className={classes.desc}>{t('home_top_desc')}</Typography>
      <Box className={classes.form}>
        <Scrin1Select/>
        <PrimaryButton>{t('toStart')}</PrimaryButton>
      </Box>
    </Grid>

  )
}