import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'

import { makeStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const useStyles = makeStyles(theme => ({
  label: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'capitalize'
  },
  inputContainer: {
    display: 'flex',
    position: 'relative',
    marginTop: 18,
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    }
  },
  input: {
    width: 459,
    height: 70,
    background: '#F9F9F9',
    textTransform: 'uppercase',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, .15)',
    boxSizing: 'border-box',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }

  },
  button: {
    /* position: 'absolute',
            right: 0, */
    width: 213,
    height: 70,
    borderRadius: '0px 10px 10px 0px',
    background: theme.palette.secondary.main,
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: theme.typography.fontWeightBold
  }
}))
const Subscribe = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  return (
    <Box>
      <Typography className={classes.label} component={'h4'} variant={'h4'}>{t('getNews')}</Typography>
      <Box className={classes.inputContainer}>
        <OutlinedInput className={classes.input} variant='outlined' value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder={t('email')}/>
        <ButtonBase className={classes.button}>
          {t('subscribe')}
        </ButtonBase>
      </Box>

    </Box>
  )
}

export default Subscribe
