import React from 'react'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'
import clsx from 'clsx'
import SocialMedia from '../Footer/SocialMedia'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@material-ui/core'
import { logout } from '../../../store/user/thunks'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Paths } from '../../../constants'

const useStyles = makeStyles(theme => ({
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
  exit: {
    fontSize: theme.typography.body2.fontSize
  }
}))
const UserNavigationBottom = () => {
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async () => {
    await dispatch(logout())
    history.push('/users/login')
  }

  return (
    <>
      <Divider/>
      <Box px={2.5} py={2}>
        <Typography component='p' variant='body2' className={classes.bold}>
          {t('user.favorites')}:
        </Typography>
        <List disablePadding component='nav' className={classes.list}>
          <ListItem className={classes.item}>
            <Link component={RouterLink} className={classes.links} to={`${Paths.FAVORITE}${Paths.AD}`}>{t('favorites.ads')}</Link>
          </ListItem>
          <ListItem className={classes.item}>
            <Link component={RouterLink} className={classes.links} to={`${Paths.FAVORITE}${Paths.PROPERTY}`}>{t('favorites.properties')}</Link>
          </ListItem>
          {/*          <ListItem className={classes.item}>
            <Link component={RouterLink} className={classes.links} to={'/property/1'}>{t('user.filters')}</Link>
          </ListItem> */}
        </List>
      </Box>
      <Divider/>
      <Box px={2.5} py={2}>
        <ListItem className={clsx(classes.item, classes.exitContainer)} component='div'>
          <Typography className={clsx(classes.links, classes.exit)} onClick={handleLogout}>{t('user.exit')}</Typography>
        </ListItem>
      </Box>
      <Divider/>
      <Box px={2.5} py={2}>
        <List disablePadding component='nav' className={classes.list}>
          <ListItem className={classes.item}>
            <Link component={RouterLink} className={classes.links} to={'#'}>{t('aboutUs')}</Link>
          </ListItem>
          <ListItem className={classes.item}>
            <Link component={RouterLink} className={classes.links} to={'#'}>{t('user.feedback')}</Link>
          </ListItem>
        </List>
        <SocialMedia width={35} iconSize={20} justifyContent={'flex-start'} space={theme.spacing(2.5)}/>
      </Box>
    </>
  )
}

export default UserNavigationBottom