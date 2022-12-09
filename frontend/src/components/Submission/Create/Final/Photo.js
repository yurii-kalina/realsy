import React from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Icon from '../../../Icon'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  icon: {
    alignSelf: 'flex-end',
    width: '100%',
    padding: '0 25px'
  },
  uploadText: {
    display: 'block',
    width: '100%',
    marginTop: '57px'
  },
  upload: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 200,
    height: 260,
    borderRadius: 15,
    backgroundColor: '#EEEFF1',
    textAlign: 'center'
  }
}))

const Photo = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Box>
      <ButtonBase className={classes.upload}>
        <Typography className={classes.uploadText} component={'span'} variant={'body2'} color={'textSecondary'}>
          {t('addPhoto')} +
        </Typography>
        <span className={classes.icon}><Icon type={'profile'}/></span>
      </ButtonBase>
    </Box>
  )
}

export default Photo
