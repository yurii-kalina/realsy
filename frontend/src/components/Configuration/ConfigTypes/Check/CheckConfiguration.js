import React, { useEffect, useState } from 'react'
import LargeIconButton from '../../../common/buttons/LargeIconButton'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { removeSubmissionConfiguration, setSubmissionConfiguration } from '../../../../store/submission/slice'
import Checkbox from '../../../common/buttons/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { selectConfigurations } from '../../../../store/submission/selectors'
import { useTheme } from '@material-ui/core'

const CheckConfiguration = ({ configuration }) => {
  const { id, name, icon, ...others } = configuration
  const theme = useTheme()
  const configurations = useSelector(selectConfigurations)
  const [chosenConfig, setChosenConfig] = useState({})
  const { t } = useTranslation()
  const dispatch = useDispatch()
  useEffect(() => {
    setChosenConfig(configurations.find(item => item.id === id))
  }, [configurations, id])

  const handleToggle = () => {
    chosenConfig && chosenConfig.id === id ? dispatch(removeSubmissionConfiguration(id)) : dispatch(setSubmissionConfiguration({
      id,
      name,
      value: { valueBoolean: true, valueText: name, icon },
      icon,
      ...others
    }))
  }
  if (configuration) {
    if (configuration.isIconLarge) {
      return (
        <LargeIconButton
          isActive={chosenConfig && chosenConfig.id === id}
          iconName={icon}
          name={t(name)}
          onClick={handleToggle}
          type={'checkbox'}
        />
      )
    } else {
      return (
        <Grid>
          <Box mt={configuration.category && configuration.category.name !== name ? 6.25 : 0}>
            <Checkbox textColor={theme.palette.text.secondary} position='right'
              text={configuration.category && configuration.category.name !== name ? t(name) : null}
              size={'large'} onClick={handleToggle}
              isActive={chosenConfig && chosenConfig.id === id}/>
          </Box>
        </Grid>
      )
    }
  } else return null
}

export default CheckConfiguration
