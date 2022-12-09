import React, { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import DateModalContent from './DateModalContent'
import Box from '@material-ui/core/Box'
import PrimaryButton from '../../../common/buttons/PrimaryButton'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setSubmissionConfiguration } from '../../../../store/submission/slice'
import { useTheme } from '@material-ui/core'
import { selectConfigurations } from '../../../../store/submission/selectors'

const DateValueSelection = ({ configuration, handleClose }) => {
  const theme = useTheme()
  const { id, name, values, ...others } = configuration
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const configurations = useSelector(selectConfigurations)
  const [selectedValues, setSelected] = useState({})

  useEffect(() => {
    setSelected(configurations.find(item => item.id === id))
  }, [configurations, id])

  const [date, setDate] = useImmer(selectedValues && selectedValues.value && !selectedValues.value.id ? selectedValues.value : {})
  const [field, setField] = useState(selectedValues ? selectedValues.value : null)

  const handleDate = (dateInput) => {
    setField(null)
    const { name: configName, value: configValue } = dateInput
    setDate(draft => {
      draft[configName] = configValue
    })
  }
  const handleFields = (configId) => {
    setDate(draft => {
      draft.dateFrom = ''
      draft.dateTo = ''
    })
    if (field && field.id === configId) {
      setField(null)
    } else {
      const index = values.findIndex(item => item.id === configId)
      setField(values[index])
    }
  }
  const submit = () => {
    if (field) dispatch(setSubmissionConfiguration({ id, name, value: field, ...others }))
    else if (date) dispatch(setSubmissionConfiguration({ id, name, value: date, ...others }))
    handleClose()
  }
  return (
    <>
      <DateModalContent selectables={values} field={field} date={date} handleDate={handleDate}
        handleSelect={handleFields}/>
      <Box mt={5} display={'flex'} justifyContent={'center'}>
        <PrimaryButton text={t('save')} onClick={submit} fontSize={theme.typography.body2.fontSize}
          size={'narrow'}/>
      </Box>
    </>
  )
}

export default DateValueSelection
