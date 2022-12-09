import React from 'react'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import SimpleFormButton from '../../common/buttons/SimpleFormButton'

const StepSelect = ({ currentStep, gotoStep }) => {
  const { t } = useTranslation()
  return (
    <Box display={'flex'} justifyContent={'space-around'} mx={5} mt={4}>
      <SimpleFormButton text={t('basics')} isActive={currentStep === 1} onClick={() => gotoStep(1)}/>
      <SimpleFormButton text={t('detailed')} isActive={currentStep === 2} onClick={() => gotoStep(2)}/>
      <SimpleFormButton text={t('final')} isActive={currentStep === 3} onClick={() => gotoStep(3)}/>
    </Box>
  )
}

export default StepSelect
