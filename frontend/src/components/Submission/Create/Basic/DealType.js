import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getSubmissionType } from '../../../../store/submission/selectors'
import { setSubmissionType } from '../../../../store/submission/slice'
import SimpleFormButton from '../../../common/buttons/SimpleFormButton'
import { useTheme } from '@material-ui/core'
import { DealTypes } from '../../../../constants'

const DealType = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const adType = useSelector(getSubmissionType)
  const dispatch = useDispatch()
  return (
    <>
      <Typography component={'div'} variant={'body2'} align={'center'}>
        {t('chooseDealType')}
      </Typography>
      <Box display={'flex'} justifyContent={'space-evenly'} mx={5} my={2.3}>
        <SimpleFormButton
          text={t('rent')}
          fontSize={theme.typography.body2.fontSize}
          textColor={theme.palette.text.primary}
          variant={'bordered'}
          activeVariant={'default'}
          isActive={adType === DealTypes.RENT}
          onClick={() => dispatch(setSubmissionType(DealTypes.RENT))}
        />
        <SimpleFormButton
          text={t('buy')}
          fontSize={theme.typography.body2.fontSize}
          textColor={theme.palette.text.primary}
          variant={'bordered'}
          activeVariant={'default'}
          isActive={adType === DealTypes.BUY}
          onClick={() => dispatch(setSubmissionType(DealTypes.BUY))}
        />
      </Box>
    </>
  )
}

export default DealType
