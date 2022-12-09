import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { OrangeLine } from './Orange_line'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  text_1: {
    display: 'block',
    textAlign: 'center',
    fontSize: '21px',
    width: '100%'
  }
}))

export const Scrin4Top = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <>
      <Typography className={classes.text_1}>{t('FAQ')}</Typography>
      <Container><OrangeLine/></Container>

    </>
  )
}