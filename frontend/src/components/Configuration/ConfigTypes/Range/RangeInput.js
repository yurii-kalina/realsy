import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useImmer } from 'use-immer'
import { useRouteMatch } from 'react-router-dom'
import { Paths } from '../../../../constants'

export const useStyles = makeStyles((theme) => ({
  input: {
    width: '195px',
    height: '40px',
    marginLeft: theme.spacing(2.5),
    padding: '9px 10px',
    borderRadius: '8px',
    backgroundColor: '#EEEFF1',
    color: theme.palette.text.darkGray
  }
}))

const RangeInput = ({ unit, id, name: configName, handleChange, value: configValue }) => {
  const [fields, setFields] = useImmer({ numberFrom: '', numberTo: '' })
  const match = useRouteMatch('/:path')
  useEffect(() => {
    if (configValue) {
      if (match) {
        if (match.url === Paths.AD || match.url === Paths.SEARCH) {
          if (configValue.numberFrom) {
            setFields(draft => {
              draft.numberFrom = configValue.numberFrom
            })
          } else {
            setFields(draft => {
              draft.numberFrom = ''
            })
          }
          if (configValue.numberTo) {
            setFields(draft => {
              draft.numberTo = configValue.numberTo
            })
          } else {
            setFields(draft => {
              draft.numberTo = ''
            })
          }
        } else {
          setFields(draft => {
            draft.valueNumber = configValue.valueNumber
          })
        }
      }
    }
  }, [setFields, configValue, match])
  const handleChangeInternal = (e) => {
    const { name, value } = e.target
    handleChange(id, configName, name, value)
  }
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Box display={'flex'} mt={2.5} alignItems={'flex-end'}>
      <Typography variant={'body2'} component={'label'}>
        {t(configName)}
      </Typography>
      {match && (match.url === Paths.AD || match.url === Paths.SEARCH) && <>
        <InputBase className={classes.input} type={'number'} name={'numberFrom'} value={fields.numberFrom}
          onChange={(e) => handleChangeInternal(e)}
          placeholder={`${t('from')}${unit ? ` ${unit}` : ''}`}/>
        <InputBase className={classes.input} type={'number'} name={'numberTo'} value={fields.numberTo}
          onChange={(e) => handleChangeInternal(e)}
          placeholder={`${t('to')}${unit ? ` ${unit}` : ''}`}/>
      </>
      }
      {match && (match.url === Paths.PROPERTY) &&
            <InputBase className={classes.input} type={'number'} name={'valueNumber'} value={fields.valueNumber}
              onChange={(e) => handleChangeInternal(e)} placeholder={unit}/>
      }
    </Box>
  )
}

export default RangeInput
