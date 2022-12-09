import React from 'react'
import DetailedConfigCategory from '../../../Configuration/DetailedConfigCategory'
import PrimaryButton from '../../../common/buttons/PrimaryButton'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core'

const DetailedStep = ({ handleStep }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <>
      <DetailedConfigCategory step={'detailed'}/>
      <Box width={1} mt={5} display={'flex'} justifyContent={'center'}>
        <PrimaryButton text={t('next')} onClick={() => handleStep(3)} icon={'rightArrow'} iconPosition={'right'}
          iconColor={'white'} iconSize={37} size={'medium'}
          fontSize={theme.typography.h5.fontSize}/>
      </Box>
    </>
  )
}

export default DetailedStep
