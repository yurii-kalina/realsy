import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { OrangeLine } from './Orange_line'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  text_1: {
    marginTop: '100px',
    display: 'block',
    textAlign: 'center',
    fontSize: '21px',
    textTransform: 'uppercase',
    width: '100%'
  },
  text_2: {
    color: '#1AD365'
  },
  line: {
    textAlign: 'center'
  },
  s2_title: {
    textAlign: 'center'
  }
}))

export const Scrin3Top = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Container>
      <Typography className={classes.text_1}>{t('s3_title')}</Typography>
      <Container className={classes.line}><OrangeLine/></Container>
      <Typography variant="h4" className={classes.s2_title}>
        {t('s3_desc')}
      </Typography>
    </Container>
  )
}