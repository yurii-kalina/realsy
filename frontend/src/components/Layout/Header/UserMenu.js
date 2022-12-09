import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import useTheme from '@material-ui/core/styles/useTheme'
import { makeStyles } from '@material-ui/core/styles'
import UserNavigationTop from './UserNavigationTop'
import UserNavigationBottom from './UserNavigationBottom'

const useStyles = makeStyles(theme => ({
  menu: {
    marginTop: 60,
    borderRadius: '0px 0px 10px 10px',
    background: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
  },
  item: {
    padding: 0,
    paddingTop: `${theme.spacing(1.25)}px`,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightLight,
    textTransform: 'capitalize'
  },
  links: {
    color: theme.palette.text.secondary,
    cursor: 'pointer'
  },
  exitContainer: {
    padding: 0
  },
  exit: {
    padding: 0,
    color: theme.palette.text.darkGray
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold
  }
}))
const UserMenu = ({ isHeader = true }) => {
  const { t } = useTranslation()
  const classes = useStyles({ isHeader })
  const theme = useTheme()
  return (
    <Box py={2.5} width={342} className={classes.menu}>
      <Box py={2}>
        <Box px={2.5}>
          <Typography component='p' variant='body2' className={classes.bold}>
            {t('user.myProfile')}:
          </Typography>
          <Box display='flex' justifyContent='space-between' mt={2} mb={1.25}>
            <PrimaryButton text={t('client')} size='custom' width={146} height={40}
              background={theme.palette.primary.main}/>
            <PrimaryButton text={t('owner')} size='custom' width={146} height={40} background='#EEEFF1'
              color={theme.palette.text.light}/>
          </Box>
        </Box>
        <UserNavigationTop/>
      </Box>
      <UserNavigationBottom/>
    </Box>
  )
}

export default UserMenu