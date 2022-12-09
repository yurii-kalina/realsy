import React, { Suspense, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import StepSelect from '../../Submission/Create/StepSelect'
import Box from '@material-ui/core/Box'
import BasicsStep from '../../Submission/Create/Basic/BasicsStep'
import Loading from '../../Loading'
import Welcome from '../../Submission/Create/Welcome'
import { Form } from '../../constants/Constants'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setSubmissionEmpty } from '../../../store/submission/slice'

const DetailedStep = React.lazy(() => import('../../Submission/Create/Detailed/DetailedStep'))
const FinalStep = React.lazy(() => import('./FinalStep'))

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    paddingBottom: 50,
    backgroundColor: '#EEEFF1'
  },
  form: {
    minHeight: '500px',
    borderRadius: theme.modalRadius,
    backgroundColor: 'white',
    boxShadow: theme.boxShadow,
    boxSizing: 'border-box'
  }
}))

const PropertyForm = () => {
  const [currentStep, gotoStep] = useState(1)
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behaviour: 'smooth'
    })
    dispatch(setSubmissionEmpty())
  }, [dispatch])

  const handleStep = (step) => {
    window.scrollTo({
      top: 0,
      behaviour: 'smooth'
    })
    gotoStep(step)
  }

  return (
    <Grid container justify={'center'} className={classes.formWrapper}>
      <Grid item sm={10}>
        <Box py={6.25}>
          <Welcome text={t('createAd')}/>
        </Box>
      </Grid>
      <Grid item sm={10} className={classes.form}>
        <StepSelect gotoStep={gotoStep} currentStep={currentStep}/>
        <Box px={7.5} py={4}>
          <Box display={currentStep === 1 ? 'block' : 'none'}>
            <BasicsStep handleStep={handleStep} type={Form.PROPERTY}/>
          </Box>
          <Box display={currentStep === 2 ? 'block' : 'none'}>
            <Suspense fallback={<Loading isFullWidth={true}/>}>
              <DetailedStep handleStep={handleStep}/>
            </Suspense>
          </Box>
          <Box display={currentStep === 3 ? 'block' : 'none'}>
            <Suspense fallback={<Loading isFullWidth={true}/>}>
              <FinalStep handleStep={handleStep}/>
            </Suspense>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PropertyForm
