import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { DatePicker } from '@material-ui/pickers'
import InputBase from '@material-ui/core/InputBase'
import format from 'date-fns/format'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  date: {
    width: '150px',
    height: '40px',
    padding: '9px 29px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#EEEFF1',
    fontSize: theme.typography.body2.fontSize,
    textAlign: 'center'
  }
}))
const DateSelector = ({ name, handleSubmit, defaultValue }) => {
  const classes = useStyles()
  const [date, setDate] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const { i18n } = useTranslation()
  const setMyDate = (newDate) => {
    setDate(newDate)
    handleSubmit({ name, value: newDate ? format(newDate, 'yyyy-MM-dd') : null })
  }
  useEffect(() => {
    setDate(defaultValue ? new Date(defaultValue) : null)
  }, [defaultValue])
  return (
    <Box display='flex' mx={1.5} my={1.2}>
      <DatePicker
        locale={i18n.language}
        disablePast
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        clearable
        value={date}
        onChange={setMyDate}
        format="yyyy-MM-dd"
        views={['year', 'month', 'date']}
        TextFieldComponent={() => <InputBase onClick={() => setIsOpen(true)}
          className={classes.date} placeholder={'2020-01-01'}
          value={date ? format(date, 'yyyy-MM-dd') : ''}/>}
      />
    </Box>
  )
}

export default DateSelector
