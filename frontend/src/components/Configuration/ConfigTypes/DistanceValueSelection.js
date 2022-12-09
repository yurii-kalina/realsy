import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core'
import ConfigValueButton from '../../common/buttons/ConfigValueButton/ConfigValueButton'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import { setSubmissionConfiguration } from '../../../store/submission/slice'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField/TextField'
import SquareButton from '../../common/buttons/SquareButton'
import { selectConfigurations } from '../../../store/submission/selectors'

const DistanceValueSelection = ({ configuration, handleClose }) => {
  const { id, name, values, ...others } = configuration

  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()

  const [mandatory, setMandatory] = useState(null)
  const [optionals, setOptionals] = useState([])
  const [distance, setDistance] = useState('')
  const [unit, setUnit] = useState('m')
  const configurations = useSelector(selectConfigurations)
  const [selected, setSelected] = useState({})

  useEffect(() => {
    setSelected(configurations.find(item => item.id === id))
  }, [configurations, id])

  useEffect(() => {
    if (selected && selected.value) {
      const selectedMandatories = selected.value.filter(item => item.isOptional === false)
      if (selectedMandatories && selectedMandatories.length === values.length) {
        setMandatory(values)
        setUnit('m')
        setDistance(selectedMandatories[0] ? selectedMandatories[0].distanceInMeters : 0)
      } else {
        setMandatory(selected.value.find(item => item.isOptional === false))
        setOptionals(selected.value.filter(item => item.isOptional === true))
        setUnit('m')
        setDistance(selected.value[0] ? selected.value[0].distanceInMeters : 0)
      }
    }
  }, [selected, values])

  const handleSelect = (configId) => {
    if (mandatory) {
      if (mandatory.id === configId) {
        setMandatory(null)
        setOptionals([])
      } else if (mandatory.length === values.length) {
        setMandatory(values.find(item => item.id === configId))
      } else {
        if (optionals.length > 0 && optionals.find(item => item.id === configId)) {
          setOptionals(optionals.filter(item => item.id !== configId))
        } else {
          setOptionals([...optionals, values.find(item => item.id === configId)])
        }
      }
    } else {
      setMandatory(values.find(item => item.id === configId))
    }
  }

  const handleSelectAll = () => {
    if (mandatory && values) {
      if (mandatory.length === values.length) {
        setMandatory(null)
        setOptionals([])
      } else {
        setOptionals([])
        setMandatory(values)
      }
    } else {
      setMandatory(values)
    }
  }
  const handleSave = () => {
    if (mandatory && mandatory.length > 1) {
      const mandatoryFlat = mandatory.map(mando => ({
        ...mando,
        isOptional: false,
        distanceInMeters: unit === 'm' ? distance : distance * 1000
      }))
      dispatch(setSubmissionConfiguration({
        id,
        name,
        value: mandatoryFlat,
        ...others
      }))
    } else if (mandatory) {
      const optionalsFlat = optionals.map(optional => ({
        ...optional,
        isOptional: true,
        distanceInMeters: unit === 'm' ? distance : distance * 1000
      }))
      const mandatoryFlat = {
        ...mandatory,
        isOptional: false,
        distanceInMeters: unit === 'm' ? distance : distance * 1000
      }
      dispatch(setSubmissionConfiguration({
        id,
        name,
        value: [mandatoryFlat, ...optionalsFlat],
        ...others
      }))
    }
    handleClose()
  }

  return (
    <Box display={'flex'} flexWrap={'wrap'} mt={4}>
      <Box mx={1.5} my={1.2}>
        <ConfigValueButton text={t('allVariants')}
          isMandatory={mandatory && values && mandatory.length === values.length}
          onClick={handleSelectAll}/>
      </Box>
      {values.map(item => (
        <Box mx={1.5} my={1.2} key={item.id}>
          <ConfigValueButton
            isMandatory={mandatory && mandatory.id === item.id}
            isOptional={optionals && optionals.length > 0 && optionals.findIndex(option => option.id === item.id) > -1}
            text={t(item.valueText)}
            onClick={() => handleSelect(item.id)}/>
        </Box>
      ))}
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'flex-end'} ml={1.2}>

        <Typography variant={'body2'} component={'label'} color={'textSecondary'}>
          {t('distanceToConnect')}
        </Typography>
        <Box ml={1.25}>
          <TextField margin={'dense'} name={'distance'} onChange={(e) => setDistance(e.target.value)}
            type={'number'}
            value={distance}/>
        </Box>
        <Box ml={1.25}>
          <SquareButton text={'M'} size={'medium'} onClick={() => setUnit('m')} isActive={unit === 'm'}/>
        </Box>
        <Box ml={1.25}>
          <SquareButton text={'KM'} size={'medium'} onClick={() => setUnit('km')} isActive={unit === 'km'}/>
        </Box>
      </Box>

      <Box mt={5} display={'flex'} justifyContent={'center'} flexBasis={'100%'}>
        <PrimaryButton text={t('save')} onClick={handleSave} fontSize={theme.typography.body2.fontSize}
          size={'narrow'}/>
      </Box>
    </Box>
  )
}

export default DistanceValueSelection
