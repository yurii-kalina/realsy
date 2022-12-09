import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Icon from '../../Icon'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  select: {
    '& .MuiSelect-icon': {
      top: 'initial'
    },
    '& .MuiSelect-outlined.MuiSelect-outlined': {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  }
}))

const SelectIcon = (props) => {
  return (
    <span {...props} style={{ width: 16, height: 16, display: 'flex' }}>
      <Icon isUnClickable={true}
        type={'arrowDown'}/>
    </span>
  )
}

const LanguageSelector = props => {
  const classes = useStyles()
  const { i18n } = useTranslation()
  const [lang, setLang] = useState('ua')

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [i18n, lang])

  return (
    <Box pr={3}>
      <Select className={classes.select} value={lang} variant={'outlined'}
        onChange={(e) => setLang(e.target.value)}
        IconComponent={SelectIcon}>
        <MenuItem value={'ua'}>UKR</MenuItem>
        <MenuItem value={'en'}>EN</MenuItem>
      </Select>
    </Box>
  )
}

export default LanguageSelector
