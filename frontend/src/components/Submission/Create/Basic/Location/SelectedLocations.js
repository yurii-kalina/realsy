import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SimpleFormButton from '../../../../common/buttons/SimpleFormButton'
import Box from '@material-ui/core/Box'
import { removeSubmissionDistricts } from '../../../../../store/submission/slice'
import { getSubmissionLocation } from '../../../../../store/submission/selectors'

const useStyles = makeStyles((theme) => ({
  text: {
    textTransform: 'capitalize'
  }
}))

const SelectedLocations = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()

  const { districts } = useSelector(getSubmissionLocation)
  return (
    <>
      {districts && districts.length > 0
        ? districts.map((item, i) => (
          <Box key={i} px={1}>
            <SimpleFormButton text={t(`districts.${item.name}`)}
              icon={'close'}
              iconPosition={'right'}
              textColor={'#000'}
              fontSize={theme.typography.body2.fontSize} size={'smaller'}
              onClick={() => dispatch(removeSubmissionDistricts(item))}
              iconSize={10}/>
          </Box>)
        )
        : <Typography id={'modalOpenner'} variant={'body2'} component={'p'} color={'textSecondary'}
          className={classes.text}>{t('chooseLocation')}</Typography>}
    </>
  )
}

export default SelectedLocations
