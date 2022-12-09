import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import OutlinedInput from '@material-ui/core/OutlinedInput/OutlinedInput'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import { Select } from '@material-ui/core'
import clsx from 'clsx'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '../../../common/buttons/Checkbox'
import TextField from '@material-ui/core/TextField/TextField'
import SquareButton from '../../../common/buttons/SquareButton'
import PhoneMask from '../../../common/inputs/PhoneMask/PhoneMask'
import Icon from '../../../Icon'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import Error from '../../../Error'
import { selectUserInfo } from '../../../../store/user/selectors'

const useStyles = makeStyles(theme => ({
  input: {
    width: 250,
    height: 50,
    borderRadius: 8,
    fontSize: theme.typography.body2.fontSize,
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },
    '& .MuiOutlinedInput-input': {
      padding: '13.5px 14px'
    }
  },
  selectPlaceholder: {
    color: theme.palette.text.secondary
  }
}))

const SelectIcon = (props) => (
  <span {...props} style={{ width: 16 }}><Icon isUnClickable={true} type={'arrowDown'}/></span>
)

const UserInfo = ({ onBlur }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const user = useSelector(selectUserInfo)

  const [fields, setFields] = useImmer({
    fullName: '',
    phone: '',
    occupation: '',
    isWorking: '',
    isSmoker: null,
    showPhone: false
  })

  useEffect(() => {
    if (user) {
      if (user.fullName) {
        setFields(draft => {
          draft.fullName = user.fullName
        })
      }
      if (user.phone) {
        setFields(draft => {
          draft.phone = user.phone
        })
      }
      if (user.occupation) {
        setFields(draft => {
          draft.occupation = user.occupation
        })
      }
      if (user.isSmoker !== null) {
        setFields(draft => {
          draft.isSmoker = user.isSmoker
        })
      }

      if (user.isPhoneVisible !== null) {
        setFields(draft => {
          draft.isPhoneVisible = user.isPhoneVisible
        })
      }

      if (user.isWorking !== '') {
        setFields(draft => {
          draft.isWorking = user.isWorking
        })
      }
    }
  }, [user, setFields])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(draft => {
      draft[name] = value
    })
  }
  if (user) {
    return (
      <Box display='flex' flexGrow={'1'} ml={9.37} flexWrap={'wrap'}>
        <Box flexBasis={'50%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
          <OutlinedInput onChange={handleChange} value={fields.fullName} margin={'none'} name={'fullName'}
            className={classes.input}
            placeholder={t('name')} variant={'outlined'} onBlur={(e) => onBlur(e.target)}/>
          <Typography variant={'body2'} component={'label'}
            color={'textSecondary'}>{t('hideNumberUntilConfirmation')}</Typography>
          <FormControl className={classes.formControl}>
            <Select
              className={clsx(classes.input, { [classes.selectPlaceholder]: fields.isWorking === '' })}
              name={'isWorking'}
              id="isWorking"
              value={user.isWorking}
              onChange={(e) => onBlur(e.target)}
              IconComponent={SelectIcon}
              variant={'outlined'}
              inputProps={{ 'aria-label': 'Without label' }}
              displayEmpty
            >
              <MenuItem value={''} disabled>
                {t('iWork')}
              </MenuItem>
              <MenuItem value={true}>{t('yes')}</MenuItem>
              <MenuItem value={false}>{t('no')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display={'flex'} flexGrow={1} flexDirection={'column'} alignItems={'flex-start'}
          justifyContent={'space-between'}>
          <OutlinedInput
            className={classes.input}
            disabled
            value={fields.phone}
            onChange={handleChange}
            onBlur={(e) => onBlur({ name: 'phone', value: e.target.value })}
            placeholder={'+380'}
            name="phone"
            id="phone"
            inputComponent={PhoneMask}
          />
          <Checkbox onClick={() => onBlur({ name: 'isPhoneVisible', value: !fields.isPhoneVisible })}
            isActive={fields.isPhoneVisible}
            size={'large'} position={'none'}/>
          <TextField fullWidth margin={'dense'} placeholder={t('profession')} name={'occupation'}
            onChange={handleChange}
            value={fields.occupation}
            onBlur={(e) => onBlur(e.target)}/>
        </Box>
        <Box display={'flex'} alignItems={'center'} flexGrow={1} alignSelf={'flex-end'}>
          <Typography component={'label'} variant={'body2'}>
            {t('doYouSmoke')}
          </Typography>
          <Box ml={3.7}>
            <SquareButton text={t('yes')} isActive={fields.isSmoker === true}
              onClick={() => onBlur({
                name: 'isSmoker',
                value: true
              })}/>
          </Box>
          <Box ml={3.7}>
            <SquareButton text={t('no')} isActive={fields.isSmoker === false}
              onClick={() => onBlur({
                name: 'isSmoker',
                value: false
              })}/>
          </Box>

        </Box>
      </Box>
    )
  }
  return <Error/>
}

export default UserInfo
