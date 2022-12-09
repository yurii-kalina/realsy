import React, { useEffect, useState } from 'react'
import DistanceSlider from '../../../Slider/distance/DistanceSlider'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import LargeIconButton from '../../../common/buttons/LargeIconButton'
import { useDispatch, useSelector } from 'react-redux'
import { setSubmissionConfigurationTime, setSubmissionConfigurationTimeItems } from '../../../../store/submission/slice'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { selectConfigurations } from '../../../../store/submission/selectors'

const useStyles = makeStyles((theme) => ({
  text: {
    maxWidth: 477
  }
}))

const TimeConfiguration = ({ configuration }) => {
  const { id, name, values, icon, ...others } = configuration
  const [sliderValue, setSliderValue] = useState(20)
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const configurations = useSelector(selectConfigurations)
  const [chosenConfig, setChosenConfig] = useState({})

  useEffect(() => {
    setChosenConfig(configurations.find(item => item.id === id))
  }, [configurations, id])

  const wasValueSelected = (itemId) => {
    return chosenConfig && chosenConfig.value && chosenConfig.value.findIndex(item => item.id === itemId) > -1
  }

  const handleToggle = (item) => {
    dispatch(setSubmissionConfigurationTimeItems({
      id,
      name,
      value: {
        ...item,
        valueNumber: sliderValue
      },
      icon,
      ...others
    }))
  }

  const handleSliderChange = (value) => {
    setSliderValue(value)
    return chosenConfig && chosenConfig.value.length > 0 ? dispatch(setSubmissionConfigurationTime({
      id,
      value
    })) : null
  }
  return (
    <Box mt={2.5}>
      <Typography variant={'body2'} color={'textSecondary'} className={classes.text}>
        {t('chooseClosest')}
      </Typography>
      <Box px={2} py={4} display={'flex'} justifyContent={1} width={1}>
        <DistanceSlider onChangeCommitted={(e, value) => handleSliderChange(value)} defaultValue={sliderValue}/>
      </Box>
      <Grid container spacing={4}>
        {values && values.length > 0
          ? values.map(value =>
            <Grid item sm={3} key={value.id}>
              <LargeIconButton
                isActive={wasValueSelected(value.id)}
                iconName={value.icon}
                name={t(value.valueText)}
                onClick={() => handleToggle(value)}
                type={'checkbox'}
              />
            </Grid>)
          : null}
      </Grid>
    </Box>
  )
}

export default TimeConfiguration
