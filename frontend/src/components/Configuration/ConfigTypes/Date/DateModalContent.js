import React from 'react'
import { Box } from '@material-ui/core'
import DateValue from './DateSelector'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import ConfigValueButton from '../../../common/buttons/ConfigValueButton/ConfigValueButton'

const DateModalContent = ({ selectables, field, date, handleSelect, handleDate }) => {
  const { t } = useTranslation()
  return <Box display='flex' flexWrap='wrap' mt={5} alignItems={'center'}>
    <DateValue name={'dateFrom'} handleSubmit={handleDate}
      defaultValue={date ? date.dateFrom : null}/>
    <Typography variant={'body2'} component={'span'}>-</Typography>
    <DateValue name={'dateTo'} handleSubmit={handleDate}
      defaultValue={date ? date.dateTo : null}/>
    {(selectables ? selectables.map((item, i) => {
      if (item.valueText) {
        return (
          <Box mx={1.5} my={1.2} key={i}>
            <ConfigValueButton id={item.id} text={t(item.valueText)}
              onClick={() => handleSelect(item.id)}
              isMandatory={field && field.id === item.id}
            /></Box>)
      } else return null
    }) : null)}

  </Box>
}

export default DateModalContent
