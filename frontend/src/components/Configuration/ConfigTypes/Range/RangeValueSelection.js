import React, { useEffect, useState } from 'react'
import RangeInput from './RangeInput'
import Box from '@material-ui/core/Box'
import PrimaryButton from '../../../common/buttons/PrimaryButton'
import { useImmer } from 'use-immer'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setSubmissionConfiguration } from '../../../../store/submission/slice'
import { useTheme } from '@material-ui/core'
import { useRouteMatch } from 'react-router-dom'
import { Paths } from '../../../../constants'
import { selectConfigurations } from '../../../../store/submission/selectors'

const RangeValueSelection = ({ configuration, handleClose }) => {
  const { id, name, values, ...others } = configuration
  const match = useRouteMatch('/:path')
  const [fields, setFields] = useImmer([])

  const configurations = useSelector(selectConfigurations)
  const [selected, setSelected] = useState({})
  const dispatch = useDispatch()
  const theme = useTheme()
  const { t } = useTranslation()

  useEffect(() => {
    setSelected(configurations.find(item => item.id === id))
  }, [configurations, id])

  useEffect(() => {
    if (selected && selected.value) {
      setFields(draft => {
        selected.value.forEach(item => {
          const index = draft.findIndex(val => val.id === item.id)
          if (index > -1) {
            draft[index] = item
          } else {
            draft.push(item)
          }
        }
        )
      })
    }
  }, [selected, setFields])

  const handleValueChange = (configId, configName, inputName, value) => {
    setFields(draft => {
      const index = draft.findIndex(item => item.id === configId)
      if (index > -1) {
        draft[index].id = configId
        draft[index].name = configName
        draft[index][inputName] = value
      } else draft.push({ id: configId, valueText: configName, [inputName]: value })
    })
  }
  const onSubmit = () => {
    if (match) {
      if (match.url === Paths.AD || match.url === Paths.SEARCH) {
        dispatch(setSubmissionConfiguration({
          id,
          name,
          value: fields.filter(item => item.numberFrom && item.numberTo && item.numberFrom !== '' && item.numberTo !== ''),
          ...others
        }))
      } else {
        dispatch(setSubmissionConfiguration({
          id,
          name,
          value: fields.filter(item => item.valueNumber && item.valueNumber !== ''),
          ...others
        }))
      }
    }
    handleClose()
  }
  return (
    <>
      {values.map(item =>
        <RangeInput
          unit={configuration.unit}
          key={item.id} id={item.id} name={item.valueText}
          value={fields.find(configValue => item.id === configValue.id)}
          handleChange={handleValueChange}/>)}
      <Box mt={5} display={'flex'} justifyContent={'center'}>
        <PrimaryButton text={t('save')} onClick={onSubmit} fontSize={theme.typography.body2.fontSize}
          size={'narrow'}/>
      </Box>
    </>
  )
}

export default RangeValueSelection
