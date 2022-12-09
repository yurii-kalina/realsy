import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 165
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export default function Scrin1Select () {
  const classes = useStyles()
  const { t } = useTranslation()
  const [city, setCity] = React.useState('')

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{t('selectCity')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          onChange={handleChange}
        >
          <MenuItem value='kyiv'>{t('kyiv')}</MenuItem>
          <MenuItem value='odessa'>{t('odessa')}</MenuItem>
          <MenuItem value='kharkiv'>{t('kharkiv')}</MenuItem>
        </Select>
      </FormControl>

    </div>
  )
}
