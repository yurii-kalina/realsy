import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import SelectedValues from '../common/inputs/SelectedValues/SelectedValues'
import DropDownButton from '../common/buttons/DropDownButton'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { removeSubmissionConfiguration } from '../../store/submission/slice'
import AlertDialog from '../Alert/AlertDialog'
import { makeStyles } from '@material-ui/core/styles'
import { selectConfigurations } from '../../store/submission/selectors'

const useStyles = makeStyles(theme => ({
  rangeSpan: {
    color: '#BDBDBD',
    textTransform: 'lowercase'
  },
  unit: {
    fontSize: '1rem'
  }
}))

const ConfigItem = ({ id, name, hasPriority, hasTitle, children, type, configLength }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const configurations = useSelector(selectConfigurations)
  const [selected, setSelected] = useState({})

  useEffect(() => {
    setSelected(configurations.find(item => item.id === id))
  }, [configurations, id])

  const [selectedValue, setSelectedValue] = useState(null)
  const [selectedCount, setSelectedCount] = useState(0)
  const [alertOpen, setAlertOpen] = React.useState(false)

  useEffect(() => {
    if (selected && selected.value && type) {
      if (type.name === 'date') {
        if (selected.value.dateFrom && selected.value.dateTo) {
          setSelectedValue({ from: selected.value.dateFrom, to: selected.value.dateTo })
          // setSelectedValue(`${t('from')} ${selected.value.dateFrom}`)
          setSelectedCount(1)
        } else if (selected.value.dateFrom) {
          setSelectedValue({ from: selected.value.dateFrom })
          // setSelectedValue(`${t('from')} ${selected.value.dateFrom}`)
          setSelectedCount(1)
        } else if (selected.value.dateTo) {
          setSelectedValue({ to: selected.value.dateTo })
          // setSelectedValue(`${t('to')} ${selected.value.dateTo}`)
          setSelectedCount(1)
        } else {
          if (selected.value) {
            setSelectedValue(t(selected.value.valueText))
            setSelectedCount(1)
          }
        }
      } else if (type.name === 'priority' || type.name === 'distance' || type.name === 'prioritySlider') {
        if (selected && selected.value) {
          const selectedMandatories = selected.value.filter(item => item.isOptional === false)
          if (selectedMandatories && selectedMandatories.length === configLength) {
            setSelectedValue(t('allVariants'))
            setSelectedCount(1)
          } else {
            setSelectedValue(selected.value[0].valueText)
            setSelectedCount(selected.value.length)
          }
        }
      } else if (type.name === 'range') {
        if (selected.value[0]) {
          if (selected.value[0].numberFrom && selected.value[0].numberTo) {
            setSelectedValue({
              from: selected.value[0].numberFrom,
              to: selected.value[0].numberTo,
              unit: selected.unit
            })
            // setSelectedValue(`${t('from')} ${selected.value[0].numberFrom} ${t('to')} ${selected.value[0].numberTo}`)
            setSelectedCount(selected.value.length)
          } else if (selected.value[0].numberFrom) {
            setSelectedValue({ from: selected.value[0].numberFrom, unit: selected.unit })
            setSelectedCount(selected.value.length)
          } else if (selected.value[0].numberTo) {
            setSelectedValue({ to: selected.value[0].numberTo, unit: selected.unit })
            setSelectedCount(selected.value.length)
          } else if (selected.value[0].valueNumber) {
            setSelectedValue({ valueNumber: selected.value[0].valueNumber, unit: selected.unit })
            setSelectedCount(selected.value.length)
          }
        }
      }
    } else {
      setSelectedValue(null)
      setSelectedCount(0)
    }
  }, [configLength, selected, t, type])
  // Modal
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const buttonId = open ? id : undefined

  const handleDelete = () => {
    dispatch(removeSubmissionConfiguration(id))
  }

  const handleModalOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleModalClose = () => {
    setAnchorEl(null)
  }

  const getRangeAndDateValue = () => {
    if (selectedValue) {
      if (type.name === 'date' || type.name === 'range') {
        if (selectedValue.from && selectedValue.to) {
          return (
            <span>
              <span className={classes.rangeSpan}>{`${t('from')} `}</span>
              {selectedValue.from}{selectedValue.unit &&
                        <span className={classes.unit}>{selectedValue.unit}</span>}
              <span className={classes.rangeSpan}>{` ${t('to')} `}</span>
              {selectedValue.to}{selectedValue.unit &&
                        <span className={classes.unit}>{selectedValue.unit}</span>}
            </span>)
        } else if (selectedValue.from) {
          return (
            <span>
              <span className={classes.rangeSpan}>{`${t('from')} `}</span>
              {selectedValue.from}{selectedValue.unit &&
                        <span className={classes.unit}>{selectedValue.unit}</span>}
            </span>)
        } else if (selectedValue.to) {
          return (
            <span>
              <span className={classes.rangeSpan}>{`${t('to')} `}</span>
              {selectedValue.to}
              {selectedValue.unit && <span className={classes.unit}>{selectedValue.unit}</span>}
            </span>)
        } else if (selectedValue.valueNumber) {
          return (
            <span>
              {selectedValue.valueNumber}
              {selectedValue.unit && <span className={classes.unit}>{selectedValue.unit}</span>}
            </span>)
        } else return t(selectedValue)
      }
    }
  }
  return (
    <Box>
      <Box display={'flex'}>
        <DropDownButton open={open} text={type === 'slider' ? t(name.name) : t(name)}
          onClick={handleModalOpen}/>
        <Box ml={2.5} flexGrow={1} minWidth={0} alignSelf={'flex-end'}>
          <SelectedValues onClick={() => setAlertOpen(true)}
            value={t(selectedValue)}
            count={selectedCount - 1}>
            {getRangeAndDateValue()}
          </SelectedValues>
        </Box>
      </Box>
      <Modal anchorEl={anchorEl} hasTitle={hasTitle} hasPriority={hasPriority} open={open}
        handleModalClose={handleModalClose}
        buttonId={buttonId}>
        {children}
      </Modal>
      <AlertDialog title={t('configurationRemoval')}
        description={`${t('areYouSureDeleteOption')} ${t(name)}`}
        cancelText={t('cancel')}
        submitText={t('agree')}
        submitHandler={handleDelete}
        open={alertOpen}
        setAlertOpen={setAlertOpen}
      />

    </Box>
  )
}

ConfigItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default ConfigItem
