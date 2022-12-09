import React from 'react'
import { Box, useTheme } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import FormSectionLabel from '../common/labels/FormSectionLabel'
import format from 'date-fns/format'
import { uk } from 'date-fns/locale'
import { isValid, parseISO } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(16.25),
    height: theme.spacing(16.25)
  },
  status: {
    display: 'block',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.main
  },
  statusText: {
    marginLeft: 10,
    color: theme.palette.text.secondary
  }
}))
const UserInfo = ({ user }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Box display={'flex'} justifyContent={'space-around'} flexGrow={1}>
      <Box>
        <Avatar className={classes.avatar} src={user && user.avatar}/>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={1.25}>
          <span className={classes.status}/>
          <Typography className={classes.statusText} variant={'body2'}
            component={'span'}>Online</Typography>
        </Box>
      </Box>
      <Box>
        <Box>
          {user && user.fullName && <FormSectionLabel icon={'profile'} text={user.fullName}
            fontSize={theme.typography.h5.fontSize}
            iconWidth={20}/>}

        </Box>
        <Box mt={1.6}>
          <FormSectionLabel icon={'message'} text={'Швидко відповідає'}
            iconWidth={20} textColor={theme.palette.text.secondary}/>
        </Box>
        <Box mt={2.5}>
          {isValid(parseISO(user.createdAt)) &&
                    <Typography variant={'body2'} component={'span'}
                      color={'textSecondary'}>{`${t('onRealsyFrom')} ${format(new Date(user.createdAt), 'MMM y', { locale: uk })}`}</Typography>
          }
        </Box>
        <Box mt={2.5}>
          {
            user && user.phone && <FormSectionLabel icon={'phone'} text={`+${user.phone}`}
              textColor={theme.palette.text.primary}
              textWeight={theme.typography.fontWeightMedium}>
            </FormSectionLabel>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default UserInfo