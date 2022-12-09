import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import User from '../Submission/View/Item/User'
import PrimaryButton from '../common/buttons/PrimaryButton'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../../store/user/selectors'
import UserNavigationTop from '../Layout/Header/UserNavigationTop'
import UserNavigationBottom from '../Layout/Header/UserNavigationBottom'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles(theme => ({
  listContainer: {
    flexGrow: 1,
    borderTop: '1px solid #CDCDCD'
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center'
  }
}))
const Profile = () => {
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation()
  const user = useSelector(selectUserInfo)
  const [open, setOpen] = useState(false)
  return (
    <Box py={3.75} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <User user={user}>
        <Box flexGrow={1} px={2.5}>
          <Typography className={classes.bold} variant='body1'>{t('profile.selectProfileType')}:</Typography>
          <Box display='flex' justifyContent='space-between' mt={2} mb={1}>
            <PrimaryButton text={t('client')} size='small' background={theme.palette.primary.main}
              fontWeight={theme.typography.body2.fontSize}/>
            <PrimaryButton text={t('owner')} size='small' background='#EEEFF1'
              color={theme.palette.text.light} fontWeight={theme.typography.body2.fontSize}/>
          </Box>
        </Box>
        <Collapse in={open} className={classes.listContainer}>
          <div>
            <UserNavigationTop/>
            <UserNavigationBottom/>
          </div>
        </Collapse>
      </User>
    </Box>
  )
}

export default Profile