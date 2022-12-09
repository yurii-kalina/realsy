import React from 'react'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  window: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    position: 'relative',
    padding: '30px 50px',
    maxWidth: 700,
    overflow: 'hidden'
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 4
  },
  mandatory: {
    backgroundColor: theme.palette.primary.main
  },
  optional: {
    backgroundColor: theme.palette.orange
  },
  text: {
    color: 'black'
  },
  title: {
    display: 'block',
    maxWidth: '530px',
    margin: '0 auto',
    padding: '15px 0'
  }
}))

const ModalHeader = ({ title, hasPriority }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <Typography className={classes.title} component={'p'} variant={'body2'} align={'center'}
        color={'textSecondary'}>
        {title}
      </Typography>
      {hasPriority
        ? <Box display='flex' justifyContent='center'>
          <Box display='flex'>
            <Box className={clsx(classes.colorIndicator, classes.mandatory)} mr={2}></Box>
            <Typography component={'span'} variant={'body2'} className={classes.text}>
              {t('mandatory')}
            </Typography>
          </Box>
          <Box display='flex' ml={7}>
            <Box className={clsx(classes.colorIndicator, classes.optional)} mr={2}></Box>
            <Typography component={'span'} variant={'body2'} className={classes.text}>
              {t('optional')}
            </Typography>
          </Box>
        </Box>
        : null}
    </>
  )
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  hasPriority: PropTypes.bool
}

export default ModalHeader
