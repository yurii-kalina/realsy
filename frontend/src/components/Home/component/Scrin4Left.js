import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SocialMedia from '../../Layout/Footer/SocialMedia'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  text: {
    marginTop: '50px',
    width: '490px'
  },
  icon: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '76px',
    marginTop: '25px'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '-154px',
    marginTop: '50px'
  }
}))

export const Scrin4Left = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <>
      <Typography className={classes.text}>{t('s4_text')}</Typography>
      <Box className={classes.icon}><SocialMedia/></Box>
      <Box className={classes.button}>
        <PrimaryButton text={t('FAQ')} width={150} height={50} size={'custom'}/>
      </Box>
    </>
  )
}